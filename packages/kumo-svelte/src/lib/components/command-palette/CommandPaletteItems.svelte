<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    [key: string]: unknown;
  }

  let { children, ...rest }: Props = $props();
</script>

<CommandPrimitive.GroupItems {...rest}>
  {@render children?.()}
</CommandPrimitive.GroupItems>
