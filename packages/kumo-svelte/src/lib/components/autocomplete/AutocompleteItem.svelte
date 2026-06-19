<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Check } from 'phosphor-svelte';
  import { getAutocompleteContext, normalizeAutocompleteItem, type AutocompleteItem } from './context';
  import {
    KUMO_AUTOCOMPLETE_ITEM_CLASSES,
    KUMO_AUTOCOMPLETE_ITEM_INDICATOR_CLASSES
  } from './autocomplete-variants';
  import { cn } from '$lib/utils/cn';

  export interface Props {
    children?: Snippet;
    class?: string;
    value: AutocompleteItem;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, value, disabled, ...rest }: Props = $props();
  const context = getAutocompleteContext('Autocomplete.Item');
  const item = $derived.by(() => {
    const normalized = normalizeAutocompleteItem(value);
    return { ...normalized, disabled: disabled ?? normalized.disabled };
  });
  const selected = $derived(context.isSelected(item));
  const highlighted = $derived(context.isHighlighted(item));
</script>

<button
  type="button"
  role="option"
  aria-selected={selected}
  data-disabled={item.disabled || undefined}
  data-selected={selected || undefined}
  data-highlighted={highlighted || undefined}
  data-kumo-component="Autocomplete"
  data-kumo-part="item"
  class={cn(KUMO_AUTOCOMPLETE_ITEM_CLASSES, className)}
  onclick={() => context.select(item)}
  {...rest}
>
  <div class="col-start-1">{@render children?.()}</div>
  <span class={KUMO_AUTOCOMPLETE_ITEM_INDICATOR_CLASSES}>
    <Check size={14} />
  </span>
</button>
