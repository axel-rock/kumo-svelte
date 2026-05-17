import type { Snippet } from 'svelte';
import { getContext, setContext } from 'svelte';

export type AutocompleteSize = 'xs' | 'sm' | 'base' | 'lg';

export type AutocompleteItem = string | {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
};

export type NormalizedAutocompleteItem = {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
  raw: AutocompleteItem;
};

export type AutocompleteContext = {
  get items(): NormalizedAutocompleteItem[];
  get filteredItems(): NormalizedAutocompleteItem[];
  get query(): string;
  set query(value: string);
  get value(): string;
  set value(value: string);
  get open(): boolean;
  set open(value: boolean);
  get size(): AutocompleteSize;
  get invalid(): boolean;
  select(item: NormalizedAutocompleteItem): void;
};

export type AutocompleteGroupContext = {
  get items(): NormalizedAutocompleteItem[];
};

const AUTOCOMPLETE_CONTEXT = Symbol('kumo-autocomplete');
const AUTOCOMPLETE_GROUP_CONTEXT = Symbol('kumo-autocomplete-group');

export function setAutocompleteContext(context: AutocompleteContext) {
  setContext(AUTOCOMPLETE_CONTEXT, context);
}

export function getAutocompleteContext(component: string) {
  const context = getContext<AutocompleteContext | undefined>(AUTOCOMPLETE_CONTEXT);
  if (!context) throw new Error(`${component} must be used inside <Autocomplete>.`);
  return context;
}

export function setAutocompleteGroupContext(context: AutocompleteGroupContext) {
  setContext(AUTOCOMPLETE_GROUP_CONTEXT, context);
}

export function getAutocompleteGroupContext() {
  return getContext<AutocompleteGroupContext | undefined>(AUTOCOMPLETE_GROUP_CONTEXT);
}

export function normalizeAutocompleteItem(item: AutocompleteItem): NormalizedAutocompleteItem {
  if (typeof item === 'string') {
    return { label: item, value: item, raw: item };
  }

  return {
    label: item.label,
    value: item.value,
    disabled: item.disabled,
    group: item.group,
    raw: item
  };
}

export type ItemSnippet = Snippet<[any]>;
