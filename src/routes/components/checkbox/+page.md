---
title: "Checkbox"
description: "A control that allows the user to toggle between checked and not checked. Features built-in label support with automatic horizontal layout."
sourceFile: "components/checkbox"
baseUIComponent: "checkbox"
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

<ComponentExample demo="CheckboxBasicDemo" />

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

<!-- Usage -->

<ComponentSection>

## Usage

```tsx

export default function Example() {
  return <Checkbox label="Accept terms" />;
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Default

  Checkbox with built-in label. The label automatically displays in a horizontal
  layout (checkbox before label).

<ComponentExample demo="CheckboxDefaultDemo" />

### Checked

<ComponentExample demo="CheckboxCheckedDemo" />

### Indeterminate

Used for "select all" patterns when some but not all items are selected.

<ComponentExample demo="CheckboxIndeterminateDemo" />

### Label First Layout

Use `controlFirst=&#123;false&#125;` to place the label before the checkbox.

<ComponentExample demo="CheckboxLabelFirstDemo" />

### Disabled

<ComponentExample demo="CheckboxDisabledDemo" />

### Error

  Error variant provides visual styling (red ring). For error messages, use
  Checkbox.Group.

<ComponentExample demo="CheckboxErrorDemo" />

### Checkbox Group

  Group multiple checkboxes with a legend, description, and shared error
  messages. Uses Checkbox.Group and Checkbox.Item.

<ComponentExample demo="CheckboxGroupDemo" />

### Checkbox Group with Error

  Show validation errors at the group level. Error replaces description when
  present.

<ComponentExample demo="CheckboxGroupErrorDemo" />

### Visually Hidden Legend

  Use `Checkbox.Legend` with `className="sr-only"` to keep the legend accessible
  to screen readers while hiding it visually. This is useful when the group is
  already labeled by a parent `Field` or heading, and showing the legend would
  create a redundant label.

<ComponentExample demo="CheckboxLegendSrOnlyDemo" />

### Custom Legend Styling

  `Checkbox.Legend` accepts `className` for full control over legend
  presentation. Use it instead of the `legend` string prop when you need custom
  typography, colors, or layout.

<ComponentExample demo="CheckboxLegendCustomDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Checkbox

Single checkbox component with built-in label and horizontal layout.

<PropsTable component="Checkbox"  />

### Checkbox.Group

  Wrapper for multiple checkboxes with legend, description, and error support.

<PropsTable component="Checkbox.Group"  />

### Checkbox.Legend

  Composable legend sub-component for Checkbox.Group. Accepts `className` for
  full styling control (e.g. `className="sr-only"` to visually hide). Use
  instead of the `legend` string prop when you need custom legend styling.

<PropsTable component="Checkbox.Legend"  />

### Checkbox.Item

  Individual checkbox within Checkbox.Group.

<PropsTable component="Checkbox.Item"  />

</ComponentSection>

<!-- Accessibility -->

<ComponentSection>

## Accessibility

  
    

      ### Label Requirement

      
        Single checkboxes require a `label` prop or `aria-label` for accessibility.
        Missing labels trigger console warnings in development.
      
    
    

      ### Keyboard Navigation

      
        <kbd class="rounded bg-kumo-control px-1.5 py-0.5">Space</kbd> toggles
        the checkbox.
        <kbd class="rounded bg-kumo-control px-1.5 py-0.5">Tab</kbd> moves focus
        between checkboxes.
      
    
    

      ### Screen Readers

      
        Checkbox.Group uses semantic `&lt;fieldset&gt;` and `&lt;legend&gt;` elements for
        proper grouping announcement.

</ComponentSection>
