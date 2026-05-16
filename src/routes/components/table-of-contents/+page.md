---
title: "Table of Contents"
description: "Presentational compound component for section navigation with an active indicator bar."
sourceFile: "components/table-of-contents"
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

<ComponentExample demo="TableOfContentsBasicDemo" />

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
    <TableOfContents>
      <TableOfContents.Title>On this page</TableOfContents.Title>
      <TableOfContents.List>
        <TableOfContents.Item href="#intro" active>
          Introduction
        </TableOfContents.Item>
        <TableOfContents.Item href="#api">API Reference</TableOfContents.Item>
      </TableOfContents.List>
    </TableOfContents>
  );
}
```

  This component is purely presentational. All interaction logic — scroll
  tracking, `IntersectionObserver`, active state management — is left to the
  consumer.

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Interactive

  Click an item to set it as active. The consumer controls state via `active`
  and `onClick`.

<ComponentExample demo="TableOfContentsInteractiveDemo" />

### No active item

  When no item has `active` set, all items show the default subtle text style
  with a hover indicator.

<ComponentExample demo="TableOfContentsNoActiveDemo" />

### Groups

  Use `TableOfContents.Group` to organize items into labeled sections with
  indented children. Groups support two modes: pass an `href` to make the group
  label a clickable link (like "Examples" and "API" below), or omit it for a
  plain non-interactive title (like "Getting Started").

<ComponentExample demo="TableOfContentsGroupDemo" />

### Without title

  The title sub-component is optional — use `TableOfContents.List` directly if
  you don't need a heading.

<ComponentExample demo="TableOfContentsWithoutTitleDemo" />

### Custom element

  Use the `render` prop to swap the default anchor for a button, router link, or
  any element.

<ComponentExample demo="TableOfContentsRenderPropDemo" />

#### React Router

```tsx
<TableOfContents.Item render={<Link to="/intro" />} active>
  Introduction
</TableOfContents.Item>
```

#### Next.js

```tsx

<TableOfContents.Item render={<Link href="/intro" />} active>
  Introduction
</TableOfContents.Item>;
```

#### Button (no navigation)

```tsx
<TableOfContents.Item render={<button type="button" />} onClick={handleClick}>
  Introduction
</TableOfContents.Item>
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### `TableOfContents`

Root nav container with a default `aria-label` of "Table of contents".

<PropsTable component="TableOfContents"  />

### `TableOfContents.Title`

Optional uppercase heading displayed above the list (renders a `&lt;p&gt;`).

<PropsTable component="TableOfContents.Title"  />

### `TableOfContents.List`

List container with a left border rail.

<PropsTable component="TableOfContents.List"  />

### `TableOfContents.Item`

  Individual navigation link. Set `active` for the current section. Use the
  `render` prop to swap the anchor for a router link or button.

<PropsTable component="TableOfContents.Item"  />

### `TableOfContents.Group`

Groups items under a labeled section with indented children. Pass `href` to make the label a clickable link, or omit for a plain title.

<PropsTable component="TableOfContents.Group"  />

</ComponentSection>
