export type ChangelogBump = 'major' | 'minor' | 'patch';

export interface ChangelogEntry {
  hash?: string;
  text: string;
}

export interface ChangelogSection {
  type: ChangelogBump;
  entries: ChangelogEntry[];
}

export interface ChangelogVersion {
  version: string;
  bump: ChangelogBump;
  sections: ChangelogSection[];
}

export const CHANGELOG_PER_PAGE = 10;

export function renderChangelogMarkdown(versions: ChangelogVersion[]) {
  const lines = ['# Changelog', ''];

  for (const version of versions) {
    lines.push(`## ${version.version}`, '');

    for (const section of version.sections) {
      const title = `${section.type[0].toUpperCase()}${section.type.slice(1)} Changes`;
      lines.push(`### ${title}`, '');

      for (const entry of section.entries) {
        const prefix = entry.hash ? `- ${entry.hash}: ` : '- ';
        const entryLines = entry.text.split('\n');
        lines.push(`${prefix}${entryLines[0] ?? ''}`);
        for (const line of entryLines.slice(1)) {
          lines.push(line);
        }
        lines.push('');
      }
    }
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderInline(markdown: string) {
  return escapeHtml(markdown)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

export function markdownToHtml(markdown: string) {
  const blocks: string[] = [];
  const lines = markdown.split('\n');
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      const level = Math.min(headingMatch[1].length + 2, 6);
      blocks.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s{2,}-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s{2,}-\s+/.test(lines[index])) {
        items.push(`<li>${renderInline(lines[index].replace(/^\s{2,}-\s+/, ''))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith('```') &&
      !lines[index].match(/^(#{1,4})\s+/) &&
      !/^\s{2,}-\s+/.test(lines[index])
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraphLines.join(' '))}</p>`);
  }

  return blocks.join('\n');
}
