import rawChangelog from '../../../CHANGELOG.md?raw';
import {
  CHANGELOG_PER_PAGE,
  type ChangelogBump,
  type ChangelogSection,
  type ChangelogVersion
} from './changelog';

const bumpPriority: ChangelogBump[] = ['major', 'minor', 'patch'];

export function parseChangelog(raw = rawChangelog) {
  const versions: ChangelogVersion[] = [];
  let curVer: { version: string; sections: ChangelogSection[] } | null = null;
  let curSec: ChangelogSection | null = null;
  let curLines: string[] = [];
  let curHash: string | undefined;

  function flushEntry() {
    if (curSec && curLines.length > 0) {
      curSec.entries.push({ hash: curHash, text: curLines.join('\n').trimEnd() });
    }
    curLines = [];
    curHash = undefined;
  }

  function flushSection() {
    flushEntry();
    if (curVer && curSec && curSec.entries.length > 0) {
      curVer.sections.push(curSec);
    }
    curSec = null;
  }

  function flushVersion() {
    flushSection();
    if (curVer && curVer.sections.length > 0) {
      const types = new Set(curVer.sections.map((section) => section.type));
      const bump = bumpPriority.find((type) => types.has(type)) ?? 'patch';
      versions.push({ ...curVer, bump });
    }
    curVer = null;
  }

  for (const line of raw.split('\n')) {
    const versionMatch = line.match(/^## (\d+\.\d+\.\d+(?:-[^\s]+)?)/);
    if (versionMatch) {
      flushVersion();
      curVer = { version: versionMatch[1], sections: [] };
      continue;
    }

    const sectionMatch = line.match(/^### (Major|Minor|Patch) Changes/);
    if (sectionMatch && curVer) {
      flushSection();
      curSec = {
        type: sectionMatch[1].toLowerCase() as ChangelogBump,
        entries: []
      };
      continue;
    }

    const hashedEntryMatch = line.match(/^- ([a-f0-9]{7,40}): (.+)/);
    if (hashedEntryMatch && curSec) {
      flushEntry();
      curHash = hashedEntryMatch[1];
      curLines.push(hashedEntryMatch[2]);
      continue;
    }

    const plainEntryMatch = line.match(/^- (.+)/);
    if (plainEntryMatch && curSec && !curHash && curLines.length === 0) {
      flushEntry();
      curLines.push(plainEntryMatch[1]);
      continue;
    }

    if (curLines.length > 0 && curSec) {
      curLines.push(line);
    }
  }

  flushVersion();
  return versions;
}

export function getChangelogPage(page: number) {
  const versions = parseChangelog();
  const totalPages = Math.max(1, Math.ceil(versions.length / CHANGELOG_PER_PAGE));
  const normalizedPage = Math.min(Math.max(page, 1), totalPages);

  return {
    page: normalizedPage,
    perPage: CHANGELOG_PER_PAGE,
    totalPages,
    totalVersions: versions.length,
    versions: versions.slice(
      (normalizedPage - 1) * CHANGELOG_PER_PAGE,
      normalizedPage * CHANGELOG_PER_PAGE
    )
  };
}
