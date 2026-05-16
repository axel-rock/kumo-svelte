<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    keepMounted?: boolean;
    forceMount?: boolean;
    hiddenUntilFound?: boolean;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    keepMounted = false,
    forceMount = false,
    hiddenUntilFound = true,
    ...rest
  }: Props = $props();

  let shouldForceMount = $derived(forceMount || keepMounted);
</script>

<CollapsiblePrimitive.Content
  class={className}
  forceMount={shouldForceMount}
  {hiddenUntilFound}
  {...rest}
>
  {@render children?.()}
</CollapsiblePrimitive.Content>
