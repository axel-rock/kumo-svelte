<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    open?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
  }

  let {
    children,
    class: className,
    defaultOpen = false,
    open = $bindable(defaultOpen),
    disabled = false,
    onOpenChange,
    onOpenChangeComplete
  }: Props = $props();
</script>

<CollapsiblePrimitive.Root
  bind:open
  class={className}
  {disabled}
  {onOpenChange}
  {onOpenChangeComplete}
>
  {@render children?.()}
</CollapsiblePrimitive.Root>
