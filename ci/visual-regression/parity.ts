#!/usr/bin/env tsx
/**
 * Cross-framework visual parity check (the "hybrid" dev aid).
 *
 * Renders a component's scenarios in BOTH the Svelte gallery (/vrt/<slug>) and
 * the upstream React reference app (/r/<slug>, pinned to the same @cloudflare/kumo
 * version the Svelte port mirrors), screenshots matching `data-vr-scenario`
 * elements, and pixel-diffs them so you can drive the Svelte port to parity.
 *
 * This is informational by default (exit 0). Pass --max-diff <pct> to fail when
 * any scenario exceeds the threshold.
 *
 * Usage:
 *   pnpm vrt:parity --component button [--mode light|dark] [--max-diff 1.5] [--no-serve]
 *
 * Servers (auto-started unless --no-serve):
 *   Svelte gallery   http://localhost:4173/vrt/<slug>
 *   React reference  http://localhost:4174/r/<slug>   (needs `vrt-reference` installed)
 */
import { type ChildProcess, spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Browser, type Page } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '../..');
const referenceDir = join(repoRoot, 'vrt-reference');

interface Args {
  component: string;
  mode: 'light' | 'dark';
  maxDiff: number | null;
  serve: boolean;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { component: '', mode: 'light', maxDiff: null, serve: true };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--component' || arg === '-c') a.component = argv[++i];
    else if (arg === '--mode') a.mode = argv[++i] === 'dark' ? 'dark' : 'light';
    else if (arg === '--max-diff') a.maxDiff = Number(argv[++i]);
    else if (arg === '--no-serve') a.serve = false;
  }
  if (!a.component) {
    console.error('Missing --component <slug>');
    process.exit(2);
  }
  return a;
}

