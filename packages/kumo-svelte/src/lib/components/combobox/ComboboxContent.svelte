<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getComboboxContext } from './context';
  import { cn } from '$lib/utils/cn';

  type ComboboxContentAlign = 'start' | 'center' | 'end';
  type ComboboxContentSide = 'top' | 'right' | 'bottom' | 'left';
  type Offset = number | string;

  export interface Props {
    children?: Snippet;
    class?: string;
    align?: ComboboxContentAlign;
    alignOffset?: Offset;
    side?: ComboboxContentSide;
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
  const context = getComboboxContext('Combobox.Content');

  const horizontalAlignClasses: Record<ComboboxContentAlign, string> = {
    start: 'left-[var(--combobox-align-offset)]',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-[var(--combobox-align-offset)]'
  };

  const verticalAlignClasses: Record<ComboboxContentAlign, string> = {
    start: 'top-[var(--combobox-align-offset)]',
    center: 'top-1/2 -translate-y-1/2',
    end: 'bottom-[var(--combobox-align-offset)]'
  };

  const sideClasses: Record<ComboboxContentSide, string> = {
    top: 'bottom-full mb-[var(--combobox-side-offset)]',
    right: 'left-full ml-[var(--combobox-side-offset)]',
    bottom: 'top-full mt-[var(--combobox-side-offset)]',
    left: 'right-full mr-[var(--combobox-side-offset)]'
  };

  function toCssUnit(value: Offset) {
    return typeof value === 'number' ? `${value}px` : value;
  }

  const positionStyle = $derived(
    `--combobox-align-offset: ${toCssUnit(alignOffset)}; --combobox-side-offset: ${toCssUnit(sideOffset)};${style ? ` ${style}` : ''}`
  );
  const positionClass = $derived.by(() =>
    side === 'top' || side === 'bottom'
      ? cn(sideClasses[side], horizontalAlignClasses[align])
      : cn(sideClasses[side], verticalAlignClasses[align])
  );
</script>

{#if context.open}
  <div
    class={cn(
      'absolute z-50 flex max-h-[min(24rem,calc(100vh-8rem))] min-w-full flex-col overflow-hidden rounded-lg bg-kumo-base py-1.5 text-base text-kumo-default shadow-lg ring ring-kumo-line',
      positionClass,
      className
    )}
    style={positionStyle}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
