---
title: "Loader"
description: "A loading spinner to indicate loading state."
sourceFile: "components/loader"
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

<ComponentExample demo="LoaderBasicDemo" />

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
  return <Loader />;
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Default Size

<ComponentExample demo="LoaderBasicDemo" />

### Custom Size

<ComponentExample demo="LoaderCustomSizeDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="Loader"  />

</ComponentSection>
