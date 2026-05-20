import { loadRegistry } from '../utils/registry.js';

export function blocks(): void {
  const registry = loadRegistry(import.meta.url);
  const entries = Object.values(registry.blocks ?? {});

  if (entries.length === 0) {
    console.log('No blocks available.');
    return;
  }

  const categories = new Map<string, typeof entries>();
  for (const block of entries) {
    const category = block.category || 'Other';
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(block);
  }

  const sortedCategories = [...categories.keys()].sort();

  console.log(`Kumo Svelte Blocks (${entries.length} total)\n`);

  for (const category of sortedCategories) {
    const blocks = [...categories.get(category)!].sort((a, b) => a.name.localeCompare(b.name));
    console.log(`${category}:`);
    for (const block of blocks) {
      console.log(`  ${block.name} - ${block.description}`);
    }
    console.log('');
  }

  console.log('To install a block, run:');
  console.log('  kumo-svelte add <block-name>\n');
  console.log('Example:');
  console.log('  kumo-svelte add PageHeader');
}
