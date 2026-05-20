import { loadRegistry } from '../utils/registry.js';

export function ls(): void {
  const registry = loadRegistry(import.meta.url);
  const components = Object.values(registry.components ?? {});

  const categories = new Map<string, typeof components>();
  for (const component of components) {
    const category = component.category || 'Other';
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(component);
  }

  const sortedCategories = [...categories.keys()].sort();

  console.log(`Kumo Svelte Components (${components.length} total)\n`);

  for (const category of sortedCategories) {
    const items = [...categories.get(category)!].sort((a, b) => a.name.localeCompare(b.name));
    console.log(`${category}:`);
    for (const component of items) {
      console.log(`  ${component.name} - ${component.description}`);
    }
    console.log('');
  }
}
