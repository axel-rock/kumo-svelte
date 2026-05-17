<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    variant?: 'large' | 'small';
    name: string;
    color: string;
    value: string;
    unit?: string;
    inactive?: boolean;
  }

  let { variant = 'small', name, color, value, unit, inactive = false }: Props = $props();
</script>

{#if variant === 'large'}
  <div class="inline-flex min-w-42 flex-col gap-2 py-2">
    <div class="flex items-center gap-2">
      <span class={cn('inline-block size-2 rounded-full', inactive && 'opacity-50')} style:background-color={color}></span>
      <span class={cn('text-xs', inactive && 'opacity-50')}>{name}</span>
    </div>
    <div class="flex items-baseline gap-0.5">
      <span class={cn('text-lg leading-none font-medium', inactive && 'opacity-50')}>{value}</span>
      {#if unit}<span class={cn('text-xs leading-none text-kumo-subtle', inactive && 'opacity-50')}>{unit}</span>{/if}
    </div>
  </div>
{:else}
  <div class="inline-flex items-center gap-2">
    <span class={cn('inline-block size-2 rounded-full', inactive && 'opacity-50')} style:background-color={color}></span>
    <span class={cn('text-xs', inactive && 'opacity-50')}>{name}</span>
    <span class={cn('text-xs font-medium', inactive && 'opacity-50')}>{value}</span>
    {#if unit}<span class={cn('text-xs text-kumo-subtle', inactive && 'opacity-50')}>{unit}</span>{/if}
  </div>
{/if}
