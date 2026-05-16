<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  let { children, child: renderChild, class: className, type = 'button', ...rest }: Props = $props();
</script>

<PopoverPrimitive.Close class={className} {type} {...rest}>
  {#if renderChild}
    {#snippet child({ props }: { props: Record<string, unknown> })}
      {@render renderChild({ props })}
    {/snippet}
  {:else}
    {@render children?.()}
  {/if}
</PopoverPrimitive.Close>
