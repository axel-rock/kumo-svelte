<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; as?: string; [key: string]: unknown; }
  let { children, class: className, as = 'div', ...rest }: Props = $props();
</script>

<svelte:element this={as} class={cn('rounded-xl bg-kumo-base text-kumo-default shadow-xs ring ring-kumo-hairline', className)} {...rest}>{@render children?.()}</svelte:element>
