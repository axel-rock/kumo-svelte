<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ArrowRight, ArrowSquareOut as ExternalLink } from 'phosphor-svelte';
  import CommandPaletteItem from './CommandPaletteItem.svelte';
  import CommandPaletteHighlightedText from './CommandPaletteHighlightedText.svelte';
  import { cn } from '$lib/utils/cn';

  interface Props<T = unknown> {
    value: T;
    title: string;
    breadcrumbs?: string[];
    titleHighlights?: [number, number][];
    breadcrumbHighlights?: [number, number][][];
    description?: string;
    icon?: Snippet;
    onclick?: (event?: MouseEvent) => void;
    onSelect?: (value: T) => void;
    showArrow?: boolean;
    external?: boolean;
    nonInteractive?: boolean;
    class?: string;
    [key: string]: unknown;
  }

  let {
    value,
    title,
    breadcrumbs = [],
    titleHighlights = [],
    breadcrumbHighlights = [],
    description,
    icon,
    onclick,
    onSelect,
    showArrow = true,
    external = false,
    nonInteractive = false,
    class: className,
    ...rest
  }: Props = $props();

  function handleSelect() {
    if (nonInteractive) return;
    onclick?.();
    onSelect?.(value);
  }
</script>

<CommandPaletteItem
  value={String(value)}
  disabled={nonInteractive}
  onSelect={handleSelect}
  class={cn('min-h-12 items-start px-3 py-2', className)}
  {...rest}
>
  {#if icon}
    <span class="mt-0.5 flex size-4 shrink-0 items-center justify-center text-kumo-subtle">
      {@render icon()}
    </span>
  {/if}
  <span class="min-w-0 flex-1">
    {#if breadcrumbs.length}
      <span class="mb-0.5 flex min-w-0 flex-wrap items-center gap-1 text-xs text-kumo-subtle">
        {#each breadcrumbs as breadcrumb, index (`${index}-${breadcrumb}`)}
          {#if index > 0}<span>/</span>{/if}
          <span class="truncate">
            <CommandPaletteHighlightedText text={breadcrumb} highlights={breadcrumbHighlights[index] ?? []} />
          </span>
        {/each}
      </span>
    {/if}
    <span class="block truncate font-medium">
      <CommandPaletteHighlightedText text={title} highlights={titleHighlights} />
    </span>
    {#if description}
      <span class="block truncate text-xs text-kumo-subtle">{description}</span>
    {/if}
  </span>
  {#if showArrow}
    {#if external}
      <ExternalLink class="mt-0.5 size-4 shrink-0 text-kumo-muted" />
    {:else}
      <ArrowRight class="mt-0.5 size-4 shrink-0 text-kumo-muted" />
    {/if}
  {/if}
</CommandPaletteItem>
