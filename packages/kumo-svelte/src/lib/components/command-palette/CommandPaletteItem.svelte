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
    'flex min-h-8 cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-kumo-default outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[selected]:bg-kumo-tint',
    className
  )}
  {...rest}
>
  {@render children?.()}
</CommandPrimitive.Item>
