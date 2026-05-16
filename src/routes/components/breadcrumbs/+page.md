---
title: "Breadcrumbs"
description: "A navigation component that shows the current page's location within a navigational hierarchy."
sourceFile: "components/breadcrumbs"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>
  <ComponentExample demo="BreadcrumbsWithIconsDemo" />
</ComponentSection>

<ComponentSection>

## Installation


```svelte
import { Breadcrumbs } from 'kumo-svelte';
```

</ComponentSection>

<ComponentSection>

## Usage

```svelte
<script>
  import { Breadcrumbs } from 'kumo-svelte';
</script>

<Breadcrumbs>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
</Breadcrumbs>
```

  <ComponentExample demo="BreadcrumbsDemo" />
</ComponentSection>

<ComponentSection>

## Examples

### Basic

  <ComponentExample demo="BreadcrumbsDemo" />
</ComponentSection>

<ComponentSection>

### Loading

```svelte
<Breadcrumbs>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current loading />
</Breadcrumbs>
```

  <ComponentExample demo="BreadcrumbsLoadingDemo" />
</ComponentSection>

<ComponentSection>

### Root

```svelte
<script>
  import { House } from '@lucide/svelte';
</script>

<Breadcrumbs>
  <Breadcrumbs.Current icon={House}>Worker Analytics</Breadcrumbs.Current>
</Breadcrumbs>
```

  <ComponentExample demo="BreadcrumbsRootDemo" />
</ComponentSection>

<ComponentSection>

### Clipboard

```svelte
<Breadcrumbs>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
  <Breadcrumbs.Clipboard text="#" />
</Breadcrumbs>
```

  <ComponentExample demo="BreadcrumbsWithClipboardDemo" />
</ComponentSection>

<ComponentSection>

## API Reference

### Breadcrumbs

<PropsTable component="Breadcrumbs" />

### Breadcrumbs.Link

<PropsTable component="Breadcrumbs.Link" />

### Breadcrumbs.Current

<PropsTable component="Breadcrumbs.Current" />

### Breadcrumbs.Separator

<PropsTable component="Breadcrumbs.Separator" />

### Breadcrumbs.Clipboard

  <PropsTable component="Breadcrumbs.Clipboard" />
</ComponentSection>
