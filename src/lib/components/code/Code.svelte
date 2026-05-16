<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; inline?: boolean; [key: string]: unknown; }
  let { children, class: className, inline = false, ...rest }: Props = $props();
</script>

{#if inline}
  <code class={cn('rounded bg-kumo-fill px-1 py-0.5 font-mono text-sm text-kumo-default', className)} {...rest}>{@render children?.()}</code>
{:else}
  <pre class={cn('overflow-auto rounded-xl bg-kumo-surface p-4 text-sm text-kumo-default ring ring-kumo-hairline', className)} {...rest}><code>{@render children?.()}</code></pre>
{/if}
