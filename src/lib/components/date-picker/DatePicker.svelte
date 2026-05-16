<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; value?: string; [key: string]: unknown; }
  let { class: className, value = $bindable(''), ...rest }: Props = $props();
</script>

<input type="date" bind:value class={cn('h-9 rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line focus:ring-2 focus:ring-kumo-brand/40', className)} {...rest} />
