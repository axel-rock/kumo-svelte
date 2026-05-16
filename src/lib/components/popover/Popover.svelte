<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { trigger: Snippet; children?: Snippet; class?: string; open?: boolean; [key: string]: unknown; }
  let { trigger, children, class: className, open = $bindable(false), ...rest }: Props = $props();
</script>

<PopoverPrimitive.Root bind:open {...rest}>
  <PopoverPrimitive.Trigger>{@render trigger()}</PopoverPrimitive.Trigger>
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content class={cn('z-50 min-w-48 rounded-lg bg-kumo-base p-3 text-sm text-kumo-default shadow-lg ring ring-kumo-hairline outline-none', className)} sideOffset={6}>
      {@render children?.()}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
