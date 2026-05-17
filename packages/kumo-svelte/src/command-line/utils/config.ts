import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const DEFAULT_CONFIG = {
  blocksDir: 'src/components/kumo',
  version: '1.0.0'
};

export type KumoConfig = typeof DEFAULT_CONFIG;

export function readConfig(projectRoot = process.cwd()): KumoConfig | null {
  const configPath = join(projectRoot, 'kumo.json');
  if (!existsSync(configPath)) return null;

  try {
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    return { ...DEFAULT_CONFIG, ...config };
  } catch (error) {
    throw new Error(
      `Failed to parse kumo.json: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error }
    );
  }
}

export function writeConfig(config: Partial<KumoConfig>, projectRoot = process.cwd()) {
  const configPath = join(projectRoot, 'kumo.json');
  const content = JSON.stringify({ ...DEFAULT_CONFIG, ...config }, null, 2) + '\n';
  writeFileSync(configPath, content, 'utf-8');
}

export function configExists(projectRoot = process.cwd()): boolean {
  return existsSync(join(projectRoot, 'kumo.json'));
}
