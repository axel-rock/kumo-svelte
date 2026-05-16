---
title: "Badge"
description: "Displays a small label for status, categorization, or metadata."
sourceFile: "components/badge"
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>


<ComponentExample demo="BadgeSemanticVariantsDemo" />

## Installation

### Barrel

```tsx
```

### Granular

```tsx
```

## Usage

```tsx

export default function Example() {
  return <Badge variant="secondary">New</Badge>;
}
```

## Examples

### Primary Badges

<ComponentExample demo="BadgeSemanticVariantsDemo" />

### Other variants

Other variants for specific products/use cases where the semantic badges aren't enough to convey intended meaning or status.

<ComponentExample demo="BadgeColorVariantsDemo" />

### In a sentence

<ComponentExample demo="BadgeInSentenceDemo" />

## API Reference

<PropsTable component="Badge"  />
