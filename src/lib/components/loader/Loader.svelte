<script lang="ts">
  import { cn } from '$lib/utils/cn';
  type Size = 'xs' | 'sm' | 'base' | 'lg';
  const sizes = { xs: 'size-3', sm: 'size-4', base: 'size-5', lg: 'size-8' };
  interface Props { class?: string; size?: Size; label?: string; [key: string]: unknown; }
  let { class: className, size = 'base', label = 'Loading', ...rest }: Props = $props();
</script>

<span class={cn('inline-flex items-center gap-2 text-kumo-muted', className)} role="status" {...rest}>
  <span class={cn('animate-spin rounded-full border-2 border-current border-r-transparent', sizes[size])} aria-hidden="true"></span>
  <span class="sr-only">{label}</span>
</span>
