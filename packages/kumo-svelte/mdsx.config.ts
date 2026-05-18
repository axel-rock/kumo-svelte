import { defineConfig } from 'mdsx';
import { codeToHtml } from 'shiki';

type MdsxNode = {
  type?: string;
  tagName?: string;
  value?: string;
  properties?: { className?: unknown; id?: string };
  children?: MdsxNode[];
};

type MdsxFile = {
  data: {
    matter?: unknown;
    [key: string]: unknown;
  };
};

const languageAliases: Record<string, string> = {
  svelte: 'svelte',
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  jsx: 'jsx',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  jsonc: 'jsonc'
};

function textContent(node: MdsxNode | undefined): string {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  if (!Array.isArray(node.children)) return '';
  return node.children.map(textContent).join('');
}

function escapeSvelte(html: string): string {
  return html.replace(/[{}`]/g, (character) => {
    if (character === '{') return '&#123;';
    if (character === '}') return '&#125;';
    return '&#96;';
  });
}

function normalizeCode(code: string): string {
  return code
    .replace(/^\n+|\n+$/g, '')
    .replace(/(<script\b[^>]*>)\n{2,}/g, '$1\n')
    .replace(/\n{2,}(<\/script>)/g, '\n$1');
}

function codeLanguage(node: MdsxNode): string {
  const code = node.children?.find((child) => child.type === 'element' && child.tagName === 'code');
  const classNames = Array.isArray(code?.properties?.className) ? code.properties.className : [];
  const languageClass = classNames.find(
    (className) => typeof className === 'string' && className.startsWith('language-')
  );
  const lang = typeof languageClass === 'string' ? languageClass.slice('language-'.length) : 'text';
  return languageAliases[lang] ?? lang;
}

function rehypeShikiCodeBlocks() {
  return async (tree: MdsxNode) => {
    const highlights: Promise<void>[] = [];

    walk(tree, (node) => {
      if (node.tagName !== 'pre') return;

      highlights.push(
        codeToHtml(normalizeCode(textContent(node)), {
          lang: codeLanguage(node),
          themes: {
            light: 'github-light',
            dark: 'vesper'
          },
          defaultColor: false
        }).then((html) => {
          node.type = 'raw';
          node.value = escapeSvelte(
            html.replace(/\s+tabindex="0"/g, '').replace(/(<\/span>)\n(?=<span class="line")/g, '$1')
          );
          delete node.tagName;
          delete node.properties;
          delete node.children;
        })
      );
    });

    await Promise.all(highlights);
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`'"’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function rehypeDocHeadings() {
  return (tree: MdsxNode, file: MdsxFile) => {
    const headings: { depth: number; slug: string; text: string }[] = [];
    const usedSlugs: string[] = [];

    walk(tree, (node) => {
      if (!['h2', 'h3', 'h4'].includes(node.tagName ?? '')) return;

      const text = textContent(node).trim();
      if (!text) return;

      const depth = Number(node.tagName?.slice(1));
      const baseSlug = slugify(text) || 'section';
      let slug = baseSlug;
      let index = 2;

      while (usedSlugs.includes(slug)) {
        slug = `${baseSlug}-${index}`;
        index += 1;
      }

      usedSlugs.push(slug);
      node.properties = { ...node.properties, id: slug };

      if (depth <= 3) {
        headings.push({ depth, slug, text });
      }
    });

    const matter = typeof file.data.matter === 'object' && file.data.matter !== null ? file.data.matter : {};
    file.data.matter = { ...matter, headings };
  };
}

function walk(node: MdsxNode, callback: (node: MdsxNode) => void): void {
  callback(node);
  if (!Array.isArray(node.children)) return;
  for (const child of node.children) {
    walk(child, callback);
  }
}

export const mdsxConfig = defineConfig({
  extensions: ['.md'],
  svelteConfigPath: false,
  blueprints: {
    default: {
      path: 'src/lib/docs/MdxPage.svelte',
      rehypePlugins: [rehypeDocHeadings, rehypeShikiCodeBlocks]
    }
  }
});
