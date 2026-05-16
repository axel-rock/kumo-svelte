<script lang="ts">
  import { BookOpen, Box, Layers, Search, X } from '@lucide/svelte';
  import { Badge } from '$lib';
  import { cn } from '$lib/utils/cn';
  import { staticPages, componentItems, chartItems, blockItems, type NavItem } from './nav';

  interface SearchItem {
    name: string;
    type: 'component' | 'block' | 'layout' | 'page';
    description: string;
    category: string;
    url: string;
  }

  interface SearchGroup {
    label: string;
    items: SearchItem[];
  }

  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

  const STATIC_DESCRIPTIONS: Record<string, string> = {
    '/': 'Browse Kumo components, blocks, and charts.',
    '/installation': 'How to install and set up Kumo in your project.',
    '/contributing': 'Guidelines for contributing to the Kumo component library.',
    '/colors': "Explore Kumo's semantic color tokens and theming system.",
    '/accessibility': 'Accessibility standards and best practices in Kumo components.',
    '/figma': 'Using Kumo components in Figma with the Kumo Figma plugin.',
    '/cli': 'Use the Kumo CLI to add components and blocks to your project.',
    '/registry': 'Browse and explore the full Kumo component registry.',
    '/changelog': 'Release notes and package changes.'
  };

  const COMPONENT_DESCRIPTIONS: Record<string, string> = {
    autocomplete: 'A text input with filtered suggestions.',
    badge: 'Displays a small label for status, categorization, or metadata.',
    banner: 'Displays contextual inline messages for informational, alert, or error states.',
    breadcrumbs: "Shows the current page's location within a navigational hierarchy.",
    button: 'Displays a button or a component that looks like a button.',
    checkbox: 'A control that allows the user to toggle between checked and not checked.',
    'clipboard-text': 'A text component with a copy-to-clipboard button.',
    'cloudflare-logo': 'Cloudflare brand mark component.',
    'code-highlighted': 'Syntax-highlighted code blocks powered by Shiki.',
    collapsible: 'A vertically stacked set of interactive headings that each reveal content.',
    combobox: 'A searchable select component for filtering and selecting from options.',
    'command-palette': 'A keyboard-driven command menu for searching and navigating.',
    'date-picker': 'Date selection controls.',
    dialog: 'A modal window overlaid on the primary window or another dialog.',
    dropdown: 'Displays a menu of actions or functions triggered by a button.',
    empty: 'A placeholder component for empty states with illustration and actions.',
    flow: 'A diagram component for visualizing sequential and parallel workflows.',
    grid: 'Layout primitives for responsive grids.',
    input: 'A text input field with built-in label, description, and error support.',
    'input-area': 'A multi-line text input for longer content.',
    'input-group': 'Grouped input controls with labels, addons, and suffixes.',
    label: 'A label component for form fields with required/optional indicators.',
    'layer-card': 'A card with a layered visual effect for navigation or highlights.',
    link: 'Text link styling.',
    loader: 'A loading spinner to indicate loading state.',
    'menu-bar': 'A horizontal menu bar with icon buttons for toolbars.',
    meter: 'A visual indicator showing a value within a known range.',
    pagination: 'Navigation controls for paginated content.',
    popover: 'An accessible popup anchored to a trigger element.',
    radio: 'A control that allows selecting one option from a set.',
    select: 'Displays a list of options for the user to pick from.',
    'sensitive-input': 'A masked input for sensitive values like API keys and passwords.',
    sidebar: 'A composable sidebar navigation component.',
    'skeleton-line': 'A skeleton loading placeholder for text content.',
    switch: 'A two-state toggle button that can be either on or off.',
    table: 'A table component for displaying tabular data with selection support.',
    'table-of-contents': 'Presentational section navigation with active indicators.',
    tabs: 'Layered sections of content displayed one at a time.',
    text: 'A typography component for various heading and copy styles.',
    toast: 'Displays brief, non-intrusive notifications.',
    tooltip: 'A popup that displays information on hover or focus.'
  };

  let { open, onOpenChange }: Props = $props();
  let query = $state('');
  let activeIndex = $state(0);
  let inputRef = $state<HTMLInputElement>();

  function slugFromHref(href: string) {
    return href.split('/').filter(Boolean).at(-1) ?? '';
  }

  function fromNav(item: NavItem, type: SearchItem['type'], category: string): SearchItem {
    const slug = slugFromHref(item.href);
    return {
      name: item.label,
      type,
      description:
        STATIC_DESCRIPTIONS[item.href] ??
        COMPONENT_DESCRIPTIONS[slug] ??
        `${item.label} documentation and examples.`,
      category,
      url: item.href
    };
  }

  const allItems = $derived([
    ...staticPages.map((item) => fromNav(item, 'page', item.href === '/' ? 'Getting Started' : 'Guides')),
    ...componentItems.map((item) => fromNav(item, 'component', 'Components')),
    ...chartItems.map((item) => fromNav(item, 'component', 'Guides')),
    ...blockItems.map((item) => fromNav(item, 'block', 'Block'))
  ]);

  function score(item: SearchItem, value: string) {
    const q = value.trim().toLowerCase();
    if (!q) return 1;
    const name = item.name.toLowerCase();
    const description = item.description.toLowerCase();
    const category = item.category.toLowerCase();
    if (name === q) return 100;
    if (name.startsWith(q)) return 80;
    if (name.includes(q)) return 60;
    if (category.includes(q)) return 40;
    if (description.includes(q)) return 20;
    return 0;
  }

  function groupByCategory(items: SearchItem[]): SearchGroup[] {
    const grouped = new Map<string, SearchItem[]>();
    for (const item of items) grouped.set(item.category, [...(grouped.get(item.category) ?? []), item]);
    const order = (category: string) => {
      if (category === 'Getting Started') return 0;
      if (category === 'Guides') return 1;
      if (category === 'Block' || category === 'Layout') return 100;
      return 50;
    };
    return [...grouped.entries()]
      .sort(([a], [b]) => order(a) - order(b) || a.localeCompare(b))
      .map(([label, items]) => ({ label, items }));
  }

  const filtered = $derived(
    query.trim()
      ? allItems
          .map((item) => ({ item, score: score(item, query) }))
          .filter((entry) => entry.score > 0)
          .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
          .map((entry) => entry.item)
      : allItems
  );

  const groups = $derived(query.trim() ? (filtered.length ? [{ label: 'Results', items: filtered }] : []) : groupByCategory(filtered));
  const flatItems = $derived(groups.flatMap((group) => group.items));
  const totalResults = $derived(flatItems.length);

  $effect(() => {
    if (open) {
      query = '';
      activeIndex = 0;
      setTimeout(() => inputRef?.focus(), 0);
    }
  });

  function close() {
    onOpenChange(false);
  }

  function openItem(item: SearchItem, newTab = false) {
    if (newTab) {
      window.open(item.url, '_blank');
    } else {
      window.location.href = item.url;
    }
    close();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, Math.max(flatItems.length - 1, 0));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      return;
    }
    if (event.key === 'Enter' && flatItems[activeIndex]) {
      event.preventDefault();
      openItem(flatItems[activeIndex], event.metaKey || event.ctrlKey);
    }
  }

  function highlight(text: string, value: string) {
    const q = value.trim();
    if (!q) return [{ text, hit: false }];
    const index = text.toLowerCase().indexOf(q.toLowerCase());
    if (index === -1) return [{ text, hit: false }];
    return [
      { text: text.slice(0, index), hit: false },
      { text: text.slice(index, index + q.length), hit: true },
      { text: text.slice(index + q.length), hit: false }
    ];
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-[60] grid place-items-start bg-kumo-canvas/80 px-4 pt-[12vh] backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    onkeydown={handleKeydown}
  >
    <button class="absolute inset-0 cursor-default" aria-label="Close search" onclick={close}></button>
    <div class="relative mx-auto flex max-h-[min(640px,calc(100vh-7rem))] w-full max-w-[40rem] flex-col overflow-hidden rounded-lg bg-kumo-base shadow-xl ring-1 ring-kumo-hairline">
      <div class="flex h-14 items-center gap-3 border-b border-kumo-hairline px-4">
        <Search size={18} class="shrink-0 text-kumo-subtle" />
        <input
          bind:this={inputRef}
          bind:value={query}
          class="min-w-0 flex-1 bg-transparent text-[15px] text-kumo-default outline-none placeholder:text-kumo-muted"
          placeholder="Search docs..."
          aria-label="Search docs"
        />
        <button
          class="grid size-7 place-items-center rounded-md text-kumo-subtle transition-colors hover:bg-kumo-tint hover:text-kumo-default"
          aria-label="Close search"
          onclick={close}
        >
          <X size={16} />
        </button>
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto bg-kumo-base p-2">
        {#if groups.length === 0}
          <div class="p-8 text-center text-sm text-kumo-subtle">
            {query.trim() ? `No results found for "${query}"` : 'Type to search docs'}
          </div>
        {:else}
          {#each groups as group (group.label)}
            <div class="py-2">
              <div class="px-2 pb-1.5 text-[11px] font-medium tracking-wide text-kumo-subtle uppercase">{group.label}</div>
              <div>
                {#each group.items as item (item.url)}
                  {@const index = flatItems.indexOf(item)}
                  <button
                    class={cn(
                      'group relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
                      index === activeIndex ? 'bg-kumo-tint text-kumo-default' : 'text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default'
                    )}
                    onmouseenter={() => (activeIndex = index)}
                    onclick={(event) => openItem(item, event.metaKey || event.ctrlKey)}
                  >
                    <span
                      class={cn(
                        'absolute top-2 bottom-2 left-0 w-0.5 rounded-full bg-transparent',
                        index === activeIndex && 'bg-kumo-brand'
                      )}
                    ></span>
                    <span class="flex size-7 shrink-0 items-center justify-center rounded-md bg-kumo-tint text-kumo-subtle group-hover:text-kumo-default">
                      {#if item.type === 'block'}
                        <Layers size={15} />
                      {:else if item.type === 'layout'}
                        <Box size={15} />
                      {:else if item.type === 'page'}
                        <BookOpen size={15} />
                      {:else}
                        <Box size={15} />
                      {/if}
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="flex items-center gap-2">
                        <span class="text-sm font-medium text-kumo-default">
                          {#each highlight(item.name, query) as part, partIndex (partIndex)}
                            {#if part.hit}<mark class="bg-transparent text-kumo-brand">{part.text}</mark>{:else}{part.text}{/if}
                          {/each}
                        </span>
                        {#if query.trim() && item.type !== 'component'}
                          <Badge variant="neutral">{item.type === 'page' ? 'Guide' : item.type[0].toUpperCase() + item.type.slice(1)}</Badge>
                        {/if}
                      </span>
                      <span class="block truncate text-xs leading-5 text-kumo-subtle">
                        {#each highlight(item.description, query) as part, partIndex (partIndex)}
                          {#if part.hit}<mark class="bg-transparent text-kumo-brand">{part.text}</mark>{:else}{part.text}{/if}
                        {/each}
                      </span>
                    </span>
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        {/if}
      </div>

      <div class="flex items-center justify-between border-t border-kumo-hairline bg-kumo-elevated px-4 py-2 text-xs text-kumo-subtle">
        <span>{totalResults ? `${totalResults} result${totalResults === 1 ? '' : 's'}` : ''}</span>
        <div class="hidden items-center gap-4 sm:flex">
          <span class="flex items-center gap-1"><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">↑</kbd><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">↓</kbd><span>navigate</span></span>
          <span class="flex items-center gap-1"><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">↵</kbd><span>open</span></span>
          <span class="flex items-center gap-1"><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">⌘↵</kbd><span>new tab</span></span>
        </div>
      </div>
    </div>
  </div>
{/if}
