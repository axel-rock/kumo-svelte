<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { Button } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';
  import { getInputGroupAddonContext, getInputGroupContext, INPUT_GROUP_SIZE, type InputGroupSize } from './context';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline';
  type Shape = 'base' | 'square' | 'circle';

  const compactButtonSize: Record<InputGroupSize, InputGroupSize> = {
    xs: 'xs',
    sm: 'xs',
    base: 'sm',
    lg: 'base'
  };

  interface Props {
    children?: Snippet;
    class?: string;
    icon?: Component;
    variant?: Variant;
    size?: InputGroupSize;
    shape?: Shape;
    disabled?: boolean;
    tooltip?: string;
    tooltipSide?: string;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    icon: IconComponent,
    variant = 'ghost',
    size,
    shape,
    disabled,
    tooltip,
    tooltipSide,
    ...rest
  }: Props = $props();

  const context = getInputGroupContext();
  const insideAddon = getInputGroupAddonContext();
  const groupSize = $derived(context?.size ?? 'base');
  const isIndividual = $derived(!insideAddon && variant !== 'ghost');
  const effectiveSize = $derived(size ?? (isIndividual ? groupSize : compactButtonSize[groupSize]));
  const iconClass = $derived(INPUT_GROUP_SIZE[groupSize].iconSize);
</script>

<Button
  type="button"
  disabled={disabled ?? context?.disabled}
  variant={variant}
  size={effectiveSize}
  shape={shape}
  title={tooltip}
  class={cn(
    'pointer-events-auto',
    isIndividual && [
      'relative h-full! rounded-none border border-kumo-line ring-0',
      'first:rounded-l-[inherit] last:rounded-r-[inherit] not-first:border-l-0',
      'hover:z-[1] focus:z-[2] focus:border-kumo-line focus:-outline-offset-1 focus:outline',
      'focus-visible:ring-2 focus-visible:ring-kumo-focus',
      'disabled:bg-kumo-overlay disabled:text-kumo-inactive!'
    ],
    className
  )}
  {...rest}
>
  {#if IconComponent}
    <IconComponent class={iconClass} />
  {/if}
  {@render children?.()}
</Button>
