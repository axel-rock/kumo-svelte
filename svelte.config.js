import adapter from '@sveltejs/adapter-static';
import { mdsx } from 'mdsx';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsxConfig } from './mdsx.config.js';

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsx(mdsxConfig), vitePreprocess()],
  kit: {
    adapter: adapter(),
    prerender: {
      handleMissingId: 'warn'
    }
  }
};

export default config;
