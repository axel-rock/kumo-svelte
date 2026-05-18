<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { SkeletonLine } from '../loader';

  interface Props {
    children?: Snippet;
    icon?: Component;
    loading?: boolean;
    [key: string]: unknown;
  }

  let { children, icon: Icon, loading = false, ...rest }: Props = $props();
</script>

{#if loading}
  <div class="flex w-[125px] min-w-0 items-center gap-1" {...rest}>
    {#if Icon}
      <span class="flex shrink-0 items-center">
        <Icon size={16} />
      </span>
    {/if}
    <SkeletonLine />
  </div>
{:else}
  <div class="flex min-w-0 max-w-full items-center gap-1 font-medium" aria-current="page" {...rest}>
    {#if Icon}
      <span class="flex shrink-0 items-center">
        <Icon size={16} />
      </span>
    {/if}
    <span class="truncate">{@render children?.()}</span>
  </div>
{/if}
