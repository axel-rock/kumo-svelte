<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; for?: string; required?: boolean; [key: string]: unknown; }
  let { children, class: className, for: htmlFor, required = false, ...rest }: Props = $props();
</script>

<label class={cn('inline-flex items-center gap-1 text-sm font-medium text-kumo-default', className)} for={htmlFor} {...rest}>{@render children?.()}{#if required}<span class="text-kumo-danger">*</span>{/if}</label>
