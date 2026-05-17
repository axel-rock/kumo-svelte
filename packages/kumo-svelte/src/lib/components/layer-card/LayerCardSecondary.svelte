<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const LAYER_CARD_SECONDARY_CLASSES =
    '-my-2 flex items-center gap-2 bg-kumo-elevated p-4 text-base font-medium text-kumo-subtle';

  interface LayerCardContext {
    registerSection: () => () => void;
  }

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();

  const context = getContext<LayerCardContext | undefined>('kumo-layer-card');
  const unregister = context?.registerSection();

  onDestroy(() => {
    unregister?.();
  });
</script>

<div class={cn(LAYER_CARD_SECONDARY_CLASSES, className)} {...rest}>
  {@render children?.()}
</div>
