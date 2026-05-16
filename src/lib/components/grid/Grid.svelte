<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; cols?: 1 | 2 | 3 | 4; gap?: 'sm' | 'base' | 'lg'; [key: string]: unknown; }
  const colsMap = { 1: 'grid-cols-1', 2: 'grid-cols-1 md:grid-cols-2', 3: 'grid-cols-1 md:grid-cols-3', 4: 'grid-cols-1 md:grid-cols-4' };
  const gaps = { sm: 'gap-2', base: 'gap-4', lg: 'gap-6' };
  let { children, class: className, cols = 2, gap = 'base', ...rest }: Props = $props();
</script>

<div class={cn('grid', colsMap[cols], gaps[gap], className)} {...rest}>{@render children?.()}</div>
