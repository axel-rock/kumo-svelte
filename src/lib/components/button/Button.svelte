<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export const KUMO_BUTTON_VARIANTS = {
    shape: {
      base: { classes: '' },
      square: { classes: 'items-center justify-center p-0' },
      circle: { classes: 'items-center justify-center p-0 rounded-full' }
    },
    size: {
      xs: { classes: 'h-5 gap-1 rounded-sm px-1.5 text-xs' },
      sm: { classes: 'h-6.5 gap-1 rounded-md px-2 text-xs' },
      base: { classes: 'h-9 gap-1.5 rounded-lg px-3 text-base' },
      lg: { classes: 'h-10 gap-2 rounded-lg px-4 text-base' }
    },
    compactSize: {
      xs: { classes: 'size-3.5' },
      sm: { classes: 'size-6.5' },
      base: { classes: 'size-9' },
      lg: { classes: 'size-10' }
    },
    variant: {
      primary: { classes: 'bg-kumo-brand !text-white hover:bg-kumo-brand-hover disabled:bg-kumo-brand/50' },
      secondary: { classes: 'bg-kumo-base !text-kumo-default ring not-disabled:hover:bg-kumo-tint disabled:bg-kumo-base/50 disabled:!text-kumo-default/70 ring-kumo-hairline data-[state=open]:bg-kumo-base' },
      ghost: { classes: 'text-kumo-default hover:bg-kumo-tint shadow-none bg-inherit' },
      destructive: { classes: 'bg-kumo-danger !text-white hover:bg-kumo-danger/70' },
      'secondary-destructive': { classes: 'bg-kumo-base !text-kumo-danger ring not-disabled:hover:bg-kumo-base disabled:bg-kumo-base/50 disabled:!text-kumo-danger/70 ring-kumo-hairline data-[state=open]:bg-kumo-base' },
      outline: { classes: 'bg-transparent text-kumo-default ring ring-kumo-hairline' }
    }
  } as const;

  type Shape = keyof typeof KUMO_BUTTON_VARIANTS.shape;
  type Size = keyof typeof KUMO_BUTTON_VARIANTS.size;
  type Variant = keyof typeof KUMO_BUTTON_VARIANTS.variant;

  interface Props {
    children?: Snippet;
    class?: string;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
    loading?: boolean;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    href,
    type = 'button',
    disabled = false,
    shape = 'base',
    size = 'base',
    variant = 'secondary',
    loading = false,
    ...rest
  }: Props = $props();

  const base = 'inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap font-medium shadow-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-kumo-brand/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50';
  let classes = $derived(
    cn(
      base,
      KUMO_BUTTON_VARIANTS.variant[variant].classes,
      KUMO_BUTTON_VARIANTS.size[size].classes,
      KUMO_BUTTON_VARIANTS.shape[shape].classes,
      shape !== 'base' && KUMO_BUTTON_VARIANTS.compactSize[size].classes,
      className
    )
  );
</script>

<svelte:element this={href ? 'a' : 'button'} class={classes} href={href} type={href ? undefined : type} disabled={href ? undefined : disabled || loading} aria-busy={loading || undefined} {...rest}>
  {#if loading}
    <span class="size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden="true"></span>
  {/if}
  {@render children?.()}
</svelte:element>