async function waitForServer(url: string, timeoutMs = 120_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not start: ${url}`);
}

function startSvelteServer(): ChildProcess {
  return spawn(
    'pnpm',
    ['--filter', '@axel-rock/kumo-svelte', 'exec', 'vite', 'dev', '--port', '4173', '--strictPort'],
    { cwd: repoRoot, stdio: 'ignore', detached: true },
  );
}

function startReactServer(): ChildProcess {
  if (!existsSync(join(referenceDir, 'node_modules'))) {
    throw new Error('vrt-reference is not installed. Run:\n  cd vrt-reference && pnpm install --ignore-workspace');
  }
  return spawn('pnpm', ['dev'], { cwd: referenceDir, stdio: 'ignore', detached: true });
}

function stopServers(procs: ChildProcess[]): void {
  for (const p of procs) {
    if (p.pid) {
      try {
        process.kill(-p.pid, 'SIGTERM');
      } catch {
        // already gone
      }
    }
  }
}

interface Shot {
  id: string;
  png: PNG;
}

interface VrtAction {
  type: 'hover' | 'focus' | 'click' | 'press';
  key?: string;
  selector?: string;
}

interface ScenarioMeta {
  id: string;
  interact: VrtAction[] | null;
  capture: 'target' | 'page';
}

async function readScenarios(page: Page): Promise<ScenarioMeta[]> {
  return page.$$eval('[data-vr-scenario]', (nodes) =>
    nodes.map((n) => {
      const raw = n.getAttribute('data-vr-interact');
      return {
        id: n.getAttribute('data-vr-scenario') as string,
        interact: raw ? (JSON.parse(raw) as VrtAction[]) : null,
        capture: (n.getAttribute('data-vr-capture') as 'target' | 'page') ?? 'target',
      };
    }),
  );
}

function primaryInteractive(target: ReturnType<Page['locator']>): ReturnType<Page['locator']> {
  return target
    .locator('button, a[href], [role="button"], input, [tabindex]:not([tabindex="-1"])')
    .first();
}

async function applyActions(
  target: ReturnType<Page['locator']>,
  page: Page,
  actions: VrtAction[],
): Promise<void> {
  for (const action of actions) {
    const el = action.selector ? target.locator(action.selector).first() : primaryInteractive(target);
    const resolved = (await el.count()) > 0 ? el : target;
    await resolved.scrollIntoViewIfNeeded().catch(() => {});
    const opts = { timeout: 5000 } as const;
    switch (action.type) {
      case 'hover':
        await resolved.hover(opts);
        break;
      case 'focus':
        await resolved.focus(opts);
        break;
      case 'click':
        await resolved.click(opts);
        break;
      case 'press':
        await resolved.press(action.key ?? 'Enter', opts);
        break;
      default: {
        const _exhaustive: never = action.type;
        throw new Error(`Unknown VRT action: ${String(_exhaustive)}`);
      }
    }
    await page.waitForTimeout(60);
  }
}

async function prepareGalleryPage(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // First navigation triggers cold Vite compilation; allow generous time.
  await page.waitForSelector('[data-vr-ready="true"]', { timeout: 90_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
}

async function screenshotScenario(page: Page, scenario: ScenarioMeta): Promise<PNG | null> {
  const target = page.locator(`[data-vr-scenario="${scenario.id}"]`);
  if ((await target.count()) === 0) return null;

  if (scenario.interact) {
    await applyActions(target, page, scenario.interact);
    // Tooltips and overlays need a beat after hover/focus before capture.
    await page.waitForTimeout(scenario.capture === 'page' ? 400 : 150);
  }

  const buf =
    scenario.capture === 'page'
      ? await page.screenshot()
      : await target.screenshot();
  return PNG.sync.read(buf);
}

async function captureScenarios(page: Page, url: string): Promise<Map<string, PNG>> {
  await prepareGalleryPage(page, url);
  const scenarios = await readScenarios(page);
  const out = new Map<string, PNG>();

  const statics = scenarios.filter((s) => !s.interact);
  for (const scenario of statics) {
    const png = await screenshotScenario(page, scenario);
    if (png) out.set(scenario.id, png);
  }

  for (const scenario of scenarios.filter((s) => s.interact)) {
    await prepareGalleryPage(page, url);
    const png = await screenshotScenario(page, scenario);
    if (png) out.set(scenario.id, png);
  }

  return out;
}

function padTo(png: PNG, w: number, h: number): Uint8Array {
  if (png.width === w && png.height === h) return png.data;
  const padded = new Uint8Array(w * h * 4);
  for (let y = 0; y < png.height; y++) {
    padded.set(png.data.subarray(y * png.width * 4, (y + 1) * png.width * 4), y * w * 4);
  }
  return padded;
}

interface ParityResult {
  id: string;
  diffPixels: number;
  diffPercent: number;
  svelteSize: string;
  reactSize: string;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const outDir = join(__dirname, 'parity', args.component);
  mkdirSync(outDir, { recursive: true });

  const procs: ChildProcess[] = [];
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
    const page = await context.newPage();

    // Start + capture each side sequentially so the two heavy Vite compilations
    // (the React app pre-bundles all of @cloudflare/kumo) never contend.
    if (args.serve) {
      console.log('Starting Svelte gallery server (4173)...');
      procs.push(startSvelteServer());
    }
    await waitForServer('http://localhost:4173/');
    const svelteShots = await captureScenarios(page, `http://localhost:4173/vrt/${args.component}?mode=${args.mode}`);

    if (args.serve) {
      console.log('Starting React reference server (4174)...');
      procs.push(startReactServer());
    }
    await waitForServer('http://localhost:4174/');
    const reactShots = await captureScenarios(page, `http://localhost:4174/r/${args.component}?mode=${args.mode}`);

    const sharedIds = [...svelteShots.keys()].filter((id) => reactShots.has(id)).sort();
    if (sharedIds.length === 0) {
      console.error(
        `No shared scenarios between Svelte and React for "${args.component}".\n` +
          `Add a React gallery at vrt-reference/src/galleries/${args.component}.tsx mirroring the scenario ids.`,
      );
      process.exitCode = 2;
      return;
    }

    const results: ParityResult[] = [];
    for (const id of sharedIds) {
      const s = svelteShots.get(id)!;
      const r = reactShots.get(id)!;
      const w = Math.max(s.width, r.width);
      const h = Math.max(s.height, r.height);
      const diff = new PNG({ width: w, height: h });
      const diffPixels = pixelmatch(padTo(s, w, h), padTo(r, w, h), diff.data, w, h, {
        threshold: 0.1,
        diffColor: [255, 0, 0],
        alpha: 0.3,
      });
      const diffPercent = Math.round((diffPixels / (w * h)) * 10000) / 100;
      results.push({
        id,
        diffPixels,
        diffPercent,
        svelteSize: `${s.width}x${s.height}`,
        reactSize: `${r.width}x${r.height}`,
      });

      writeFileSync(join(outDir, `${id}-${args.mode}.svelte.png`), PNG.sync.write(s));
      writeFileSync(join(outDir, `${id}-${args.mode}.react.png`), PNG.sync.write(r));
      if (diffPixels > 0) writeFileSync(join(outDir, `${id}-${args.mode}.diff.png`), PNG.sync.write(diff));
    }

    results.sort((a, b) => b.diffPercent - a.diffPercent);
    console.log(`\nParity: ${args.component} (${args.mode}) — Svelte vs upstream React Kumo\n`);
    console.log('  diff%    pixels   sizes(svelte/react)   scenario');
    console.log('  ' + '─'.repeat(64));
    for (const r of results) {
      const flag = r.diffPercent > 1 ? '!' : ' ';
      const sizeNote = r.svelteSize === r.reactSize ? r.svelteSize : `${r.svelteSize}/${r.reactSize}`;
      console.log(
        `${flag} ${r.diffPercent.toFixed(2).padStart(6)}  ${String(r.diffPixels).padStart(7)}   ${sizeNote.padEnd(20)}  ${r.id}`,
      );
    }
    const avg = results.reduce((s, r) => s + r.diffPercent, 0) / results.length;
    const worst = results[0];
    console.log('  ' + '─'.repeat(64));
    console.log(`  scenarios: ${results.length} | avg diff: ${avg.toFixed(2)}% | worst: ${worst.id} (${worst.diffPercent}%)`);
    console.log(`  artifacts: ${join('ci/visual-regression/parity', args.component)}`);

    writeFileSync(join(outDir, `parity-report-${args.mode}.json`), JSON.stringify(results, null, 2));

    if (args.maxDiff != null && worst.diffPercent > args.maxDiff) {
      console.error(`\nParity FAILED: ${worst.id} diff ${worst.diffPercent}% > --max-diff ${args.maxDiff}%`);
      process.exitCode = 1;
    }
  } finally {
    if (browser) await browser.close();
    if (args.serve) stopServers(procs);
  }
}

main().catch((err) => {
  console.error('Parity run failed:', err);
  process.exit(1);
});
