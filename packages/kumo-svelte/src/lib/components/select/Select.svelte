<script lang="ts">
  import type { Snippet } from 'svelte';
  import { CaretUpDown } from 'phosphor-svelte';
  import { Select as SelectPrimitive } from 'bits-ui';
  import Field from '$lib/components/field/Field.svelte';
  import Label from '$lib/components/label/Label.svelte';
  import { SkeletonLine } from '$lib/components/loader';
  import { cn } from '$lib/utils/cn';
  import SelectOption from './SelectOption.svelte';
  import {
    KUMO_SELECT_CONTENT_CLASSES,
    KUMO_SELECT_LABEL_CLASSES,
    KUMO_SELECT_VIEWPORT_CLASSES,
    selectVariants,
    triggerIconStyles,
    type KumoSelectSize
  } from './select-variants';

  type SelectValue = unknown;
  type Value = SelectValue | SelectValue[];

  interface Option {
    label: string;
    value: SelectValue;
    disabled?: boolean;
  }

  type ItemDescriptor = string | { label: string; disabled?: boolean };
  type Items = Record<string, ItemDescriptor> | Option[];

  interface Props {
    class?: string;
    contentClass?: string;
    viewportClass?: string;
    options?: Option[];
    items?: Items;
    value?: Value;
    defaultValue?: Value;
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    multiple?: boolean;
    size?: KumoSelectSize;
    label?: string;
    hideLabel?: boolean;
    labelTooltip?: string;
    description?: string;
    error?: string | { message?: string };
    name?: string;
    required?: boolean;
    children?: Snippet;
    renderValue?: (value: Value) => unknown;
    onValueChange?: (value: Value) => void;
    container?: HTMLElement | string;
    [key: string]: unknown;
  }

  let {
    class: className,
    contentClass,
    viewportClass,
    options = [],
    items,
    defaultValue,
    value = $bindable(defaultValue ?? ''),
    placeholder = 'Select...',
    disabled = false,
    loading = false,
    multiple = false,
    size = 'base',
    label,
    hideLabel = false,
    labelTooltip,
    description,
    error,
    name,
    required = false,
    children,
    renderValue,
    onValueChange,
    container,
    ...rest
  }: Props = $props();

  const labelId = `kumo-select-label-${Math.random().toString(36).slice(2)}`;

  const normalizedOptions = $derived.by<Option[]>(() => {
    if (items) {
      if (Array.isArray(items)) return items;

      return Object.entries(items)
        .filter(([, item]) => item !== null && item !== undefined)
        .map(([optionValue, item]) => {
          if (typeof item === 'object') {
            return { value: optionValue, label: item.label, disabled: item.disabled };
          }

          return { value: optionValue, label: item };
        });
    }

    return options;
  });

  const serializedOptions = $derived(
    normalizedOptions.map((option, index) => ({
      ...option,
      serializedValue: serializeOptionValue(index)
    }))
  );
  const selectItems = $derived(
    serializedOptions.map(({ serializedValue, label: optionLabel, disabled: optionDisabled }) => ({
      value: serializedValue,
      label: optionLabel,
      disabled: optionDisabled
    }))
  );
  const errorMessage = $derived(typeof error === 'string' ? error : error?.message);
  const isDisabled = $derived(disabled || loading);
  const primitiveValue = $derived(toPrimitiveValue(value, multiple));
  const useFieldWrapper = $derived(Boolean(label && !hideLabel));
  const showOptional = $derived(required === false);
  const fallbackLabel = $derived(typeof label === 'string' ? label : placeholder);
  const triggerLabelledBy = $derived(
    useFieldWrapper ? undefined : ((rest['aria-labelledby'] as string | undefined) ?? (label ? labelId : undefined))
  );
  const triggerAriaLabel = $derived(
    (rest['aria-label'] as string | undefined) ?? (!triggerLabelledBy ? fallbackLabel : undefined)
  );

  const selectedLabels = $derived.by(() => {
    if (Array.isArray(value)) {
      return value
        .map(
          (selectedValue) =>
            normalizedOptions.find((option) => Object.is(option.value, selectedValue))?.label ??
            stringifyValue(selectedValue)
        )
        .join(', ');
    }

    return (
      normalizedOptions.find((option) => Object.is(option.value, value))?.label ?? stringifyValue(value)
    );
  });

  function displayValue(selectionValue: Value) {
    if (!selectionValue || (Array.isArray(selectionValue) && selectionValue.length === 0)) {
      return placeholder;
    }
    if (renderValue) return renderValue(selectionValue);
    return selectedLabels || placeholder;
  }

  function serializeOptionValue(index: number) {
    return `kumo-select:${index}`;
  }

  function stringifyValue(selectionValue: SelectValue) {
    if (selectionValue === null || selectionValue === undefined) return '';
    return typeof selectionValue === 'string' ? selectionValue : String(selectionValue);
  }

  function toPrimitiveValue(selectionValue: Value, isMultiple: boolean) {
    if (isMultiple) {
      const values = Array.isArray(selectionValue) ? selectionValue : [];
      return values.map((entry) => serializeSelectedValue(entry)).filter((entry) => entry !== undefined);
    }

    if (Array.isArray(selectionValue)) return serializeSelectedValue(selectionValue[0]) ?? '';
    return serializeSelectedValue(selectionValue) ?? '';
  }

  function serializeSelectedValue(selectionValue: SelectValue) {
    const option = serializedOptions.find((entry) => Object.is(entry.value, selectionValue));
    if (option) return option.serializedValue;
    return typeof selectionValue === 'string' ? selectionValue : undefined;
  }

  function deserializePrimitiveValue(primitive: string) {
    const option = serializedOptions.find((entry) => entry.serializedValue === primitive);
    return option ? option.value : primitive;
  }

  function setValue(nextValue: Value) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function handleSingleValueChange(nextValue: string) {
    setValue(deserializePrimitiveValue(nextValue));
  }

  function handleMultipleValueChange(nextValue: string[]) {
    setValue(nextValue.map((entry) => deserializePrimitiveValue(entry)));
  }

  function resolveDisplayedValue(selectionValue: Value | undefined) {
    if (selectionValue === undefined || selectionValue === null || selectionValue === '') {
      return placeholder;
    }
    return displayValue(selectionValue);
  }
