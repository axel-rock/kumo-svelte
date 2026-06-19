<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    variant?: 'large' | 'small';
    name: string;
    color: string;
    value: string;
    unit?: string;
    inactive?: boolean;
    onclick?: (event: MouseEvent) => void;
    onpointerenter?: (event: PointerEvent) => void;
    onpointerleave?: (event: PointerEvent) => void;
    class?: string;
  }

  let {
    variant = 'small',
    name,
    color,
    value,
    unit,
    inactive = false,
    onclick,
    onpointerenter,
    onpointerleave,
    class: className
  }: Props = $props();

  function onInteractiveKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    (event.currentTarget as HTMLDivElement).click();
  }
</script>

{#if variant === 'large'}
  <div
    role="button"
    tabindex={onclick ? 0 : -1}
    class={cn('inline-flex min-w-42 flex-col gap-2 py-2', onclick && 'cursor-pointer', className)}
    {onpointerenter}
    {onpointerleave}
    {onclick}
    onkeydown={onclick ? onInteractiveKeyDown : undefined}
  >
    <div class="flex items-center gap-2">
      <span
        class={cn('inline-block size-2 rounded-full', inactive && 'opacity-50')}
        style:background-color={color}
      ></span>
      <span class={cn('text-xs', inactive && 'opacity-50')}>{name}</span>
    </div>
    <div class="flex items-baseline gap-0.5">
      <span class={cn('text-lg leading-none font-medium', inactive && 'opacity-50')}>{value}</span>
      {#if unit}<span class={cn('text-xs leading-none text-kumo-subtle', inactive && 'opacity-50')}>{unit}</span>{/if}
    </div>
  </div>
{:else}
  <div
    role="button"
    tabindex={onclick ? 0 : -1}
    class={cn('inline-flex items-center gap-2', onclick && 'cursor-pointer', className)}
    {onpointerenter}
    {onpointerleave}
    {onclick}
    onkeydown={onclick ? onInteractiveKeyDown : undefined}
  >
    <span
      class={cn('inline-block size-2 rounded-full', inactive && 'opacity-50')}
      style:background-color={color}
    ></span>
    <span class={cn('text-xs', inactive && 'opacity-50')}>{name}</span>
    <span class={cn('text-xs font-medium', inactive && 'opacity-50')}>{value}</span>
    {#if unit}<span class={cn('text-xs text-kumo-subtle', inactive && 'opacity-50')}>{unit}</span>{/if}
  </div>
{/if}
