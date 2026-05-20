import { readFileSync } from 'node:fs';
import { findPackageFile } from './paths.js';

export type RegistryProp = {
  name: string;
  type: string;
  optional?: boolean;
  required?: boolean;
  values?: string[];
  descriptions?: Record<string, string>;
  default?: string;
  description?: string;
};

export type RegistryExample = {
  title: string;
  code?: string;
};

export type RegistryComponent = {
  name: string;
  description: string;
  category: string;
  sourceFile?: string;
  props?: RegistryProp[];
  examples?: RegistryExample[];
};

export type RegistryBlock = {
  name: string;
  description: string;
  category: string;
  files: string[];
  dependencies?: string[];
};

export type ComponentRegistry = {
  components?: Record<string, RegistryComponent>;
  blocks?: Record<string, RegistryBlock>;
};

export function loadRegistry(metaUrl = import.meta.url): ComponentRegistry {
  const registryPath = findPackageFile(metaUrl, 'ai/component-registry.json');
  if (!registryPath) {
    throw new Error('component-registry.json not found.');
  }

  return JSON.parse(readFileSync(registryPath, 'utf-8')) as ComponentRegistry;
}

export function formatComponentName(name: string): string {
  return String(name).replace(/[\s_-]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''));
}
