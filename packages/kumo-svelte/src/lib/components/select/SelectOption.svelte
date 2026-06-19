<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Check } from 'phosphor-svelte';
  import { Select as SelectPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/cn';
  import { KUMO_SELECT_OPTION_CLASSES } from './select-variants';

  interface Props {
    children?: Snippet;
    class?: string;
    value: string;
    label?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let {
    children: optionChildren,
    class: className,
    value,
    label = value,
    disabled = false,
    ...rest
  }: Props = $props();
</script>

<SelectPrimitive.Item
  {value}
  {label}
  {disabled}
  data-kumo-component="Select"
  data-kumo-part="option"
  class={cn(KUMO_SELECT_OPTION_CLASSES, className)}
  {...rest}
>
  {#snippet children({ selected })}
    {#if optionChildren}
      {@render optionChildren()}
    {:else}
      <span class="min-w-0 truncate">{label}</span>
    {/if}
    {#if selected}
      <Check class="size-5 shrink-0 fill-current" aria-hidden="true" />
    {/if}
  {/snippet}
</SelectPrimitive.Item>
