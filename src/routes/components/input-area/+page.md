---
title: "InputArea"
description: "A multi-line text input for longer content with built-in label, description, and error support."
sourceFile: "components/input"
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

<ComponentExample demo="InputAreaBasicDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```tsx
```

### Granular

```tsx
```

`Textarea` is also exported as an alias for `InputArea` for discoverability when migrating from other libraries.

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

### With Built-in Field (Recommended)

  Use the `label` prop to enable the built-in Field wrapper with label,
  description, and error support.

```tsx

export default function Example() {
  return (
    <InputArea
      label="Description"
      placeholder="Enter a description..."
description="Provide details about your project"
/>
  );
}
```

### Bare InputArea (Custom Layouts)

  For custom form layouts, use InputArea without `label`. Must provide
  `aria-label` or `aria-labelledby` for accessibility.

```tsx

export default function Example() {
  return <InputArea placeholder="Add notes..." aria-label="Notes" rows={3} />;
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### With Label

<ComponentExample demo="InputAreaWithLabelDemo" />

### Custom Row Count

Use the `rows` prop to control the initial height.

<ComponentExample demo="InputAreaRowsDemo" />

### Error State (String)

Error styling is automatically applied when the `error` prop is truthy.

<ComponentExample demo="InputAreaErrorStringDemo" />

### Error State (Object)

Use an error object with `match` for constraint validation.

<ComponentExample demo="InputAreaErrorObjectDemo" />

### Sizes

Four sizes available: `xs`, `sm`, `base` (default), `lg`.

<ComponentExample demo="InputAreaSizesDemo" />

### Disabled

<ComponentExample demo="InputAreaDisabledDemo" />

### Bare InputArea

  InputArea without `label` renders as a bare textarea. Must provide
  `aria-label` for accessibility.

<ComponentExample demo="InputAreaBareDemo" />

### Optional Field

Set `required=&#123;false&#125;` to show "(optional)" text after the label.

<ComponentExample demo="InputAreaOptionalFieldDemo" />

### Label with Tooltip

Use `labelTooltip` to add an info icon with additional context on hover.

<ComponentExample demo="InputAreaLabelTooltipDemo" />

### React Node Label

The `label` prop accepts ReactNode for rich formatting.

<ComponentExample demo="InputAreaReactNodeLabelDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  InputArea accepts all standard HTML textarea attributes plus the following:

<PropsTable component="InputArea"  />

</ComponentSection>

<!-- Accessibility -->

<ComponentSection>

## Accessibility

### Label Requirement

InputArea requires an accessible name via one of:

<ul class="ml-4 list-disc space-y-1">
  <li>`label` prop (recommended)</li>
  <li>`placeholder` + `aria-label` for bare textareas</li>
  <li>`aria-labelledby` for custom label association</li>
</ul>

<p class="mt-2">
  Missing accessible names trigger console warnings in development.

### Error Association

  Error messages are automatically associated with the textarea via ARIA
  attributes for screen reader announcement.

</ComponentSection>
