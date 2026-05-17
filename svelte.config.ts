import adapter from '@sveltejs/adapter-cloudflare';
import { mdsx } from 'mdsx';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import type { Config } from '@sveltejs/kit';
import { mdsxConfig } from './mdsx.config.ts';

const config: Config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsx(mdsxConfig), vitePreprocess()],
  kit: {
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
