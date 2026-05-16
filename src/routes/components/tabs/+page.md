---
title: "Tabs"
description: "A set of layered sections of content, known as tab panels, displayed one at a time."
sourceFile: "components/tabs"
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

<ComponentExample demo="TabsDefaultDemo" />

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
    <Tabs
      tabs={[
        { value: "overview", label: "Overview" },
        { value: "settings", label: "Settings" },
      ]}
      selectedValue="overview"
/>
  );
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Variants

#### Segmented (Default)

A pill-shaped indicator slides between tabs on a subtle background.

<ComponentExample demo="TabsSegmentedDemo" />

#### Underline

  A bottom border with a primary-colored indicator. The active tab has bolder
  text for emphasis.

<ComponentExample demo="TabsUnderlineDemo" />

### Small Size

  Use `size="sm"` for a compact tab bar that matches `Input size="sm"` height (h-6.5 / 26px).
  Useful inside toolbars and filter rows.

<ComponentExample demo="TabsSmDemo" />

### Controlled

Use the `value` and `onValueChange` props for controlled state.

<ComponentExample demo="TabsControlledDemo" />

### Many Tabs

Tabs automatically scroll horizontally when there are many items.

<ComponentExample demo="TabsManyDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="Tabs"  />

### TabsItem

  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Property</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Required</th>
      </tr>
    </thead>
    <tbody class="text-kumo-subtle">
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">value</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">Yes</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">label</td>
        <td class="px-4 py-3 font-mono text-xs">ReactNode</td>
        <td class="px-4 py-3 font-mono text-xs">Yes</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">className</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">No</td>
      </tr>
    </tbody>
  </table>

</ComponentSection>
