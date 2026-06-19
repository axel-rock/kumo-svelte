<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import Field from '$lib/components/field/Field.svelte';
  import { cn } from '$lib/utils/cn';
  import {
    normalizeAutocompleteItem,
    setAutocompleteContext,
    type AutocompleteItem,
    type AutocompleteSize,
    type AutocompleteValue,
    type NormalizedAutocompleteItem
  } from './context';
  import { createKumoFilter } from '../filter';

  type FieldError = string | { message?: string; match?: boolean };

  export interface Props {
    children?: Snippet;
    class?: string;
    items?: AutocompleteItem[];
    value?: AutocompleteValue;
    defaultValue?: AutocompleteValue;
    open?: boolean;
    size?: AutocompleteSize;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string | Snippet;
    error?: FieldError;
    required?: boolean;
    filter?: ((item: AutocompleteItem, query: string) => boolean) | null;
    onValueChange?: (value: AutocompleteValue) => void;
    onOpenChange?: (open: boolean) => void;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    items = [],
    defaultValue,
    value = $bindable(defaultValue ?? ''),
    open = $bindable(false),
    size = 'base',
    label,
    labelTooltip,
    description,
    error,
    required,
    filter,
    onValueChange,
    onOpenChange,
    ...rest
  }: Props = $props();

  let query = $state(Array.isArray(value) ? value.join(', ') : String(value ?? ''));
  let hasTypedSinceFocus = $state(false);
  let highlightedIndex = $state(-1);
  let rootElement: HTMLDivElement;
  const { contains } = createKumoFilter();

  const normalizedItems = $derived(items.map(normalizeAutocompleteItem));
  const errorMessage = $derived(
    typeof error === 'string' ? error : error?.match === false ? undefined : error?.message
  );
  const filteredItems = $derived.by<NormalizedAutocompleteItem[]>(() => {
    const term = query.trim().toLowerCase();
    if (!term) return normalizedItems;
    if (filter === null) return normalizedItems;

    return normalizedItems.filter((item) => {
      if (filter) return filter(item.raw, query);
      return contains(item.label, term) || contains(String(item.value), term);
    });
  });

  function valuesEqual(itemValue: string | number, selectedValue: AutocompleteValue) {
    if (Array.isArray(selectedValue)) return selectedValue.some((selected) => itemValue === selected);
    return itemValue === selectedValue;
  }

  function isSelected(item: NormalizedAutocompleteItem) {
    return valuesEqual(item.value, value);
  }

  function select(item: NormalizedAutocompleteItem) {
    if (item.disabled) return;
    value = item.value;
    query = item.label;
    open = false;
    highlightedIndex = -1;
    onValueChange?.(item.value);
    onOpenChange?.(false);
  }

  const selectableItems = $derived(filteredItems.filter((item) => !item.disabled));

  function isHighlighted(item: NormalizedAutocompleteItem) {
    const index = selectableItems.findIndex((candidate) => candidate.value === item.value);
    return index >= 0 && index === highlightedIndex;
  }

  function handleListKeydown(event: KeyboardEvent) {
    if (!hasTypedSinceFocus && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      return;
    }

    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      open = true;
      onOpenChange?.(true);
      highlightedIndex = event.key === 'ArrowUp' ? Math.max(selectableItems.length - 1, 0) : 0;
      return;
    }

    if (!open || selectableItems.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      highlightedIndex = highlightedIndex < selectableItems.length - 1 ? highlightedIndex + 1 : 0;
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      highlightedIndex = highlightedIndex > 0 ? highlightedIndex - 1 : selectableItems.length - 1;
      return;
    }

    if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault();
      const item = selectableItems[highlightedIndex];
      if (item) select(item);
    }
  }

  onMount(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootElement?.contains(event.target as Node)) {
        hasTypedSinceFocus = false;
        open = false;
        onOpenChange?.(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  });

  setAutocompleteContext({
    get items() {
      return normalizedItems;
    },
    get filteredItems() {
      return filteredItems;
    },
    get query() {
      return query;
    },
    set query(nextQuery: string) {
      query = nextQuery;
      value = nextQuery;
      onValueChange?.(nextQuery);
    },
    get value() {
      return value;
    },
    set value(nextValue: AutocompleteValue) {
      value = nextValue;
      onValueChange?.(nextValue);
    },
    get open() {
      return open;
    },
    set open(nextOpen: boolean) {
      open = nextOpen;
      onOpenChange?.(nextOpen);
    },
    get hasTypedSinceFocus() {
      return hasTypedSinceFocus;
    },
    get size() {
      return size;
    },
    get invalid() {
      return Boolean(errorMessage);
    },
    markInputTyped() {
      hasTypedSinceFocus = true;
    },
    resetInputInteraction() {
      hasTypedSinceFocus = false;
      open = false;
      onOpenChange?.(false);
    },
    isSelected,
    isHighlighted,
    select,
    handleListKeydown
  });
</script>

{#snippet control()}
  <div bind:this={rootElement} class={cn('relative w-full', className)} onkeydown={handleListKeydown} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#if label || description || errorMessage}
  <Field {label} {labelTooltip} {description} error={errorMessage} {required}>
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
