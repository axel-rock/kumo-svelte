<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    value: unknown;
    keywords?: string[];
    disabled?: boolean;
    forceMount?: boolean;
    onSelect?: () => void;
    onclick?: (event: MouseEvent) => void;
    [key: string]: unknown;
  }

  let { children, class: className, value, keywords, disabled, forceMount, onSelect, onclick, ...rest }: Props = $props();
</script>

<CommandPrimitive.Item
  value={String(value)}
  {keywords}
  {disabled}
  {forceMount}
  {onSelect}
  {onclick}
  class={cn(
    'group flex w-full items-center gap-3 px-2 py-1.5 text-left text-base transition-colors',
    'cursor-pointer data-[highlighted]:bg-kumo-overlay data-[selected]:bg-kumo-overlay',
    'rounded-lg',
    disabled && 'cursor-default opacity-50',
    className
  )}
  {...rest}
>
  {@render children?.()}
</CommandPrimitive.Item>
