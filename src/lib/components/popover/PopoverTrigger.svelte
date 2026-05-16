<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    class?: string;
    openOnHover?: boolean;
    openDelay?: number;
    closeDelay?: number;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  let {
    children,
    child: renderChild,
    class: className,
    openOnHover = false,
    openDelay = 700,
    closeDelay = 300,
    type = 'button',
    ...rest
  }: Props = $props();
</script>

<PopoverPrimitive.Trigger
  class={className}
  {openOnHover}
  {openDelay}
  {closeDelay}
  {type}
  {...rest}
>
  {#if renderChild}
    {#snippet child({ props }: { props: Record<string, unknown> })}
      {@render renderChild({ props })}
    {/snippet}
  {:else}
    {@render children?.()}
  {/if}
</PopoverPrimitive.Trigger>
