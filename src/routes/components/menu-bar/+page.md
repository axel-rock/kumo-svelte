---
title: "MenuBar"
description: "A horizontal menu bar with icon buttons, commonly used for text editors or toolbars."
sourceFile: "components/menubar"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
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

```svelte
import { MenuBar } from "kumo-svelte";
```

### Granular

```svelte
import { MenuBar } from "kumo-svelte/components/menubar";
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
import { MenuBar } from "kumo-svelte";
import { Bold } from "@lucide/svelte";

<MenuBar
  options={[
    {
      icon: Bold,
      id: "bold",
      tooltip: "Bold",
      onClick: () => console.log("Bold clicked"),
    },
  ]}
/>
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

  <PropsTable component="MenuBar" />
</ComponentSection>
