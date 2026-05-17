<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getFlowContext } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    align?: 'start' | 'end';
    [key: string]: unknown;
  }

  let { children, class: className, align = 'start', ...rest }: Props = $props();

  const context = getFlowContext();
  const orientation = $derived(context?.orientation ?? 'horizontal');
</script>

<div
  class={cn(
    'relative isolate',
    orientation === 'horizontal' ? 'px-16 -mr-16 -ml-16' : 'py-16 -mb-16 -mt-16',
    className
  )}
  data-flow-parallel
  data-orientation={orientation}
  {...rest}
>
  <ul
    class={cn(
      'gap-5 list-none flex',
      align === 'start' ? 'items-start' : 'items-end',
      orientation === 'horizontal' ? 'flex-col ml-0' : 'gap-5 w-fit mx-auto'
    )}
  >
    {@render children?.()}
  </ul>
</div>

<style>
  :global([data-flow-parallel][data-orientation='horizontal'])::before,
  :global([data-flow-parallel][data-orientation='horizontal'])::after {
    content: '';
    position: absolute;
    top: 50%;
    height: 0.125rem;
    width: 2rem;
    transform: translateY(-50%);
    background: var(--color-kumo-inactive);
    pointer-events: none;
  }

  :global([data-flow-parallel][data-orientation='horizontal'])::before {
    right: calc(100% - 4rem);
  }

  :global([data-flow-parallel][data-orientation='horizontal'])::after {
    left: calc(100% - 4rem);
  }

  :global([data-flow-parallel][data-orientation='horizontal'] > ul)::before,
  :global([data-flow-parallel][data-orientation='horizontal'] > ul)::after {
    content: '';
    position: absolute;
    top: 50%;
    bottom: 50%;
    width: 0.125rem;
    background: var(--color-kumo-inactive);
    pointer-events: none;
  }

  :global([data-flow-parallel][data-orientation='horizontal'] > ul)::before {
    left: -2rem;
  }

  :global([data-flow-parallel][data-orientation='horizontal'] > ul)::after {
    right: -2rem;
  }

  :global([data-flow-parallel][data-orientation='horizontal'] > ul > li:first-child)::before,
  :global([data-flow-parallel][data-orientation='horizontal'] > ul > li:first-child)::after,
  :global([data-flow-parallel][data-orientation='horizontal'] > ul > [data-flow-list]:first-child li:first-child)::before,
  :global([data-flow-parallel][data-orientation='horizontal'] > ul > [data-flow-list]:first-child li:first-child)::after {
    display: block;
  }
</style>
