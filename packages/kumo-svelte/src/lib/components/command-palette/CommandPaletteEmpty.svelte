<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, forceMount, ...rest }: Props = $props();
</script>

<CommandPrimitive.Empty {forceMount} class={cn('px-2 py-6 text-center text-sm text-kumo-subtle', className)} {...rest}>
  {@render children?.()}
</CommandPrimitive.Empty>
