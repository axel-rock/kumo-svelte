<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ArrowRight, ArrowSquareOut as ExternalLink, CaretRight } from 'phosphor-svelte';
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
  class={cn(
    'group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors',
    nonInteractive ? 'cursor-default' : 'cursor-pointer data-[highlighted]:bg-kumo-overlay data-[selected]:bg-kumo-overlay',
    className
  )}
  {...rest}
>
  {#if icon}
    <div class="flex flex-shrink-0 items-center text-kumo-subtle">
      {@render icon()}
    </div>
  {/if}
  <div class="min-w-0 flex-1">
    <div class="flex items-center gap-2 truncate">
      {#each breadcrumbs as breadcrumb, index (`${index}-${breadcrumb}`)}
        <span class="flex items-center gap-2">
          <CommandPaletteHighlightedText
            text={breadcrumb}
            highlights={breadcrumbHighlights[index] ?? []}
            class="text-base text-kumo-default"
          />
          <CaretRight class="h-3 w-3 flex-shrink-0 text-kumo-subtle" weight="bold" />
        </span>
      {/each}
      <CommandPaletteHighlightedText text={title} highlights={titleHighlights} class="text-base text-kumo-default" />
      {#if external}
        <ExternalLink class="h-3.5 w-3.5 flex-shrink-0 text-kumo-subtle" />
      {/if}
      {#if description}
        <span class="text-kumo-subtle">—</span>
        <span class="truncate text-sm text-kumo-subtle">{description}</span>
      {/if}
    </div>
  </div>
  {#if showArrow && !external && !nonInteractive}
    <ArrowRight class="h-4 w-4 flex-shrink-0 text-kumo-subtle opacity-0 transition-opacity group-data-[highlighted]:opacity-100 group-data-[selected]:opacity-100" />
  {/if}
</CommandPaletteItem>
