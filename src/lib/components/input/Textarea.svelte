<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; invalid?: boolean; [key: string]: unknown; }
  let { class: className, invalid = false, ...rest }: Props = $props();
</script>

<textarea class={cn('min-h-24 w-full rounded-lg bg-kumo-base px-3 py-2 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line placeholder:text-kumo-muted transition focus:ring-2 focus:ring-kumo-brand/40 disabled:cursor-not-allowed disabled:opacity-50', invalid && 'ring-kumo-danger focus:ring-kumo-danger/40', className)} aria-invalid={invalid || undefined} {...rest}></textarea>
