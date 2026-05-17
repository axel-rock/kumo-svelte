import { readFileSync } from 'node:fs';
import { findPackageFile } from '../utils/paths.js';

export function ai(): void {
  const usagePath = findPackageFile(import.meta.url, 'ai/USAGE.md');
  if (!usagePath) {
    console.error('Could not read ai/USAGE.md from the installed kumo-svelte package.');
    process.exit(1);
  }

  console.log(readFileSync(usagePath, 'utf-8'));
}
