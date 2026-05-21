import { defineConfig } from 'mdsx';
import { codeToHtml } from 'shiki';

/**
 * @typedef {object} MdsxNode
 * @property {string=} type
 * @property {string=} tagName
 * @property {string=} value
 * @property {string=} url
 * @property {{ className?: unknown, id?: string }=} properties
 * @property {MdsxNode[]=} children
 */

/** @type {Record<string, string>} */
const languageAliases = {
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

/**
 * @param {MdsxNode | undefined} node
 * @returns {string}
 */
function textContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  if (!Array.isArray(node.children)) return '';
  return node.children.map(textContent).join('');
}

/**
 * @param {MdsxNode | undefined} node
 * @returns {string}
 */
function markdownContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  if (node.type === 'inlineCode') return `\`${node.value ?? ''}\``;
  if (node.type === 'strong') return `**${node.children?.map(markdownContent).join('') ?? ''}**`;
  if (node.type === 'link') return `[${node.children?.map(markdownContent).join('') ?? ''}](${node.url ?? ''})`;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(markdownContent).join('');
}

/**
 * @param {string} html
 * @returns {string}
 */
function escapeSvelte(html) {
  return html.replace(/[{}`]/g, (character) => {
    if (character === '{') return '&#123;';
    if (character === '}') return '&#125;';
    return '&#96;';
  });
}

/**
 * @param {string} code
 * @returns {string}
 */
function normalizeCode(code) {
  return code
    .replace(/^\n+|\n+$/g, '')
    .replace(/(<script\b[^>]*>)\n{2,}/g, '$1\n')
    .replace(/\n{2,}(<\/script>)/g, '\n$1');
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return value.replace(/[<>"]/g, (character) => {
    if (character === '<') return '&lt;';
    if (character === '>') return '&gt;';
    return '&quot;';
  });
}

/**
 * @param {string} value
 * @returns {string}
 */
function renderInlineMarkdown(value) {
  return escapeHtml(value.trim())
    .replace(/`([^`]+)`/g, '<span class="kumo-inline-code">$1</span>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

/**
 * @param {string} line
 * @returns {string[]}
 */
function tableCells(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

/**
 * @param {string} line
 * @returns {boolean}
 */
function isTableDivider(line) {
  return tableCells(line).every((cell) => /^:?-{3,}:?$/.test(cell));
}

function remarkPipeTables() {
  /** @param {MdsxNode} tree */
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'paragraph') return;
      const value = markdownContent(node);
      const lines = value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length < 3 || !lines.every((line) => line.includes('|')) || !isTableDivider(lines[1])) {
        return;
      }

      const headers = tableCells(lines[0]);
      const rows = lines.slice(2).map(tableCells).filter((row) => row.length === headers.length);
      if (!headers.length || !rows.length) return;

      const headerHtml = headers.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join('');
      const bodyHtml = rows
        .map((row) => `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join('')}</tr>`)
        .join('');

      node.type = 'html';
      node.value = escapeSvelte(`<table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`);
      delete node.children;
    });
  };
}

/**
 * @param {MdsxNode} node
 * @returns {string}
 */
function codeLanguage(node) {
  const code = node.children?.find((child) => child.type === 'element' && child.tagName === 'code');
  const classNames = Array.isArray(code?.properties?.className) ? code.properties.className : [];
  const languageClass = classNames.find(
    (className) => typeof className === 'string' && className.startsWith('language-')
  );
  const lang = typeof languageClass === 'string' ? languageClass.slice('language-'.length) : 'text';
  return languageAliases[lang] ?? lang;
}

function rehypeShikiCodeBlocks() {
  /** @param {MdsxNode} tree */
  return async (tree) => {
    /** @type {Promise<void>[]} */
    const highlights = [];

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

/**
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`'"’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function rehypeDocHeadings() {
  /**
   * @param {MdsxNode} tree
   * @param {{ data: Record<string, unknown> }} file
   */
  return (tree, file) => {
    /** @type {{ depth: number; slug: string; text: string }[]} */
    const headings = [];
    /** @type {string[]} */
    const usedSlugs = [];

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

/**
 * @param {MdsxNode} node
 * @param {(node: MdsxNode) => void} callback
 */
function walk(node, callback) {
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
      remarkPlugins: [remarkPipeTables],
      rehypePlugins: [rehypeDocHeadings, rehypeShikiCodeBlocks]
    }
  }
});
