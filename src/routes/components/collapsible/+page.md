---
title: "Collapsible"
description: "A composable disclosure component for showing and hiding content."
sourceFile: "components/collapsible"
baseUIComponent: "collapsible"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="CollapsibleHeroDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```svelte
<script lang="ts">
  import {
    CollapsibleRoot,
    CollapsibleDefaultTrigger,
    CollapsibleDefaultPanel
  } from 'kumo-svelte';
</script>

<CollapsibleRoot open>
  <CollapsibleDefaultTrigger>Show details</CollapsibleDefaultTrigger>
  <CollapsibleDefaultPanel>
    Content with border-left accent styling.
  </CollapsibleDefaultPanel>
</CollapsibleRoot>
```

### Granular

```svelte
<script lang="ts">
  import {
    CollapsibleRoot,
    CollapsibleDefaultTrigger,
    CollapsibleDefaultPanel
  } from 'kumo-svelte/components/collapsible';
</script>
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

Collapsible uses a compound component pattern for full composition control.

### With Default Styling

Use `CollapsibleDefaultTrigger` and `CollapsibleDefaultPanel` for the classic Kumo style:

```svelte
<script lang="ts">
  import {
    CollapsibleRoot,
    CollapsibleDefaultTrigger,
    CollapsibleDefaultPanel
  } from 'kumo-svelte';

  let open = $state(false);
</script>

<CollapsibleRoot bind:open>
  <CollapsibleDefaultTrigger>Show details</CollapsibleDefaultTrigger>
  <CollapsibleDefaultPanel>
    Content with border-left accent styling.
  </CollapsibleDefaultPanel>
</CollapsibleRoot>
```

### Custom Trigger

Use `CollapsibleTrigger` for full control over the trigger element:

```svelte
<script lang="ts">
  import { CollapsibleRoot, CollapsibleTrigger, CollapsiblePanel } from 'kumo-svelte';

  let open = $state(false);
</script>

<CollapsibleRoot bind:open>
  <CollapsibleTrigger class="rounded-lg bg-kumo-base px-3 py-2 text-sm ring ring-kumo-line">
    {open ? 'Hide' : 'Show'} details
  </CollapsibleTrigger>
  <CollapsiblePanel class="mt-2 rounded-lg bg-kumo-tint p-4">
    Custom styled panel content.
  </CollapsiblePanel>
</CollapsibleRoot>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic

<ComponentExample demo="CollapsibleBasicDemo" />

### Multiple Items

<ComponentExample demo="CollapsibleMultipleDemo" />

### Custom Trigger

Use `CollapsibleTrigger` for full control:

<ComponentExample demo="CollapsibleCustomTriggerDemo" />

### Keep Mounted

Use `keepMounted` on `DefaultPanel` (or `Panel`) to preserve internal state — such as form inputs — when the panel is collapsed:

<ComponentExample demo="CollapsibleKeepMountedDemo" />

### Accordion Pattern

Control which item is open to create an accordion where only one item can be expanded at a time:

<ComponentExample demo="CollapsibleAccordionDemo" />

</ComponentSection>

<!-- Sub-components -->

<ComponentSection>

## Sub-components

| Component | Description |
|-----------|-------------|
| `CollapsibleRoot` | Manages open state. Pass `open` and `onOpenChange` for controlled mode, or use `bind:open`. |
| `CollapsibleTrigger` | Button that toggles visibility. |
| `CollapsiblePanel` | Container for collapsible content. |
| `CollapsibleDefaultTrigger` | Pre-styled trigger with text label and animated caret icon. |
| `CollapsibleDefaultPanel` | Pre-styled panel with border-left accent and standard spacing. |

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### CollapsibleRoot

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Whether the panel is visible (controlled). |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled). |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes. |
| `disabled` | `boolean` | `false` | Whether the collapsible is disabled. |

### CollapsibleTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | — | Additional CSS classes. |

### CollapsiblePanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | — | Additional CSS classes. |
| `keepMounted` | `boolean` | `false` | Whether to keep the panel in the DOM when closed. |

### CollapsibleDefaultTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Label text displayed in the trigger. |
| `class` | `string` | — | Additional CSS classes. |

### CollapsibleDefaultPanel

Accepts all `CollapsiblePanel` props in addition to the ones listed below.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Panel content. |
| `class` | `string` | — | Additional CSS classes. |
| `keepMounted` | `boolean` | `false` | Whether to keep the panel in the DOM when closed. |

</ComponentSection>
