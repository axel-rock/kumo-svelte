<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getAutocompleteContext } from './context';
  import { cn } from '$lib/utils/cn';

  export interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
  const context = getAutocompleteContext('Autocomplete.Content');
</script>

{#if context.open && context.filteredItems.length}
  <div
    class={cn(
      'absolute z-50 mt-1 flex max-h-96 min-w-full flex-col overflow-hidden rounded-lg bg-kumo-control py-1.5 text-kumo-default shadow-lg ring ring-kumo-line',
      className
    )}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
