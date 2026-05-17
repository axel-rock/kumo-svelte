<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getComboboxContext } from './context';
  import { cn } from '$lib/utils/cn';

  export interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.Content');
</script>

{#if context.open}
  <div
    class={cn(
      'absolute z-50 mt-1 flex max-h-[min(24rem,calc(100vh-8rem))] min-w-full flex-col overflow-hidden rounded-lg bg-kumo-base py-1.5 text-base text-kumo-default shadow-lg ring ring-kumo-line',
      className
    )}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
