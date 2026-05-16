<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
  interface Props { trigger?: Snippet; children?: Snippet; class?: string; open?: boolean; [key: string]: unknown; }
  let { trigger, children, class: className, open = $bindable(false), ...rest }: Props = $props();
</script>

<CollapsiblePrimitive.Root bind:open class={cn('rounded-lg ring ring-kumo-line', className)} {...rest}>
  {#if trigger}<CollapsiblePrimitive.Trigger class="w-full px-3 py-2 text-left text-sm font-medium text-kumo-default hover:bg-kumo-tint">{@render trigger()}</CollapsiblePrimitive.Trigger>{/if}
  <CollapsiblePrimitive.Content class="border-t border-kumo-line p-3 text-sm text-kumo-muted">{@render children?.()}</CollapsiblePrimitive.Content>
</CollapsiblePrimitive.Root>
