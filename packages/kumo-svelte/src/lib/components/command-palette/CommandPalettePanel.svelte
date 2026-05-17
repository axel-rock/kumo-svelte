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

<div class={cn('overflow-hidden rounded-xl bg-kumo-base shadow-lg ring ring-kumo-hairline', className)} {...rest}>
  {@render children?.()}
</div>
