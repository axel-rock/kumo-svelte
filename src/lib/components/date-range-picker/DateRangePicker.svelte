<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; start?: string; end?: string; [key: string]: unknown; }
  let { class: className, start = $bindable(''), end = $bindable(''), ...rest }: Props = $props();
</script>

<div class={cn('inline-flex items-center gap-2', className)} {...rest}>
  <input type="date" bind:value={start} class="h-9 rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line focus:ring-2 focus:ring-kumo-brand/40" />
  <span class="text-kumo-muted">—</span>
  <input type="date" bind:value={end} class="h-9 rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line focus:ring-2 focus:ring-kumo-brand/40" />
</div>
