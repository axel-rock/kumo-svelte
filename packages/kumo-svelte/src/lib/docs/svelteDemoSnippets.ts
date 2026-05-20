const demoSources = import.meta.glob('./demo-snippets/*.svelte', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

const snippets = new Map(
  Object.entries(demoSources).map(([path, source]) => {
    const demo = path.split('/').pop()?.replace(/\.svelte$/, '') ?? '';
    return [demo, source.replace(/^\n+|\n+$/g, '')] as const;
  })
);

export function getSvelteDemoSnippet(demo: string) {
  return snippets.get(demo) ?? '';
}
