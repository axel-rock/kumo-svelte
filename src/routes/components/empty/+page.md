---
title: "Empty"
description: "A component to display when there's no content or data to show, with optional command line and actions."
sourceFile: "components/empty"
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

<ComponentExample demo="EmptyDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

```tsx
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```tsx

export default function Example() {
  return (
    <Empty
      icon={<PackageIcon size={48} />}
title="No packages found"
description="Get started by installing your first package."
      commandLine="npm install @kumo/ui"
/>
  );
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic

<ComponentExample demo="EmptyBasicDemo" />

</ComponentSection>

<!-- Sizes -->

<ComponentSection>

## Sizes

  Empty states come in three sizes to fit different container contexts.

<ComponentExample demo="EmptySizesDemo" />

</ComponentSection>

<!-- With Command Line -->

<ComponentSection>

## With Command Line

  Include a copyable command to help users get started.

<ComponentExample demo="EmptyWithCommandDemo" />

</ComponentSection>

<!-- With Actions -->

<ComponentSection>

## With Actions

  Add custom action buttons using the contents prop.

<ComponentExample demo="EmptyWithActionsDemo" />

</ComponentSection>

<!-- Minimal -->

<ComponentSection>

## Minimal

  At minimum, only a title is required.

<ComponentExample demo="EmptyMinimalDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="Empty"  />

</ComponentSection>
