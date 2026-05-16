<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; label?: string; description?: string; error?: string; required?: boolean; [key: string]: unknown; }
  let { children, class: className, label, description, error, required = false, ...rest }: Props = $props();
</script>

<div class={cn('grid gap-1.5', className)} {...rest}>
  {#if label}<div class="text-sm font-medium text-kumo-default">{label}{#if required}<span class="ml-1 text-kumo-danger">*</span>{/if}</div>{/if}
  {@render children?.()}
  {#if error}<div class="text-xs text-kumo-danger">{error}</div>{:else if description}<div class="text-xs text-kumo-muted">{description}</div>{/if}
</div>
