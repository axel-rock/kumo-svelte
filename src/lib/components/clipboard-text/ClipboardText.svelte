<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; value: string; copiedLabel?: string; copyLabel?: string; [key: string]: unknown; }
  let { class: className, value, copiedLabel = 'Copied', copyLabel = 'Copy', ...rest }: Props = $props();
  let copied = $state(false);
  async function copy() { await navigator.clipboard?.writeText(value); copied = true; setTimeout(() => copied = false, 1200); }
</script>

<div class={cn('inline-flex items-center gap-2 rounded-lg bg-kumo-surface px-2 py-1 text-sm text-kumo-default ring ring-kumo-line', className)} {...rest}>
  <code>{value}</code>
  <button class="rounded px-1.5 py-0.5 text-xs text-kumo-link hover:bg-kumo-tint" onclick={copy}>{copied ? copiedLabel : copyLabel}</button>
</div>
