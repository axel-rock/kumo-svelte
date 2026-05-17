<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Item { label: string; href?: string; active?: boolean; }
  interface Props { children?: Snippet; class?: string; items?: Item[]; [key: string]: unknown; }
  let { children, class: className, items = [], ...rest }: Props = $props();
</script>

<aside class={cn('flex h-full w-64 flex-col border-r border-kumo-line bg-kumo-surface p-3 text-kumo-default', className)} {...rest}>
  <nav class="grid gap-1">
    {#each items as item}<a class={cn('rounded-md px-2 py-1.5 text-sm hover:bg-kumo-tint', item.active && 'bg-kumo-fill font-medium')} href={item.href}>{item.label}</a>{/each}
  </nav>
  {@render children?.()}
</aside>
