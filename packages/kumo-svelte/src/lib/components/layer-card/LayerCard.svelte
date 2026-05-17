<script lang="ts">
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const LAYER_CARD_SURFACE_CLASSES =
    'overflow-hidden rounded-lg bg-kumo-base shadow-xs ring ring-kumo-line';
  const LAYER_CARD_LAYERED_ROOT_CLASSES =
    'flex w-full flex-col overflow-hidden rounded-lg bg-kumo-elevated text-base ring ring-kumo-hairline';

  interface Props {
    children?: Snippet;
    class?: string;
    as?: string;
    [key: string]: unknown;
  }

  let { children, class: className, as = 'div', ...rest }: Props = $props();

  let sectionCount = $state(0);

  setContext('kumo-layer-card', {
    registerSection: () => {
      sectionCount += 1;

      return () => {
        sectionCount -= 1;
      };
    }
  });
</script>

<svelte:element
  this={as}
  class={cn(sectionCount > 0 ? LAYER_CARD_LAYERED_ROOT_CLASSES : LAYER_CARD_SURFACE_CLASSES, className)}
  {...rest}
>
  {@render children?.()}
</svelte:element>
