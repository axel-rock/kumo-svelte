<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; value?: number; max?: number; label?: string; [key: string]: unknown; }
  let { class: className, value = 0, max = 100, label, ...rest }: Props = $props();
  let pct = $derived(Math.max(0, Math.min(100, (value / max) * 100)));
</script>

<div class={cn('grid gap-1', className)} {...rest}>
  {#if label}<div class="flex justify-between text-xs text-kumo-muted"><span>{label}</span><span>{Math.round(pct)}%</span></div>{/if}
  <div class="h-2 overflow-hidden rounded-full bg-kumo-fill" role="meter" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max}>
    <div class="h-full rounded-full bg-kumo-brand transition-all" style={`width: ${pct}%`}></div>
  </div>
</div>
