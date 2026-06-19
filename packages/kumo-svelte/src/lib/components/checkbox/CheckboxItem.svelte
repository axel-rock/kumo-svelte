<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import { Check, Minus } from 'phosphor-svelte';
  import { getContext } from 'svelte';
  import {
    checkboxIndicatorClasses,
    checkboxItemInteractiveClasses,
    checkboxRingClasses,
    checkboxStateClasses,
    type CheckboxVariant
  } from './Checkbox.svelte';
  import { cn } from '$lib/utils/cn';

  interface CheckboxGroupContext {
    readonly controlFirst: boolean;
  }

  interface Props {
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    variant?: CheckboxVariant;
    label: string;
    value?: string;
    name?: string;
    onCheckedChange?: (checked: boolean) => void;
    onIndeterminateChange?: (indeterminate: boolean) => void;
  }

  let {
    class: className,
    checked = $bindable(),
    indeterminate = $bindable(false),
    disabled = false,
    variant = 'default',
    label,
    value,
    name,
    onCheckedChange,
    onIndeterminateChange
  }: Props = $props();

  const group = getContext<CheckboxGroupContext | undefined>('kumo-checkbox-group');
</script>

<label
  data-kumo-component="Checkbox"
  data-kumo-part="item-label"
  class={cn(
    'group m-0 relative inline-flex items-start gap-2',
    !(group?.controlFirst ?? true) && 'flex-row-reverse justify-end',
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    className
  )}
>
  <CheckboxPrimitive.Root
    bind:checked
    bind:indeterminate
    {value}
    {name}
    {disabled}
    data-kumo-component="Checkbox"
    data-kumo-part="item"
    {onCheckedChange}
    {onIndeterminateChange}
    class={cn(
      'peer relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-0 bg-kumo-base ring after:absolute after:-inset-x-3 after:-inset-y-2',
      checkboxStateClasses,
      checkboxRingClasses(variant),
      !disabled && checkboxItemInteractiveClasses
    )}
  >
    <span
      class={checkboxIndicatorClasses}
      data-unchecked={!checked && !indeterminate ? '' : undefined}
    >
      {#if indeterminate}
        <Minus size={12} weight="bold" aria-hidden="true" />
      {:else}
        <Check size={12} weight="bold" aria-hidden="true" />
      {/if}
    </span>
  </CheckboxPrimitive.Root>
  <span class="text-base text-kumo-default">{label}</span>
</label>
