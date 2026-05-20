import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { readConfig } from '../utils/config.js';
import { findPackageFile, packageRootFrom } from '../utils/paths.js';
import { loadRegistry } from '../utils/registry.js';
import { transformImports } from '../utils/transformer.js';

function getBlocksSourcePath() {
  const root = packageRootFrom(import.meta.url);
  const candidates = [
    join(root, 'src', 'blocks'),
    join(root, 'dist', 'blocks-source'),
    join(root, 'blocks-source')
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  const registryPath = findPackageFile(import.meta.url, 'ai/component-registry.json');
  if (registryPath) {
    const fromRegistry = resolve(dirname(registryPath), '..', 'src', 'blocks');
    if (existsSync(fromRegistry)) return fromRegistry;
  }

  throw new Error('Blocks source directory not found. The package may be corrupted.');
}

async function confirm(message: string): Promise<boolean> {
  if (!process.stdin.isTTY) return false;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`${message} (y/n): `);
  rl.close();
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

export async function add(blockName?: string): Promise<void> {
  if (!blockName) {
    console.error('Error: Block name is required.');
    console.log('\nUsage: kumo-svelte add <block-name>');
    console.log('\nRun "kumo-svelte blocks" to see available blocks.');
    process.exit(1);
  }

  const config = readConfig();
  if (!config) {
    console.error('Error: kumo.json not found. Run "kumo-svelte init" first to initialize the configuration.');
    process.exit(1);
  }

  const registry = loadRegistry(import.meta.url);
  const block =
    registry.blocks?.[blockName] ??
    Object.values(registry.blocks ?? {}).find((item) => item.name.toLowerCase() === blockName.toLowerCase());

  if (!block) {
    console.error(`Error: Block '${blockName}' not found.`);
    console.log('\nRun "kumo-svelte blocks" to see available blocks.');
    process.exit(1);
  }

  const blocksSourcePath = getBlocksSourcePath();
  const projectRoot = process.cwd();
  const targetDir = join(projectRoot, config.blocksDir);

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`Created directory: ${config.blocksDir}`);
  }

  const blockExists = block.files.some((file) => existsSync(join(targetDir, file)));
  if (blockExists) {
    console.log(`Block '${block.name}' already exists in ${config.blocksDir}`);
    const shouldOverwrite = await confirm('Do you want to overwrite it?');
    if (!shouldOverwrite) {
      console.log('Installation cancelled.');
      return;
    }
  }

  console.log(`Installing block: ${block.name}`);

  for (const file of block.files) {
    const sourcePath = resolve(blocksSourcePath, file);
    const targetPath = resolve(targetDir, file);
    const relativeSource = relative(blocksSourcePath, sourcePath);
    const relativeTarget = relative(targetDir, targetPath);

    if (relativeSource.startsWith('..') || relativeSource.startsWith('/') || isAbsolute(relativeSource)) {
      console.error(`Error: Invalid source path for file: ${file}`);
      process.exit(1);
    }

    if (relativeTarget.startsWith('..') || relativeTarget.startsWith('/') || isAbsolute(relativeTarget)) {
      console.error(`Error: Invalid target path for file: ${file}`);
      process.exit(1);
    }

    mkdirSync(dirname(targetPath), { recursive: true });
    const content = transformImports(readFileSync(sourcePath, 'utf-8'));
    writeFileSync(targetPath, content, 'utf-8');
    console.log(`  ${file}`);
  }

  if (block.dependencies?.length) {
    console.log('\nThis block depends on the following Kumo Svelte components:\n');
    for (const dependency of block.dependencies) {
      console.log(`  - ${dependency} (from kumo-svelte)`);
    }
    console.log('\nMake sure kumo-svelte is installed in your project:');
    console.log('  pnpm add kumo-svelte');
  }

  console.log(`\nSuccessfully installed ${block.name}!`);
  console.log('\nYou can now import it in your project:\n');

  const blockFile = block.files[0].replace(/\.(?:svelte|tsx?)$/, '');
  const importPath = join(config.blocksDir, blockFile).replace(/\\/g, '/');

  console.log(`  import { ${block.name} } from "${importPath}";`);
}
