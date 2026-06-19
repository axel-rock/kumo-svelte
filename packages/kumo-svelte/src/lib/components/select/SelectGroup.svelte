<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Select as SelectPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<SelectPrimitive.Group class={cn(className)} data-kumo-component="Select" data-kumo-part="group" {...rest}>
  {@render children?.()}
</SelectPrimitive.Group>
