<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { setFlowContext, type FlowAlign, type FlowOrientation } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    orientation?: FlowOrientation;
    align?: FlowAlign;
    canvas?: boolean;
    padding?: { x?: number; y?: number };
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    orientation = 'horizontal',
    align = 'start',
    canvas = true,
    padding,
    ...rest
  }: Props = $props();

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
</script>

{#snippet contents()}
  <div class="w-max mx-auto" data-testid="flow-contents">
    <ul
      class={cn(
        'relative ml-0 list-none',
        orientation === 'vertical' ? 'grid auto-rows-min gap-16' : 'flex gap-16',
        orientation === 'horizontal' && (align === 'center' ? 'items-center' : 'items-start')
      )}
    >
      {@render children?.()}
    </ul>
  </div>
{/snippet}

{#if canvas}
  <div
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
  <div class={cn('relative isolate grow', className)} {...rest}>
    {@render contents()}
  </div>
{/if}
