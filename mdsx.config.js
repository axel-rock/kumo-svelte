import { defineConfig } from 'mdsx';
import { codeToHtml } from 'shiki';

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

function textContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(textContent).join('');
}

function escapeSvelte(html) {
  return html.replace(/[{}`]/g, (character) => {
    if (character === '{') return '&#123;';
    if (character === '}') return '&#125;';
    return '&#96;';
  });
}

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
  return async (tree) => {
    const highlights = [];

    walk(tree, (node) => {
      if (node.tagName !== 'pre') return;

      highlights.push(
        codeToHtml(textContent(node), {
          lang: codeLanguage(node),
          themes: {
            light: 'github-light',
            dark: 'vesper'
          },
          defaultColor: false
        }).then((html) => {
          node.type = 'raw';
          node.value = escapeSvelte(html.replace(/\s+tabindex="0"/g, ''));
          delete node.tagName;
          delete node.properties;
          delete node.children;
        })
      );
    });

    await Promise.all(highlights);
  };
}

function walk(node, callback) {
  callback(node);
  if (!Array.isArray(node.children)) return;
  for (const child of node.children) {
    walk(child, callback);
  }
}

export const mdsxConfig = defineConfig({
  extensions: ['.md'],
  blueprints: {
    default: {
      path: 'src/lib/docs/MdxPage.svelte',
      rehypePlugins: [rehypeShikiCodeBlocks]
    }
  }
});
