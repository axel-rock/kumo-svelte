<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; prefix?: string; suffix?: string; [key: string]: unknown; }
  let { children, class: className, prefix, suffix, ...rest }: Props = $props();
</script>

<div class={cn('flex h-9 w-full items-center overflow-hidden rounded-lg bg-kumo-base text-kumo-default shadow-xs ring ring-kumo-line focus-within:ring-2 focus-within:ring-kumo-brand/40', className)} {...rest}>
  {#if prefix}<span class="px-3 text-sm text-kumo-muted">{prefix}</span>{/if}
  <div class="min-w-0 flex-1">{@render children?.()}</div>
  {#if suffix}<span class="px-3 text-sm text-kumo-muted">{suffix}</span>{/if}
</div>
