<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getAutocompleteContext } from './context';
  import { cn } from '$lib/utils/cn';

  type AutocompleteContentAlign = 'start' | 'center' | 'end';
  type AutocompleteContentSide = 'top' | 'right' | 'bottom' | 'left';
  type Offset = number | string;

  export interface Props {
    children?: Snippet;
    class?: string;
    align?: AutocompleteContentAlign;
    alignOffset?: Offset;
    side?: AutocompleteContentSide;
    sideOffset?: Offset;
    style?: string;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    align = 'start',
    alignOffset = 0,
    side = 'bottom',
    sideOffset = 4,
    style,
    ...rest
  }: Props = $props();
  const context = getAutocompleteContext('Autocomplete.Content');

  const horizontalAlignClasses: Record<AutocompleteContentAlign, string> = {
    start: 'left-[var(--autocomplete-align-offset)]',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-[var(--autocomplete-align-offset)]'
  };

  const verticalAlignClasses: Record<AutocompleteContentAlign, string> = {
    start: 'top-[var(--autocomplete-align-offset)]',
    center: 'top-1/2 -translate-y-1/2',
    end: 'bottom-[var(--autocomplete-align-offset)]'
  };

  const sideClasses: Record<AutocompleteContentSide, string> = {
    top: 'bottom-full mb-[var(--autocomplete-side-offset)]',
    right: 'left-full ml-[var(--autocomplete-side-offset)]',
    bottom: 'top-full mt-[var(--autocomplete-side-offset)]',
    left: 'right-full mr-[var(--autocomplete-side-offset)]'
  };

  function toCssUnit(value: Offset) {
    return typeof value === 'number' ? `${value}px` : value;
  }

  const positionStyle = $derived(
    `--autocomplete-align-offset: ${toCssUnit(alignOffset)}; --autocomplete-side-offset: ${toCssUnit(sideOffset)};${style ? ` ${style}` : ''}`
  );
  const positionClass = $derived.by(() =>
    side === 'top' || side === 'bottom'
      ? cn(sideClasses[side], horizontalAlignClasses[align])
      : cn(sideClasses[side], verticalAlignClasses[align])
  );
</script>

{#if context.open && context.filteredItems.length}
  <div
    class={cn(
      'absolute z-50 flex max-h-[min(24rem,calc(100vh-8rem))] min-w-full flex-col overflow-hidden rounded-lg bg-kumo-control py-1.5 text-kumo-default shadow-lg ring ring-kumo-line',
      positionClass,
      className
    )}
    style={positionStyle}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
