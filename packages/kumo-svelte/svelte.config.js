import adapter from '@sveltejs/adapter-cloudflare';
import { mdsx } from 'mdsx';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsxConfig } from './mdsx.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsx(mdsxConfig), vitePreprocess()],
  kit: {
    alias: {
      '@axel-rock/kumo-svelte': './src/lib/index.ts',
      '@axel-rock/kumo-svelte/*': './src/lib/*',
      'kumo-svelte': './src/lib/index.ts',
      'kumo-svelte/*': './src/lib/*'
    },
    adapter: adapter(),
    prerender: {
      entries: ['*']
    }
  },
  vitePlugin: {
    inspector: true
  }
};

export default config;
