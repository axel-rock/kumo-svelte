---
title: "Autocomplete"
description: "A free-form text input with an optional filtered suggestion list. Unlike Combobox, the value is not constrained to the items list."
sourceFile: "components/autocomplete"
baseUIComponent: "autocomplete"
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>


<!-- Hero Demo -->

<ComponentSection>

<ComponentExample demo="AutocompleteDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```tsx
// code example
```

### Granular

```tsx
// code example
```

</ComponentSection>

<!-- When to use -->

<ComponentSection>

## When to use

  Use `Autocomplete` when the input value can be free-form text and suggestions
  are optional hints. Use `Combobox` instead when the selected value must come
  from the predefined list.

</ComponentSection>

<!-- Controlled -->

<ComponentSection>

## Controlled

  Pass `value` and `onValueChange` for controlled usage.

<ComponentExample demo="AutocompleteControlledDemo" />

</ComponentSection>

<!-- With Field -->

<ComponentSection>

## With Field

  Add `label`, `description`, and `required` to enable the built-in Field wrapper.

<ComponentExample demo="AutocompleteWithFieldDemo" />

</ComponentSection>

<!-- Error State -->

<ComponentSection>

## Error State

  Display validation errors with the `error` prop.

<ComponentExample demo="AutocompleteErrorDemo" />

</ComponentSection>

<!-- Grouped -->

<ComponentSection>

## Grouped

  Group items into categories using `Autocomplete.Group` and `Autocomplete.GroupLabel`.

<ComponentExample demo="AutocompleteGroupedDemo" />

</ComponentSection>

<!-- Sizes -->

<ComponentSection>

## Sizes

  The `size` prop on `Autocomplete.InputGroup` supports four variants matching the
  Input component: `xs`, `sm`, `base` (default), and `lg`.

<ComponentExample demo="AutocompleteSizesDemo" />

</ComponentSection>

<!-- Custom Filtering -->

<ComponentSection>

## Custom Filtering

  By default, Base UI filters items using a built-in string match. Pass a custom
  `filter` function for advanced logic such as fuzzy matching or object
  properties.

```tsx
// Filter on a property of object items
<Autocomplete
  items={countries}
  filter={(item, query) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  }
>
  ...
</Autocomplete>

// Disable filtering entirely (e.g. async search)
<Autocomplete items={results} filter={null}>
  ...
</Autocomplete>
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Autocomplete

Root component. Wraps all sub-components and manages state.

<PropsTable component="Autocomplete"  />

### Autocomplete.InputGroup

  Self-contained input wrapper that renders the text input, clear button, and
  dropdown trigger together.

<PropsTable component="Autocomplete.InputGroup"  />

### Autocomplete.Content

Dropdown popup container. Wraps Portal, Positioner, and Popup.

<PropsTable component="Autocomplete.Content"  />

### Autocomplete.Item

Individual suggestion item in the list.

<PropsTable component="Autocomplete.Item"  />

### Additional Sub-components

  <ul class="list-disc list-inside space-y-1">
    <li>`Autocomplete.List` — scrollable list container with render prop</li>
    <li>`Autocomplete.Group` — groups items under a heading</li>
    <li>`Autocomplete.GroupLabel` — heading label for a group</li>
    <li>`Autocomplete.Collection` — item container within a group</li>
    <li>`Autocomplete.Separator` — horizontal divider between items</li>
  </ul>

</ComponentSection>
