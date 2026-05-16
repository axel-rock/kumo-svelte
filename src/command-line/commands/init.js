import { createInterface } from 'node:readline/promises';
import { configExists, DEFAULT_CONFIG, writeConfig } from '../utils/config.js';

async function ask(question, defaultValue) {
  if (!process.stdin.isTTY) return defaultValue;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`${question} (${defaultValue}): `);
  rl.close();
  return answer.trim() || defaultValue;
}

export async function init() {
  if (configExists()) {
    console.log('kumo.json already exists.');
    return;
  }

  const blocksDir = await ask('Where should blocks be installed?', DEFAULT_CONFIG.blocksDir);
  writeConfig({ blocksDir });

  console.log('Created kumo.json');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Run "kumo-svelte blocks" to see available blocks');
  console.log('  2. Run "kumo-svelte add <BlockName>" to install a block');
}
