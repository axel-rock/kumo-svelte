---
title: "Clipboard Text"
description: "A text component with a copy-to-clipboard button."
sourceFile: "components/clipboard-text"
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

<ComponentExample demo="ClipboardTextBasicDemo" />

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
  return <ClipboardText text="Copy this text" />;
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Short Text

<ComponentExample demo="ClipboardTextShortDemo" />

### API Key

<ComponentExample demo="ClipboardTextApiKeyDemo" />

### Copy Alternate Text

<ComponentExample demo="ClipboardTextAlternateTextToCopyDemo" />

### Long Text

<ComponentExample demo="ClipboardTextLongDemo" />

### With Tooltip

Shows "Copy" tooltip on hover, "Copied!" toast on click.

<ComponentExample demo="ClipboardTextWithTooltipDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="ClipboardText"  />

</ComponentSection>
