<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
  import { CaretDown } from 'phosphor-svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, disabled = false, ...rest }: Props = $props();
</script>

<CollapsiblePrimitive.Trigger
  data-kumo-component="Collapsible"
  data-kumo-part="default-trigger"
  class={cn(
    'bg-transparent border-none shadow-none p-0 m-0',
    'flex cursor-pointer items-center gap-1 text-sm text-kumo-link select-none',
    className
  )}
  {disabled}
  {...rest}
>
  {@render children?.()}
  <CaretDown class="h-4 w-4 transition-transform [[data-panel-open]_&]:rotate-180" />
</CollapsiblePrimitive.Trigger>
