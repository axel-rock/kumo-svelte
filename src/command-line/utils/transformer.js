const PACKAGE_NAME = 'kumo-svelte';

function shouldTransform(path) {
  return (
    path.startsWith('$lib/components/') ||
    path.startsWith('$lib/utils/') ||
    (path.startsWith('../') && (path.includes('/components/') || path.includes('/utils/')))
  );
}

export function transformImports(content) {
  return content.replace(
    /from\s+["'](?:(?:\.\.\/)+(?:components|utils)\/[^"']+|\$lib\/(?:components|utils)\/[^"']+)["'];?/g,
    `from '${PACKAGE_NAME}';`
  );
}
