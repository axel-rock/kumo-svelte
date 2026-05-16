<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getFlowContext } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();

  const context = getFlowContext();
  const orientation = $derived(context?.orientation ?? 'horizontal');
  const align = $derived(context?.align ?? 'start');
</script>

<ul
  class={cn(
    'relative ml-0 list-none',
    orientation === 'vertical' ? 'grid auto-rows-min gap-16' : 'flex gap-16',
    orientation === 'horizontal' && (align === 'center' ? 'items-center' : 'items-start'),
    className
  )}
  {...rest}
>
  {@render children?.()}
</ul>
