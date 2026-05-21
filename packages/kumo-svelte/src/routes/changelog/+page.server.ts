import { getChangelogPage } from '$lib/docs/changelog.server';

export function load() {
  return getChangelogPage(1);
}
