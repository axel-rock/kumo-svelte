<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    value?: string;
    forceMount?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, value, forceMount, ...rest }: Props = $props();
</script>

<CommandPrimitive.Group {value} {forceMount} class={cn('py-1', className)} {...rest}>
  {@render children?.()}
</CommandPrimitive.Group>
