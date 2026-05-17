<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getComboboxContext } from './context';

  export interface Props {
    children?: Snippet;
    [key: string]: unknown;
  }

  let { children, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.Value');
</script>

<span {...rest}>
  {#if children}
    {@render children()}
  {:else}
    {context.labelFor(context.value)}
  {/if}
</span>
