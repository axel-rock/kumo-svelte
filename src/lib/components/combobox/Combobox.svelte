<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Check, ChevronsUpDown, X } from '@lucide/svelte';
  import { Combobox as ComboboxPrimitive } from 'bits-ui';
  import Field from '$lib/components/field/Field.svelte';
  import Loader from '$lib/components/loader/Loader.svelte';
  import { cn } from '$lib/utils/cn';

  type Size = 'xs' | 'sm' | 'base' | 'lg';
  type Value = string | string[];
  type FieldError = string | { message?: string };

  interface Option {
    label: string;
    value: string;
    disabled?: boolean;
  }

  type ItemDescriptor = string | { label: string; disabled?: boolean };
  type Items = Record<string, ItemDescriptor> | Option[];

  interface Props {
    class?: string;
    options?: Option[];
    items?: Items;
    value?: Value;
    defaultValue?: Value;
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    multiple?: boolean;
    size?: Size;
    label?: string;
    hideLabel?: boolean;
    labelTooltip?: string;
    description?: string;
    error?: FieldError;
    name?: string;
    required?: boolean;
    open?: boolean;
    id?: string;
    children?: Snippet;
    renderValue?: (value: Value) => unknown;
    onValueChange?: (value: Value) => void;
    onOpenChange?: (open: boolean) => void;
    [key: string]: unknown;
  }

  let {
    class: className,
    options = [],
    items,
    defaultValue,
    value = $bindable(defaultValue ?? ''),
    placeholder = 'Search...',
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
    open = $bindable(false),
    id,
    children,
    renderValue,
    onValueChange,
    onOpenChange,
    ...rest
  }: Props = $props();

  const sizes: Record<Size, string> = {
    xs: 'min-h-5 rounded-sm px-1.5 py-0.5 text-xs',
    sm: 'min-h-6.5 rounded-md px-2 py-1 text-xs',
    base: 'min-h-9 rounded-lg px-3 py-1.5 text-base',
    lg: 'min-h-10 rounded-lg px-4 py-2 text-base'
  };

  const inputSizes: Record<Size, string> = {
    xs: 'h-4 text-xs',
    sm: 'h-4.5 text-xs',
    base: 'h-6 text-base',
    lg: 'h-6 text-base'
  };

  const iconSizes: Record<Size, string> = {
    xs: 'size-3',
    sm: 'size-3.5',
    base: 'size-4',
    lg: 'size-[18px]'
  };

  let query = $state('');

  const generatedId = $props.id();
  const inputId = $derived(id ?? `${generatedId}-input`);
  const normalizedOptions = $derived.by<Option[]>(() => {
    if (items) {
      if (Array.isArray(items)) return items;

      return Object.entries(items)
        .filter(([, item]) => item !== null && item !== undefined)
        .map(([value, item]) => {
          if (typeof item === 'object') {
            return { value, label: item.label, disabled: item.disabled };
          }

          return { value, label: item };
        });
    }

    return options;
  });
  const comboboxItems = $derived(normalizedOptions.map(({ value, label, disabled }) => ({ value, label, disabled })));
  const errorMessage = $derived(typeof error === 'string' ? error : error?.message);
  const isDisabled = $derived(disabled || loading);
  const selectedOptions = $derived.by(() => {
    const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
    return selectedValues.map((selectedValue) => normalizedOptions.find((option) => option.value === selectedValue) ?? { value: selectedValue, label: selectedValue });
  });
  const selectedLabels = $derived(selectedOptions.map((option) => option.label).join(', '));
  const displayText = $derived.by(() => {
    if (renderValue) return String(renderValue(value) ?? '');
    return selectedLabels;
  });
  const filteredOptions = $derived.by(() => {
    const term = query.trim().toLowerCase();
    if (!term) return normalizedOptions;
    return normalizedOptions.filter((option) => option.label.toLowerCase().includes(term) || option.value.toLowerCase().includes(term));
  });
  const inputValue = $derived(multiple || open ? query : selectedLabels);
  const rootValue = $derived(multiple ? (Array.isArray(value) ? value : []) : Array.isArray(value) ? (value[0] ?? '') : value);

  function handleValueChange(nextValue: string | string[]) {
    value = nextValue;
    query = '';
    onValueChange?.(nextValue);
  }

  function handleOpenChange(nextOpen: boolean) {
    open = nextOpen;
    if (!nextOpen) query = '';
    onOpenChange?.(nextOpen);
  }

  function handleInput(event: Event) {
    query = (event.currentTarget as HTMLInputElement).value;
  }

  function removeValue(selectedValue: string) {
    if (!Array.isArray(value)) return;
    handleValueChange(value.filter((item) => item !== selectedValue));
  }
</script>

