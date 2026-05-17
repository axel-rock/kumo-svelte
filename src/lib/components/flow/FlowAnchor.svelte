<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type { Snippet } from 'svelte';
  import { getFlowAnchorContext } from './context';

  interface Props {
    children?: Snippet;
    type?: 'start' | 'end';
    [key: string]: unknown;
  }

  let { children, type, ...rest }: Props = $props();

  const context = getFlowAnchorContext();
  let anchorElement: HTMLElement;

  onMount(() => {
    const register = () => {
      if (type === 'start' || type === undefined) {
        context.registerStartAnchor(anchorElement);
      }
      if (type === 'end' || type === undefined) {
        context.registerEndAnchor(anchorElement);
      }
    };

    tick().then(register);

    return () => {
      if (type === 'start' || type === undefined) {
        context.registerStartAnchor(null);
      }
      if (type === 'end' || type === undefined) {
        context.registerEndAnchor(null);
      }
    };
  });
</script>

<div bind:this={anchorElement} data-flow-anchor={type} {...rest}>
  {@render children?.()}
</div>
