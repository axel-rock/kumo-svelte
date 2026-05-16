<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  type Variant = 'default' | 'success' | 'error' | 'warning';
  const variants = { default: 'border-kumo-line', success: 'border-kumo-success text-kumo-success', error: 'border-kumo-danger text-kumo-danger', warning: 'border-kumo-warning text-kumo-warning' };
  interface Props { children?: Snippet; class?: string; title?: string; variant?: Variant; [key: string]: unknown; }
  let { children, class: className, title, variant = 'default', ...rest }: Props = $props();
</script>

<div class={cn('rounded-xl border bg-kumo-base p-4 text-sm text-kumo-default shadow-lg', variants[variant], className)} role="status" {...rest}>
  {#if title}<div class="font-medium">{title}</div>{/if}
  <div class={title ? 'mt-1' : undefined}>{@render children?.()}</div>
</div>
