import type { RequestHandler } from './$types';

export const prerender = true;

const pages = import.meta.glob('../../**/+page.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

function routePathFromModulePath(modulePath: string) {
  return modulePath
    .replace(/^\.\.\/\.\.\//, '')
    .replace(/\/\+page\.md$/, '')
    .replace(/^\+page\.md$/, '');
}

function normalizePath(path: string | undefined) {
  return (path ?? '').replace(/^\/+|\/+$/g, '');
}

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\s*[\s\S]*?\s*---\s*/, '').trim();
}

function getTitle(markdown: string, fallback: string) {
  const frontmatterTitle = markdown.match(/^---[\s\S]*?^title:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1];
  if (frontmatterTitle) return frontmatterTitle.trim();

  const headingTitle = markdown.match(/^#\s+(.+)$/m)?.[1];
  if (headingTitle) return headingTitle.trim();

  return fallback
    .split('/')
    .at(-1)!
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const docsByPath = new Map(
  Object.entries(pages).map(([modulePath, markdown]) => [
    routePathFromModulePath(modulePath),
    markdown
  ])
);

export function entries() {
  return Array.from(docsByPath.keys()).map((path) => ({ path }));
}

export const GET: RequestHandler = ({ params }) => {
  const path = normalizePath(params.path);
  const markdown = docsByPath.get(path);

  if (!markdown) {
    return new Response('Not found', { status: 404 });
  }

  const title = getTitle(markdown, path);
  const body = stripFrontmatter(markdown);
  const content = `# ${title}\n\n${body}\n`;

  return new Response(content, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8'
    }
  });
};
