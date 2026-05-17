<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<CommandPrimitive.GroupHeading class={cn('px-2 py-1.5 text-xs font-medium text-kumo-subtle', className)} {...rest}>
  {@render children?.()}
</CommandPrimitive.GroupHeading>
