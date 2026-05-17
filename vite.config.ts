import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1600,
    rolldownOptions: {
      checks: {
        pluginTimings: false
      }
    }
  },
  plugins: [tailwindcss(), sveltekit()]
});
