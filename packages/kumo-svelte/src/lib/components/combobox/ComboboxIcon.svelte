<script lang="ts">
  import type { Snippet } from 'svelte';

  export interface Props {
    children?: Snippet;
    [key: string]: unknown;
  }

  let { children, ...rest }: Props = $props();
</script>

<span {...rest}>
  {@render children?.()}
</span>
