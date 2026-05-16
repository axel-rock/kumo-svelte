<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div class={cn('w-full overflow-auto rounded-xl ring ring-kumo-line', className)} {...rest}>
  <table class="w-full caption-bottom text-sm text-kumo-default">{@render children?.()}</table>
</div>
