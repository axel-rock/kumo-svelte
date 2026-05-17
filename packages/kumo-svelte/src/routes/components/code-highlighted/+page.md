---
title: "CodeHighlighted"
description: "Syntax-highlighted code blocks powered by Shiki and styled with Kumo colors."
sourceFile: "components/code-highlighted"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>
  <ComponentExample demo="CodeHighlightedBasicDemo" />
</ComponentSection>

<ComponentSection>

## Installation

### Barrel

```svelte
<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';
</script>
```

### Granular

```svelte
<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte/components/code-highlighted';
</script>
```

</ComponentSection>

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';

  const code = `const status = 'ready';`;
</script>

<CodeHighlighted {code} lang="ts" showCopyButton />
```

</ComponentSection>

<ComponentSection>

## Examples

### TypeScript

<ComponentExample demo="CodeHighlightedBasicDemo" />

### Copy Button

<ComponentExample demo="CodeHighlightedCopyButtonDemo" />

</ComponentSection>

<ComponentSection>

## API Reference

<PropsTable component="CodeHighlighted" />

</ComponentSection>
