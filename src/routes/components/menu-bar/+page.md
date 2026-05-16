---
title: "MenuBar"
description: "A horizontal menu bar with icon buttons, commonly used for text editors or toolbars."
sourceFile: "components/menubar"
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

<ComponentExample demo="MenuBarBasicDemo" />

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
    <MenuBar
      options={[
        {
          icon: <TextBolderIcon />,
          id: "bold",
          tooltip: "Bold",
          onClick: () => console.log("Bold clicked"),
        },
      ]}
/>
  );
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Text Formatting

<ComponentExample demo="MenuBarTextFormattingDemo" />

### Without Active State

<ComponentExample demo="MenuBarNoActiveDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="MenuBar"  />

</ComponentSection>
