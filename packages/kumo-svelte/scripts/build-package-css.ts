import tailwindcss from '@tailwindcss/vite';
import { cp, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from 'vite';

const packageRoot = new URL('..', import.meta.url).pathname;
const tempDir = await mkdtemp(join(tmpdir(), 'kumo-svelte-css-'));

try {
  await build({
    configFile: false,
    root: packageRoot,
    logLevel: 'warn',
    plugins: [tailwindcss()],
    build: {
      assetsDir: '.',
      emptyOutDir: true,
      outDir: tempDir,
      rollupOptions: {
        input: join(packageRoot, 'src/lib/styles.css'),
        output: {
          assetFileNames: 'styles.css'
        }
      }
    }
  });

  const builtFiles = await readdir(tempDir);
  const cssFile = builtFiles.find((file) => file.endsWith('.css'));

  if (!cssFile) {
    throw new Error('Tailwind build did not emit a CSS asset.');
  }

  await cp(join(tempDir, cssFile), join(packageRoot, 'dist/styles.css'));
} finally {
  await rm(tempDir, { force: true, recursive: true });
}
