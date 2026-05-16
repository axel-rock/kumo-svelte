<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Item { title: string; href: string; depth?: number; }
  interface Props { class?: string; items?: Item[]; [key: string]: unknown; }
  let { class: className, items = [], ...rest }: Props = $props();
</script>

<nav class={cn('space-y-1 text-sm', className)} aria-label="Table of contents" {...rest}>
  {#each items as item}
    <a class="block rounded-md px-2 py-1 text-kumo-muted hover:bg-kumo-tint hover:text-kumo-default" style={`padding-left: ${(item.depth ?? 1) * 0.5}rem`} href={item.href}>{item.title}</a>
  {/each}
</nav>
