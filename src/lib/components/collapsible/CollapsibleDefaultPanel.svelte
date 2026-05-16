<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import CollapsiblePanel from './CollapsiblePanel.svelte';

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
</script>

<CollapsiblePanel
  class={cn('my-2 space-y-4 border-l-2 border-kumo-fill pl-4', className)}
  {keepMounted}
  {forceMount}
  {hiddenUntilFound}
  {...rest}
>
  {@render children?.()}
</CollapsiblePanel>
