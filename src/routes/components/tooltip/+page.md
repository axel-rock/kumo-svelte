---
title: "Tooltip"
description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
sourceFile: "components/tooltip"
baseUIComponent: "tooltip"
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

<ComponentExample demo="TooltipHeroDemo" />

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
  return (
    <Tooltip content="Tooltip text" render={<Button />}>
      Hover me
    </Tooltip>
  );
}
```

For delay grouping across multiple tooltips, see [TooltipProvider](#tooltipprovider).

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic Tooltip

<ComponentExample demo="TooltipBasicDemo" />

### Multiple Tooltips

<ComponentExample demo="TooltipMultipleDemo" />

### Delay Control

  Use `delay` to control how long to wait before opening (default: 600ms) and
  `closeDelay` to control how long to wait before closing (default: 0ms).

<ComponentExample demo="TooltipDelayDemo" />

</ComponentSection>

<!-- TooltipProvider -->

<ComponentSection>
## TooltipProvider

  `TooltipProvider` groups multiple tooltips so that after the first tooltip has
  been shown, switching to another skips the open delay. Place it once at your
  app root or layout — not around each individual `Tooltip`.

```tsx
// Wrap your app or layout once
<TooltipProvider>
  <App />
</TooltipProvider>

// Then use Tooltip anywhere inside
<Tooltip content="Add" render={<Button shape="square" icon={PlusIcon} />} />
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Tooltip

<PropsTable component="Tooltip"  />

### TooltipProvider

<PropsTable component="Tooltip.Provider"  />

</ComponentSection>
