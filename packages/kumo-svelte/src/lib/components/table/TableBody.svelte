<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    [key: string]: unknown;
  }

  let { children, ...rest }: Props = $props();
</script>

<tbody {...rest}>
  {@render children?.()}
</tbody>
