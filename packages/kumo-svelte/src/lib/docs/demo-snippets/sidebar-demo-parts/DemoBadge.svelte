<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<span class="inline-flex shrink-0 select-none items-center rounded-full border border-dashed border-kumo-hairline px-1.5 py-0.5 text-[11px]/none font-medium text-kumo-subtle">
  {@render children?.()}
</span>
