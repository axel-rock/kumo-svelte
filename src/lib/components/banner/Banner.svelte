<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  type Variant = 'info' | 'success' | 'warning' | 'error';
  const variants: Record<Variant, string> = { info: 'bg-kumo-info-tint/70 text-kumo-info ring-kumo-info/20', success: 'bg-kumo-success-tint/70 text-kumo-success ring-kumo-success/20', warning: 'bg-kumo-warning-tint/70 text-kumo-warning ring-kumo-warning/20', error: 'bg-kumo-danger-tint/60 text-kumo-danger ring-kumo-danger/20' };
  interface Props { children?: Snippet; class?: string; variant?: Variant; title?: string; [key: string]: unknown; }
  let { children, class: className, variant = 'info', title, ...rest }: Props = $props();
</script>

<div class={cn('rounded-lg p-3 text-sm ring', variants[variant], className)} role={variant === 'error' ? 'alert' : 'status'} {...rest}>
  {#if title}<div class="font-medium">{title}</div>{/if}
  <div class={title ? 'mt-1' : undefined}>{@render children?.()}</div>
</div>
