<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { setFlowContext, type FlowAlign, type FlowOrientation } from './context';
  import FlowList from './FlowList.svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    orientation?: FlowOrientation;
    align?: FlowAlign;
    canvas?: boolean;
    padding?: { x?: number; y?: number };
    onOverflowChange?: (overflow: { x: boolean; y: boolean }) => void;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    orientation = 'horizontal',
    align = 'start',
    canvas = true,
    padding,
    onOverflowChange,
    ...rest
  }: Props = $props();

  let wrapperElement = $state<HTMLDivElement>();
  let contentElement = $state<HTMLDivElement>();
  let resizeObserver: ResizeObserver | undefined;
  let previousOverflow: { x: boolean; y: boolean } | undefined;

  const paddingX = $derived(padding?.x ?? 16);
  const paddingY = $derived(padding?.y ?? 64);

  setFlowContext({
    get orientation() {
      return orientation;
    },
    get align() {
      return align;
    }
  });

  function measureOverflow() {
    if (!canvas || !wrapperElement || !contentElement) return;

    const availableWidth = wrapperElement.clientWidth - paddingX * 2;
    const availableHeight = wrapperElement.clientHeight - paddingY * 2;
    const overflow = {
      x: contentElement.scrollWidth > availableWidth,
      y: contentElement.scrollHeight > availableHeight
    };

    if (previousOverflow?.x === overflow.x && previousOverflow?.y === overflow.y) return;
    previousOverflow = overflow;
    onOverflowChange?.(overflow);
  }

  onMount(() => {
    tick().then(measureOverflow);

    resizeObserver = new ResizeObserver(measureOverflow);
    if (wrapperElement) resizeObserver.observe(wrapperElement);
    if (contentElement) resizeObserver.observe(contentElement);

    return () => {
      resizeObserver?.disconnect();
    };
  });

  $effect(() => {
    canvas;
    paddingX;
    paddingY;
    children;
    tick().then(measureOverflow);
  });
</script>

{#snippet contents()}
  <div bind:this={contentElement} class="w-max mx-auto" data-testid="flow-contents">
    <FlowList>
      {@render children?.()}
    </FlowList>
  </div>
{/snippet}

{#if canvas}
  <div
    bind:this={wrapperElement}
    class={cn('relative isolate grow overflow-auto', className)}
    style:padding-top={`${paddingY}px`}
    style:padding-bottom={`${paddingY}px`}
    style:padding-left={`${paddingX}px`}
    style:padding-right={`${paddingX}px`}
    {...rest}
  >
    {@render contents()}
  </div>
{:else}
  <div bind:this={wrapperElement} class={cn('relative isolate grow', className)} {...rest}>
    {@render contents()}
  </div>
{/if}
