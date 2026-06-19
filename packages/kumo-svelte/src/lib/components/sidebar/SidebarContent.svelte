<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div
  data-sidebar="content"
  class={cn('relative min-w-0 flex-1 overflow-hidden', className)}
  {...rest}
>
  <div
    tabindex="-1"
    class={cn(
      'h-full px-[11px] py-3 group-not-data-[state=collapsed]/sidebar:px-3.5',
      'transition-[padding] duration-(--sidebar-animation-duration)',
      'overflow-x-hidden!',
      '[mask-image:linear-gradient(to_bottom,transparent_0,black_min(24px,var(--scroll-area-overflow-y-start,24px)),black_calc(100%-min(24px,var(--scroll-area-overflow-y-end,24px))),transparent_100%)]'
    )}
  >
    <div class="flex min-w-0! flex-col">
      {@render children?.()}
    </div>
  </div>
  <div
    class={cn(
      'flex w-1.5 touch-none select-none p-px',
      'opacity-0 transition-opacity duration-150',
      'data-[scrolling]:opacity-100 data-[hovering]:opacity-100'
    )}
  >
    <div class="flex-1 rounded-full bg-kumo-line"></div>
  </div>
</div>
