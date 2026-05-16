import { readFileSync } from 'node:fs';
import { findPackageFile } from './paths.js';

export function loadRegistry(metaUrl = import.meta.url) {
  const registryPath = findPackageFile(metaUrl, 'ai/component-registry.json');
  if (!registryPath) {
    throw new Error('component-registry.json not found.');
  }

  return JSON.parse(readFileSync(registryPath, 'utf-8'));
}

export function formatComponentName(name) {
  return String(name).replace(/[\s_-]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''));
}
