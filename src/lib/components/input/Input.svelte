<script lang="ts">
  import { cn } from '$lib/utils/cn';
  type Size = 'xs' | 'sm' | 'base' | 'lg';
  const sizes: Record<Size, string> = {
    xs: 'h-5 rounded-sm px-1.5 text-xs',
    sm: 'h-6.5 rounded-md px-2 text-xs',
    base: 'h-9 rounded-lg px-3 text-base',
    lg: 'h-10 rounded-lg px-4 text-base'
  };
  interface Props { class?: string; size?: Size; invalid?: boolean; [key: string]: unknown; }
  let { class: className, size = 'base', invalid = false, ...rest }: Props = $props();
</script>

<input class={cn('w-full bg-kumo-base text-kumo-default shadow-xs outline-none ring ring-kumo-line placeholder:text-kumo-muted transition focus:ring-2 focus:ring-kumo-brand/40 disabled:cursor-not-allowed disabled:opacity-50', sizes[size], invalid && 'ring-kumo-danger focus:ring-kumo-danger/40', className)} aria-invalid={invalid || undefined} {...rest} />
