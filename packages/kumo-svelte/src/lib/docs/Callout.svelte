<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    type?: 'info' | 'warning' | 'error' | 'success';
  }

  let { children, type = 'info' }: Props = $props();

  const variants = {
    info: 'border-kumo-info/50 bg-kumo-info-tint/30 text-kumo-info',
    warning: 'border-kumo-warning/50 bg-kumo-warning-tint/15 text-kumo-warning',
    error: 'border-kumo-danger/50 bg-kumo-danger-tint/15 text-kumo-danger',
    success: 'border-kumo-success/50 bg-kumo-success-tint/30 text-kumo-success'
  };
</script>

<div class={cn('not-prose my-4 rounded-lg border px-4 py-3 text-base', variants[type])}>
  {@render children?.()}
</div>
