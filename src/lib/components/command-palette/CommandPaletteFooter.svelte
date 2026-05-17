<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<div class={cn('border-t border-kumo-line px-3 py-2 text-xs text-kumo-subtle', className)} {...rest}>
  {@render children?.()}
</div>
