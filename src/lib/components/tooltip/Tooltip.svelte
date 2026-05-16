<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { trigger: Snippet; children?: Snippet; class?: string; open?: boolean; [key: string]: unknown; }
  let { trigger, children, class: className, open = $bindable(false), ...rest }: Props = $props();
</script>

<TooltipPrimitive.Provider>
  <TooltipPrimitive.Root bind:open {...rest}>
    <TooltipPrimitive.Trigger>{@render trigger()}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content class={cn('z-50 rounded-md bg-kumo-default px-2 py-1 text-xs font-medium text-kumo-base shadow-md', className)} sideOffset={6}>
        {@render children?.()}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
</TooltipPrimitive.Provider>
