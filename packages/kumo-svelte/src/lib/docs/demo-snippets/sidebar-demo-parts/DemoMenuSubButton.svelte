<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<li class="relative">
  <button class="flex min-h-[34px] w-full min-w-0 items-center gap-2 rounded-lg px-3 py-1 text-sm font-medium text-kumo-default transition-colors duration-150 hover:bg-kumo-tint">
    <span class="flex-1 truncate text-left">{@render children?.()}</span>
  </button>
</li>
