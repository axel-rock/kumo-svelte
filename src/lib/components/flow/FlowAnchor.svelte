<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    type?: 'start' | 'end';
    [key: string]: unknown;
  }

  let { children, type, ...rest }: Props = $props();
</script>

<div data-flow-anchor={type} {...rest}>
  {@render children?.()}
</div>
