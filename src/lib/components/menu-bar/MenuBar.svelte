<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Item { label: string; href?: string; }
  interface Props { class?: string; items?: Item[]; [key: string]: unknown; }
  let { class: className, items = [], ...rest }: Props = $props();
</script>

<nav class={cn('flex h-9 items-center gap-1 rounded-lg bg-kumo-base p-1 ring ring-kumo-line', className)} {...rest}>
  {#each items as item}<a class="rounded-md px-3 py-1.5 text-sm text-kumo-default hover:bg-kumo-tint" href={item.href}>{item.label}</a>{/each}
</nav>
