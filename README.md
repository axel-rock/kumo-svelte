# Kumo Svelte (`@axel-rock/kumo-svelte`)

A **high-fidelity Svelte port** of [Cloudflare's Kumo](https://github.com/cloudflare/kumo) component library, built on [Bits UI](https://bits-ui.com/) (the Svelte-native equivalent of Base UI).

Kumo Svelte provides accessible, design-system-compliant UI components that aim for **pixel parity** with upstream Kumo. It handles keyboard navigation, focus management, and ARIA attributes so you can build accessible applications without thinking through every detail.

This is an independent community project. It is not affiliated with, sponsored by, or endorsed by Cloudflare. See [NOTICE](./NOTICE) for full attribution.

<img width="2560" height="1456" alt="Kumo UI preview" src="https://github.com/user-attachments/assets/032f5a0e-b686-4440-b1ca-6182379479aa" />

## Lineage

This repository is a fork of [**maxffarrell/kumo-svelte**](https://github.com/maxffarrell/kumo-svelte), which is itself a Svelte port of [**cloudflare/kumo**](https://github.com/cloudflare/kumo).

```
cloudflare/kumo            (React + Base UI + Tailwind v4)
   └─ maxffarrell/kumo-svelte   (initial Svelte port on Bits UI)
        └─ axel-rock/kumo-svelte   (this repo — fidelity + testing focus)
```

Huge thanks to [**@maxffarrell**](https://github.com/maxffarrell) for the original Svelte port — the monorepo layout, the initial component scaffolds, the docs site, and the visual-regression starting point all came from that excellent groundwork. And thanks to the Cloudflare Kumo and Bits UI teams for the libraries this builds on.

## What's different from the original fork

This fork keeps the same goal (Kumo, in Svelte) but pushes hard on **fidelity** and **test coverage**:

- **Zero class drift vs upstream Kumo.** Every component's Tailwind classes are copied verbatim from the upstream React source, including all `hover:` / `not-disabled:hover:` / `disabled:` / `data-[state]` interacted-state classes that were partially missing before. This is enforced automatically by a new fidelity tool (`pnpm fidelity`) that tokenizes class strings and diffs each component against the upstream source — every component reports **0 missing classes**.
- **Cloudflare-faithful theme by default.** The semantic color tokens match upstream Kumo exactly (light + dark). The Svelte-orange brand is now an **opt-in** theme (`@axel-rock/kumo-svelte/theme-svelte.css`) rather than the default, so visual-regression can be a true pixel-diff against upstream.
- **Hybrid visual-regression suite.** A Playwright self-baseline gate (`pnpm vrt`) captures every component in **light and dark**, in **static *and* interacted states** — including opened dialogs, popovers, selects, dropdowns, menus, comboboxes, the command palette, and dual-month date pickers. Renders are made deterministic (pinned Inter font, frozen CSS + SVG animations, frozen clock). A separate cross-framework parity runner (`pnpm vrt:parity`) diffs the Svelte output against the **real React `@cloudflare/kumo`** to reach pixel parity during development.
- **Expanded test suite.** Interaction tests (keyboard, focus, selection, open/close) and accessibility checks (axe) across the component suite, plus import/export validation — 400+ tests.
- **Published under `@axel-rock/kumo-svelte`** (the unscoped `kumo-svelte` name belongs to the original).

## Installation

```bash
pnpm add @axel-rock/kumo-svelte
```

### Peer Dependencies

```bash
pnpm add svelte bits-ui
```

## Usage

```svelte
<script lang="ts">
  import { Button, Input, Dialog } from '@axel-rock/kumo-svelte';
  import '@axel-rock/kumo-svelte/styles.css';
  // Optional: repaint brand surfaces in Svelte orange instead of the
  // Cloudflare-faithful default.
  // import '@axel-rock/kumo-svelte/theme-svelte.css';
</script>
```

### Granular imports (tree-shaking)

```svelte
<script lang="ts">
  import { Button } from '@axel-rock/kumo-svelte/components/button';
</script>
```

### Bits UI primitives

```svelte
<script lang="ts">
  import { Popover } from '@axel-rock/kumo-svelte/primitives';
</script>
```

## Development

This repository contains the Svelte package and an MDSX-powered documentation site.

```bash
pnpm install          # install workspace deps
pnpm dev              # docs + live component demos at http://localhost:5173
pnpm check            # svelte-check (type/Svelte diagnostics)
pnpm test             # full Vitest suite (logic, interaction, a11y)
pnpm build            # build the package (dist) + docs site
```

### Fidelity tooling

```bash
pnpm fidelity                       # class-drift report vs upstream Kumo
pnpm fidelity --component button    # one component
pnpm fidelity:gate                  # fail if any upstream class is missing
```

The fidelity tool reads the upstream Kumo source from a sibling checkout
(`../kumo-upstream-ref`, or `$KUMO_UPSTREAM`):

```bash
git clone https://github.com/cloudflare/kumo.git ../kumo-upstream-ref
```

### Visual regression

```bash
pnpm vrt              # run the gate against committed baselines
pnpm vrt:update       # regenerate baselines after intentional changes
pnpm vrt:parity --component button   # cross-framework diff vs real React Kumo
```

Baselines live in `ci/visual-regression/baseline/<browser>-<platform>/` and are
OS-specific. The galleries that drive them are in
`packages/kumo-svelte/src/lib/vrt/galleries/` and are browsable at `/vrt` when
the dev server is running (append `?mode=dark` for dark mode).

See [`tools/fidelity/PORTING.md`](./tools/fidelity/PORTING.md) for the
per-component porting contract.

## Documentation

- **Upstream live docs**: [kumo-ui.com](https://kumo-ui.com)
- **Upstream source**: [cloudflare/kumo](https://github.com/cloudflare/kumo)
- **Original Svelte port**: [maxffarrell/kumo-svelte](https://github.com/maxffarrell/kumo-svelte)

## License

[MIT](./LICENSE). Derived from Cloudflare Kumo (MIT) and maxffarrell/kumo-svelte (MIT); see [NOTICE](./NOTICE).
