<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
  }

  let {
    children,
    open = $bindable(false),
    onOpenChange,
    onOpenChangeComplete
  }: Props = $props();
</script>

<PopoverPrimitive.Root bind:open {onOpenChange} {onOpenChangeComplete}>
  {@render children?.()}
</PopoverPrimitive.Root>