</script>

{#snippet selectLabel()}
  {#if label && useFieldWrapper}
    <span class={KUMO_SELECT_LABEL_CLASSES} data-kumo-component="Select" data-kumo-part="label">
      <Label showOptional={showOptional} tooltip={labelTooltip} asContent>
        {label}
      </Label>
    </span>
  {/if}
{/snippet}

{#snippet selectControl()}
  {#if multiple}
    <SelectPrimitive.Root
      type="multiple"
      value={Array.isArray(primitiveValue) ? primitiveValue : []}
      onValueChange={handleMultipleValueChange}
      items={selectItems}
      disabled={isDisabled}
      {name}
      {required}
      {...rest}
    >
      {@render selectLabel()}
      {@render selectTriggerAndContent()}
    </SelectPrimitive.Root>
  {:else}
    <SelectPrimitive.Root
      type="single"
      value={Array.isArray(primitiveValue) ? (primitiveValue[0] ?? '') : primitiveValue}
      onValueChange={handleSingleValueChange}
      items={selectItems}
      disabled={isDisabled}
      {name}
      {required}
      {...rest}
    >
      {@render selectLabel()}
      {@render selectTriggerAndContent()}
    </SelectPrimitive.Root>
  {/if}
{/snippet}

{#snippet selectTriggerAndContent()}
  <SelectPrimitive.Trigger
    class={cn(
      selectVariants({ size }),
      disabled && 'cursor-not-allowed opacity-50',
      errorMessage && '!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]',
      className
    )}
    aria-label={triggerAriaLabel}
    aria-labelledby={triggerLabelledBy}
    data-kumo-component="Select"
    data-kumo-part="trigger"
  >
    {#if loading}
      <SkeletonLine class="w-32" />
    {:else}
      <SelectPrimitive.Value
        class="min-w-0 truncate data-[placeholder]:text-kumo-placeholder"
        {placeholder}
      >
        {#snippet children({ selection, placeholder: placeholderText })}
          <span class={cn(!selectedLabels && 'text-kumo-placeholder')}>
            {#if selection.type === 'multiple'}
              {resolveDisplayedValue(
                selection.selected.map((item) => deserializePrimitiveValue(item.value))
              )}
            {:else if selection.selected}
              {resolveDisplayedValue(deserializePrimitiveValue(selection.selected.value))}
            {:else}
              {placeholderText}
            {/if}
          </span>
        {/snippet}
      </SelectPrimitive.Value>
    {/if}
    <span class={cn('flex shrink-0 items-center', triggerIconStyles[size].className)}>
      <CaretUpDown size={triggerIconStyles[size].iconSize} class="fill-current" aria-hidden="true" />
    </span>
  </SelectPrimitive.Trigger>

  <SelectPrimitive.Portal to={container}>
    <SelectPrimitive.Content class={cn(KUMO_SELECT_CONTENT_CLASSES, contentClass)} preventScroll sideOffset={4}>
      <SelectPrimitive.Viewport class={cn(KUMO_SELECT_VIEWPORT_CLASSES, viewportClass)}>
        {#if children}
          {@render children()}
        {:else}
          {#each serializedOptions as option (option.serializedValue)}
            <SelectOption
              value={option.serializedValue}
              label={option.label}
              disabled={option.disabled}
            />
          {/each}
        {/if}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
{/snippet}

{#if useFieldWrapper}
  <Field hideLabel {description} error={errorMessage} {required}>
    {@render selectControl()}
  </Field>
{:else}
  <div class="grid gap-2">
    {#if label && hideLabel}
      <span id={labelId} class="sr-only">{label}</span>
    {/if}
    {@render selectControl()}
    {#if errorMessage}
      <span class="text-sm text-kumo-danger">{errorMessage}</span>
    {:else if description}
      <span class="text-sm leading-snug text-kumo-subtle">{description}</span>
    {/if}
  </div>
{/if}