{#snippet defaultContent()}
  <ComboboxPrimitive.Input
    id={inputId}
    placeholder={selectedOptions.length ? undefined : placeholder}
    disabled={isDisabled}
    aria-invalid={Boolean(errorMessage) || undefined}
    aria-label={(rest['aria-label'] as string | undefined) ?? (label ? undefined : placeholder)}
    defaultValue={displayText}
    oninput={handleInput}
    class={cn(
      'min-w-0 flex-1 border-0 bg-transparent p-0 text-kumo-default outline-none placeholder:text-kumo-placeholder disabled:cursor-not-allowed',
      inputSizes[size],
      multiple && selectedOptions.length ? 'basis-24' : 'w-full'
    )}
  />

  {#if loading}
    <Loader size="sm" class="w-10 shrink-0" />
  {:else}
    <ChevronsUpDown class={cn('shrink-0 text-kumo-subtle', iconSizes[size])} aria-hidden="true" />
  {/if}

  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Content
      class="z-50 flex max-h-[min(var(--bits-select-content-available-height),24rem)] min-w-[calc(var(--bits-select-anchor-width)+3px)] flex-col overflow-hidden rounded-lg bg-kumo-base py-1.5 text-base text-kumo-default shadow-lg ring ring-kumo-line outline-none"
      sideOffset={4}
    >
      <ComboboxPrimitive.Viewport class="min-h-0 flex-1 overflow-y-auto overscroll-none scroll-pb-2 scroll-pt-2">
        {#if filteredOptions.length}
          {#each filteredOptions as option (option.value)}
            <ComboboxPrimitive.Item
              value={option.value}
              label={option.label}
              disabled={option.disabled}
              class={cn(
                'group mx-1.5 flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1.5 text-base outline-none',
                'focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:ring-inset',
                'data-[highlighted]:bg-kumo-tint',
                'data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
              )}
            >
              {#snippet children({ selected })}
                <span class="min-w-0 truncate">{option.label}</span>
                {#if selected}
                  <Check class="size-4 shrink-0 text-kumo-default" aria-hidden="true" />
                {/if}
              {/snippet}
            </ComboboxPrimitive.Item>
          {/each}
        {:else}
          <div class="px-3 py-2 text-base text-kumo-subtle">No results found</div>
        {/if}
      </ComboboxPrimitive.Viewport>
    </ComboboxPrimitive.Content>
  </ComboboxPrimitive.Portal>
{/snippet}

{#snippet comboboxContent()}
  {#if children}
    {@render children()}
  {:else}
    <div
      class={cn(
        'inline-flex w-full items-center gap-2 bg-kumo-base text-left font-normal text-kumo-default shadow-xs outline-none ring ring-kumo-line transition focus-within:ring-2 focus-within:ring-kumo-focus/50',
        isDisabled && 'cursor-not-allowed opacity-50',
        errorMessage && '!ring-kumo-danger focus-within:ring-kumo-danger/50',
        sizes[size],
        className
      )}
    >
      {#if multiple && selectedOptions.length}
        <span class="flex min-w-0 flex-wrap gap-1">
          {#each selectedOptions as option (option.value)}
            <span class="inline-flex max-w-32 items-center gap-1 rounded bg-kumo-tint px-1.5 py-0.5 text-xs text-kumo-default">
              <span class="truncate">{option.label}</span>
              <button
                type="button"
                class="rounded-sm text-kumo-subtle hover:text-kumo-default focus:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand"
                aria-label={`Remove ${option.label}`}
                onclick={() => removeValue(option.value)}
                disabled={isDisabled}
              >
                <X class="size-3" aria-hidden="true" />
              </button>
            </span>
          {/each}
        </span>
      {/if}

      {@render defaultContent()}
    </div>
  {/if}
{/snippet}

<Field
  class={cn(!label || hideLabel ? 'contents' : undefined)}
  label={!hideLabel ? label : undefined}
  {description}
  error={errorMessage}
  {required}
>
  {#if label && hideLabel}
    <label class="sr-only" for={inputId}>{label}</label>
  {/if}

  {#if labelTooltip && !hideLabel}
    <span class="sr-only">{labelTooltip}</span>
  {/if}

  {#if multiple}
    <ComboboxPrimitive.Root
      type="multiple"
      value={Array.isArray(rootValue) ? rootValue : []}
      inputValue={inputValue}
      items={comboboxItems}
      disabled={isDisabled}
      {name}
      {required}
      {open}
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
      {...rest}
    >
      {@render comboboxContent()}
    </ComboboxPrimitive.Root>
  {:else}
    <ComboboxPrimitive.Root
      type="single"
      value={Array.isArray(rootValue) ? (rootValue[0] ?? '') : rootValue}
      inputValue={inputValue}
      items={comboboxItems}
      disabled={isDisabled}
      {name}
      {required}
      {open}
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
      {...rest}
    >
      {@render comboboxContent()}
    </ComboboxPrimitive.Root>
  {/if}
</Field>
