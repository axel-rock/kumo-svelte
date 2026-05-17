import { blockItems, chartItems, componentItems, staticPages } from '$lib/docs/nav';

export function load({ url }) {
  const allItems = [...staticPages, ...componentItems, ...chartItems, ...blockItems];
  const item = allItems.find((entry) => entry.href === url.pathname);

  return {
    title: item?.label ?? 'Kumo'
  };
}
