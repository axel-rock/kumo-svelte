import { loadRegistry } from '../utils/registry.js';

export function blocks() {
  const registry = loadRegistry(import.meta.url);
  const entries = Object.values(registry.blocks ?? {});

  if (entries.length === 0) {
    console.log('No blocks available in this version.');
    return;
  }

  console.log(`Kumo Svelte Blocks (${entries.length} total)`);
  console.log('');

  const categories = new Map();
  for (const block of entries) {
    const list = categories.get(block.category) ?? [];
    list.push(block);
    categories.set(block.category, list);
  }

  for (const [category, categoryBlocks] of categories) {
    console.log(category);
    for (const block of categoryBlocks) {
      console.log(`  ${block.name.padEnd(18)} ${block.description}`);
      if (block.dependencies?.length) {
        console.log(`  ${''.padEnd(18)} depends on: ${block.dependencies.join(', ')}`);
      }
    }
    console.log('');
  }

  console.log('Install with: kumo-svelte add <BlockName>');
}
