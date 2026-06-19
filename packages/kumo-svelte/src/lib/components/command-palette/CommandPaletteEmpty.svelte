<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, forceMount, ...rest }: Props = $props();
</script>

<CommandPrimitive.Empty {forceMount} class={className} {...rest}>
  <div class="p-8 text-center">
    <p class="text-kumo-subtle">{@render children?.()}</p>
  </div>
</CommandPrimitive.Empty>
