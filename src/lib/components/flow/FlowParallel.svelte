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
    'relative isolate before:absolute before:top-1/2 before:right-full before:h-0.5 before:w-8 before:-translate-y-1/2 before:bg-kumo-inactive after:absolute after:top-1/2 after:left-full after:h-0.5 after:w-8 after:-translate-y-1/2 after:bg-kumo-inactive',
    orientation === 'horizontal' ? 'px-16 -mr-16 -ml-16' : 'py-16 -mb-16 -mt-16',
    className
  )}
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
