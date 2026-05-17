<script module lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export const KUMO_BREADCRUMBS_VARIANTS = {
    size: {
      sm: {
        classes: 'text-sm h-10 gap-0.5',
        description: 'Compact breadcrumbs for dense UIs'
      },
      base: {
        classes: 'text-base h-12 gap-1',
        description: 'Default breadcrumbs size'
      }
    }
  } as const;

  export const KUMO_BREADCRUMBS_DEFAULT_VARIANTS = {
    size: 'base'
  } as const;

  export type KumoBreadcrumbsSize = keyof typeof KUMO_BREADCRUMBS_VARIANTS.size;

  export interface KumoBreadcrumbsVariantsProps {
    size?: KumoBreadcrumbsSize;
  }

  export interface BreadcrumbsItem {
    label: string;
    href?: string;
  }

  export function breadcrumbsVariants({
    size = KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size
  }: KumoBreadcrumbsVariantsProps = {}) {
    return cn(
      'group mr-4 flex min-w-0 grow items-center overflow-hidden whitespace-nowrap',
      KUMO_BREADCRUMBS_VARIANTS.size[size]?.classes ??
        KUMO_BREADCRUMBS_VARIANTS.size[KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size].classes
    );
  }

  function getMobileItems(items: BreadcrumbsItem[]) {
    if (items.length <= 2) return items;
    return items.slice(-2);
  }
</script>

<script lang="ts">
  import BreadcrumbsCurrent from './BreadcrumbsCurrent.svelte';
  import BreadcrumbsLink from './BreadcrumbsLink.svelte';
  import BreadcrumbsSeparator from './BreadcrumbsSeparator.svelte';

  interface Props extends KumoBreadcrumbsVariantsProps {
    children?: Snippet;
    class?: string;
    className?: string;
    items?: BreadcrumbsItem[];
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    className: classNameAlias,
    size = KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size,
    items = [],
    ...rest
  }: Props = $props();

  const mobileItems = $derived(getMobileItems(items));
</script>

<nav class={cn(breadcrumbsVariants({ size }), className, classNameAlias)} aria-label="breadcrumb" {...rest}>
  {#if children}
    {@render children()}
  {:else if items.length > 0}
    <div class="contents sm:hidden">
      {#if items.length > 2}
        <span class="flex shrink-0 items-center text-kumo-subtle" aria-hidden="true">...</span>
        <BreadcrumbsSeparator />
      {/if}
      {#each mobileItems as item, index}
        {#if index > 0}
          <BreadcrumbsSeparator />
        {/if}
        {#if item.href && index < mobileItems.length - 1}
          <BreadcrumbsLink href={item.href}>{item.label}</BreadcrumbsLink>
        {:else}
          <BreadcrumbsCurrent>{item.label}</BreadcrumbsCurrent>
        {/if}
      {/each}
    </div>
    <div class="hidden sm:contents">
      {#each items as item, index}
        {#if index > 0}
          <BreadcrumbsSeparator />
        {/if}
        {#if item.href && index < items.length - 1}
          <BreadcrumbsLink href={item.href}>{item.label}</BreadcrumbsLink>
        {:else}
          <BreadcrumbsCurrent>{item.label}</BreadcrumbsCurrent>
        {/if}
      {/each}
    </div>
  {/if}
</nav>
