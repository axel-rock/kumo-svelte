import { loadRegistry } from '../utils/registry.js';

export function ls(): void {
  const registry = loadRegistry(import.meta.url);
  const components = Object.values(registry.components ?? {});

  console.log(`Kumo Svelte Components (${components.length} total)`);
  console.log('');

  const categories = new Map();
  for (const component of components) {
    const list = categories.get(component.category) ?? [];
    list.push(component);
    categories.set(component.category, list);
  }

  for (const [category, items] of categories) {
    console.log(category);
    for (const component of items) {
      console.log(`  ${component.name.padEnd(22)} ${component.description}`);
    }
    console.log('');
  }
}
