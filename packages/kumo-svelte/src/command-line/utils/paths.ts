import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function packageRootFrom(metaUrl: string): string {
  const currentDir = dirname(fileURLToPath(metaUrl));
  const candidates = [
    join(currentDir, '..', '..', '..'),
    join(currentDir, '..', '..'),
    process.cwd()
  ];

  for (const candidate of candidates) {
    if (existsSync(join(candidate, 'package.json'))) return candidate;
  }

  return candidates[0];
}

export function findPackageFile(metaUrl: string, relativePath: string): string | null {
  const root = packageRootFrom(metaUrl);
  const candidates = [
    join(root, relativePath),
    join(root, 'dist', relativePath),
    join(root, 'src', relativePath)
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  return null;
}
