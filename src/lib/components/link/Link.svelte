<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; href?: string; [key: string]: unknown; }
  let { children, class: className, href, ...rest }: Props = $props();
</script>

<a class={cn('font-medium text-kumo-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand/40', className)} {href} {...rest}>{@render children?.()}</a>
