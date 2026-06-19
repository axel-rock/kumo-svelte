<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Check } from 'phosphor-svelte';
  import { getComboboxContext, normalizeComboboxItem, type ComboboxItem } from './context';
  import { KUMO_COMBOBOX_ITEM_CLASSES } from './combobox-variants';
  import { cn } from '$lib/utils/cn';

  export interface Props {
    children?: Snippet;
    class?: string;
    value: ComboboxItem;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, value, disabled, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.Item');
  const item = $derived.by(() => {
    const normalized = normalizeComboboxItem(value);
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
  data-highlighted={highlighted || undefined}
  data-kumo-component="Combobox"
  data-kumo-part="item"
  class={cn(KUMO_COMBOBOX_ITEM_CLASSES, className)}
  onclick={() => context.select(item)}
  {...rest}
>
  <div class="col-start-1">{@render children?.()}</div>
  {#if selected}
    <span class="col-start-2 flex items-center">
      <Check aria-hidden="true" />
    </span>
  {/if}
</button>
