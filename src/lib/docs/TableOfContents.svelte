<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronDown } from '@lucide/svelte';

  export interface TocHeading {
    depth: number;
    slug: string;
    text: string;
  }

  interface HeadingGroup {
    h2: TocHeading;
    h3s: TocHeading[];
  }

  interface Props {
    headings?: TocHeading[];
    layout?: 'sidebar' | 'select';
  }

  let { headings: headingsProp = [], layout = 'sidebar' }: Props = $props();
  let headings = $state<TocHeading[]>([]);
  let activeId = $state('');

  function scrapeHeadings(): TocHeading[] {
    const content = document.querySelector('.kumo-prose');
    if (!content) return [];

    return Array.from(content.querySelectorAll('h2, h3'))
      .filter((element) => element.id)
      .map((element) => ({
        depth: Number(element.tagName[1]),
        slug: element.id,
        text: element.textContent?.trim() ?? ''
      }));
  }

  function groupHeadings(items: TocHeading[]): HeadingGroup[] {
    const groups: HeadingGroup[] = [];
    for (const heading of items) {
      if (heading.depth === 2) {
        groups.push({ h2: heading, h3s: [] });
      } else if (heading.depth === 3 && groups.length > 0) {
        groups[groups.length - 1].h3s.push(heading);
      }
    }
    return groups;
  }

  function jumpTo(slug: string) {
    activeId = slug;
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' });
  }

  onMount(() => {
    headings = headingsProp.filter((heading) => heading.depth <= 3);
    if (headings.length === 0) headings = scrapeHeadings();
    activeId = headings[0]?.slug ?? '';

    const elements = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop
          );

        if (visible.length > 0) activeId = visible[0].target.id;
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: [0, 1] }
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  });

  const groups = $derived(groupHeadings(headings));
</script>

{#if headings.length > 0}
  {#if layout === 'select'}
    <nav aria-label="Table of contents" class="relative">
      <select
        aria-label="Jump to section"
        value={activeId}
        class="w-full appearance-none rounded-lg border border-kumo-hairline bg-kumo-base px-4 py-2.5 pr-10 text-sm text-kumo-default"
        onchange={(event) => jumpTo(event.currentTarget.value)}
      >
        {#each groups as group (group.h2.slug)}
          <optgroup label={group.h2.text}>
            <option value={group.h2.slug}>{group.h2.text}</option>
            {#each group.h3s as h3 (h3.slug)}
              <option value={h3.slug}>{`  ${h3.text}`}</option>
            {/each}
          </optgroup>
        {/each}
      </select>
      <ChevronDown
        size={16}
        class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-kumo-subtle"
      />
    </nav>
  {:else}
    <nav aria-label="Table of contents" class="text-sm">
      <h2 class="mb-3 font-medium text-kumo-default">On this page</h2>
      <div class="space-y-1">
        {#each groups as group (group.h2.slug)}
          <a
            href={`#${group.h2.slug}`}
            class="block border-l px-3 py-1.5 transition-colors {activeId === group.h2.slug
              ? 'border-kumo-brand text-kumo-default'
              : 'border-kumo-hairline text-kumo-subtle hover:text-kumo-default'}"
            onclick={() => jumpTo(group.h2.slug)}
          >
            {group.h2.text}
          </a>
          {#each group.h3s as h3 (h3.slug)}
            <a
              href={`#${h3.slug}`}
              class="block border-l px-6 py-1.5 transition-colors {activeId === h3.slug
                ? 'border-kumo-brand text-kumo-default'
                : 'border-kumo-hairline text-kumo-subtle hover:text-kumo-default'}"
              onclick={() => jumpTo(h3.slug)}
            >
              {h3.text}
            </a>
          {/each}
        {/each}
      </div>
    </nav>
  {/if}
{/if}
