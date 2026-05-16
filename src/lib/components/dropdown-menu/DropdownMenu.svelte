<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Item { label: string; href?: string; disabled?: boolean; action?: () => void; }
  interface Props { trigger?: Snippet; class?: string; items?: Item[]; [key: string]: unknown; }
  let { trigger, class: className, items = [], ...rest }: Props = $props();
  let open = $state(false);
</script>

<div class={cn('relative inline-block', className)} {...rest}>
  <button class="inline-flex h-9 items-center rounded-lg bg-kumo-base px-3 text-sm text-kumo-default ring ring-kumo-line hover:bg-kumo-tint" onclick={() => open = !open}>{#if trigger}{@render trigger()}{:else}Menu{/if}</button>
  {#if open}<div class="absolute right-0 z-50 mt-1 min-w-44 rounded-lg bg-kumo-base p-1 shadow-lg ring ring-kumo-hairline">
    {#each items as item}
      {#if item.href}
        <a href={item.href} class="block w-full rounded-md px-2 py-1.5 text-left text-sm text-kumo-default hover:bg-kumo-tint">{item.label}</a>
      {:else}
        <button disabled={item.disabled} onclick={item.action} class="block w-full rounded-md px-2 py-1.5 text-left text-sm text-kumo-default hover:bg-kumo-tint disabled:opacity-50">{item.label}</button>
      {/if}
    {/each}
  </div>{/if}
</div>
