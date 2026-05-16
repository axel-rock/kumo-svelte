<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  type Variant = 'default' | 'muted' | 'strong' | 'danger' | 'success' | 'warning' | 'link';
  type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  const variants: Record<Variant, string> = { default: 'text-kumo-default', muted: 'text-kumo-muted', strong: 'text-kumo-strong', danger: 'text-kumo-danger', success: 'text-kumo-success', warning: 'text-kumo-warning', link: 'text-kumo-link' };
  const sizes: Record<Size, string> = { xs: 'text-xs', sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl' };
  interface Props { children?: Snippet; class?: string; as?: string; variant?: Variant; size?: Size; [key: string]: unknown; }
  let { children, class: className, as = 'p', variant = 'default', size = 'base', ...rest }: Props = $props();
</script>

<svelte:element this={as} class={cn(sizes[size], variants[variant], className)} {...rest}>{@render children?.()}</svelte:element>
