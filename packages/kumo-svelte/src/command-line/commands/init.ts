import { createInterface } from 'node:readline/promises';
import { configExists, DEFAULT_CONFIG, type KumoConfig, writeConfig } from '../utils/config.js';

export async function prompt(question: string, defaultValue?: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const suffix = defaultValue ? ` (${defaultValue})` : '';
    const answer = await rl.question(`${question}${suffix}: `);
    return answer.trim() || defaultValue || '';
  } finally {
    rl.close();
  }
}

export async function confirm(question: string): Promise<boolean> {
  if (!process.stdin.isTTY) return false;
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const answer = await rl.question(`${question} (y/n): `);
    return answer.trim().toLowerCase() === 'y';
  } finally {
    rl.close();
  }
}

export async function init(): Promise<void> {
  try {
    const projectRoot = process.cwd();

    if (configExists(projectRoot)) {
      console.log('kumo.json already exists in this directory.');
      const shouldOverwrite = await confirm('Do you want to overwrite it?');

      if (!shouldOverwrite) {
        console.log('Initialization cancelled.');
        process.exit(0);
      }
    }

    console.log('\nInitializing Kumo Svelte configuration...\n');

    const blocksDir =
      process.stdin.isTTY ? await prompt('Where should blocks be installed?', DEFAULT_CONFIG.blocksDir) : DEFAULT_CONFIG.blocksDir;

    const config: KumoConfig = {
      blocksDir: blocksDir || DEFAULT_CONFIG.blocksDir,
      version: DEFAULT_CONFIG.version
    };

    writeConfig(config, projectRoot);

    console.log('\nCreated kumo.json with the following configuration:');
    console.log(`   Blocks directory: ${config.blocksDir}`);
    console.log('\nNext steps:');
    console.log('  - Run `kumo-svelte blocks` to see available blocks');
    console.log('  - Run `kumo-svelte add <block>` to install a block');
  } catch (error) {
    console.error('Error initializing configuration:', error);
    process.exit(1);
  }
}
