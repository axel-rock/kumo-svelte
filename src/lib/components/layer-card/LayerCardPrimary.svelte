<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const LAYER_CARD_PRIMARY_CLASSES =
    'relative flex flex-col gap-2 overflow-hidden rounded-lg bg-kumo-base p-4 pr-3 text-inherit no-underline ring ring-kumo-fill';

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

<div class={cn(LAYER_CARD_PRIMARY_CLASSES, className)} {...rest}>
  {@render children?.()}
</div>
