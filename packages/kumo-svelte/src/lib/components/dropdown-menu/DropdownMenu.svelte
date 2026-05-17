<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    [key: string]: unknown;
  }

  let { children, open = $bindable(false), onOpenChange, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.Root bind:open {onOpenChange} {...rest}>
  {@render children?.()}
</DropdownMenuPrimitive.Root>
