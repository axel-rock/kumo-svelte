---
title: "Sensitive Input"
description: "A masked input for sensitive values like API keys and passwords. Click to reveal."
sourceFile: "components/sensitive-input"
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

<ComponentExample demo="SensitiveInputDemo" />

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

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```tsx

export default function Example() {
  return <SensitiveInput label="Secret" defaultValue="my-secret-key" />;
}
```

</ComponentSection>

<!-- Sizes -->

<ComponentSection>

## Sizes

  SensitiveInput supports multiple sizes to fit different contexts.

<ComponentExample demo="SensitiveInputSizesDemo" />

</ComponentSection>

<!-- Controlled -->

<ComponentSection>

## Controlled

  Use controlled mode for full control over the input value.

<ComponentExample demo="SensitiveInputControlledDemo" />

</ComponentSection>

<!-- States -->

<ComponentSection>

## States

  
    Various input states including error, disabled, read-only, and with
    description.

<ComponentExample demo="SensitiveInputStatesDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="SensitiveInput"  />

</ComponentSection>
