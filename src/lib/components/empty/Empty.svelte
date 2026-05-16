<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; title?: string; description?: string; [key: string]: unknown; }
  let { children, class: className, title = 'No results', description, ...rest }: Props = $props();
</script>

<div class={cn('flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-kumo-line p-8 text-center', className)} {...rest}>
  <div class="text-sm font-medium text-kumo-default">{title}</div>
  {#if description}<div class="mt-1 text-sm text-kumo-muted">{description}</div>{/if}
  {@render children?.()}
</div>
