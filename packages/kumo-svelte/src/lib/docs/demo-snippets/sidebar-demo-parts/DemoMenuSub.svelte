<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<ul class="m-0 ml-3.5 flex min-w-0 list-none flex-col gap-0.5 border-l border-kumo-hairline p-0 pl-2.5 group-data-[state=collapsed]/sidebar:hidden">
  {@render children?.()}
</ul>
