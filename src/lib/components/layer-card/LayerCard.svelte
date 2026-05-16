<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div class={cn('rounded-xl bg-kumo-surface p-4 text-kumo-default shadow-sm ring ring-kumo-hairline', className)} {...rest}>{@render children?.()}</div>
