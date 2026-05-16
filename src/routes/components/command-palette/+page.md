---
title: "CommandPalette"
description: "A composable command palette component for search and command dialogs."
sourceFile: "components/command-palette"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="CommandPaletteBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```svelte
<script lang="ts">
  import { CommandPalette } from 'kumo-svelte';
</script>

<CommandPalette />
```

</ComponentSection>

<!-- Keyboard Navigation -->

<ComponentSection>

## Keyboard Navigation


Built-in keyboard navigation is provided automatically:

<ul>
  <li><kbd>↑</kbd> <kbd>↓</kbd> Move highlight between items</li>
  <li><kbd>Enter</kbd> Select highlighted item</li>
  <li><kbd>⌘/Ctrl</kbd> <kbd>Enter</kbd> Select with <code>newTab: true</code></li>
  <li><kbd>Escape</kbd> Close the dialog</li>
</ul>
</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### With Grouped Items


Group related commands together with labels.

<ComponentExample demo="CommandPaletteBasicDemo" />

### Simple Flat List


For simpler use cases, use a flat array of items without grouping.

<ComponentExample demo="CommandPaletteSimpleDemo" />

### Loading State


Show a loading spinner while fetching results.

<ComponentExample demo="CommandPaletteLoadingDemo" />

### Disabling Browser Autocomplete


Pass standard HTML input attributes like `autoComplete`, `autoCorrect`, `spellCheck`, and `data-*` to suppress browser and password manager autocomplete overlays.

<ComponentExample demo="CommandPaletteNoAutocompleteDemo" />

### ResultItem with Breadcrumbs


Use `ResultItem` for rich items with
    breadcrumbs, icons, and optional text highlighting.

  <ComponentExample demo="CommandPaletteResultItemDemo" />
</ComponentSection>

<!-- Component Parts -->

<ComponentSection>

## Component Parts

### CommandPalette.Root


The main wrapper that combines Dialog + Panel. Manages open state and
  Autocomplete functionality.


### CommandPalette.Dialog


Modal dialog wrapper. Use with Panel for swappable content (e.g., drill-down
  navigation).


### CommandPalette.Panel


Autocomplete panel without dialog. Use inside Dialog for content that can swap
  without re-mounting.


### CommandPalette.Input


Search input field with auto-focus and keyboard handling.


### CommandPalette.List


Scrollable container for results.


### CommandPalette.Results


Render prop iterator for items/groups.


### CommandPalette.Group


Category grouping container.


### CommandPalette.GroupLabel


Section header text within a group.


### CommandPalette.Items


Render prop iterator for items within a group.


### CommandPalette.Item


Basic selectable item.


### CommandPalette.ResultItem


Rich item with breadcrumbs, icons, and text highlighting.


### CommandPalette.HighlightedText


Renders text with highlighted portions based on match indices.


### CommandPalette.Empty


Empty state when no results match.


### CommandPalette.Loading


Loading spinner state.


### CommandPalette.Footer


Footer for keyboard hints or other content.

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### CommandPalette.Root Props

```svelte
interface CommandPaletteRootProps<TGroup, TItem> {
  // Dialog state
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackdropClick?: (e: MouseEvent) => void;

  // Autocomplete
  items: TGroup[];
  value?: string;
  onValueChange?: (value: string) => void;
  itemToStringValue?: (item: TGroup) => string;
  filter?: (item: TGroup, query: string) => boolean;
  onItemHighlighted?: (item: TGroup | undefined, details: {...}) => void;

  // Selection
  onSelect?: (item: TItem, options: { newTab: boolean }) => void;
  getSelectableItems?: (items: TGroup[]) => TItem[];

  children: Snippet;
}
```

### CommandPalette.ResultItem Props

```svelte
interface CommandPaletteResultItemProps<T> {
  value: T;
  title: string;
  breadcrumbs?: string[];
  titleHighlights?: [number, number][];
  breadcrumbHighlights?: [number, number][][];
  description?: string;
  icon?: Snippet;
  onclick: (e: MouseEvent) => void;
  showArrow?: boolean; // default: true
  external?: boolean; // shows external link icon
  nonInteractive?: boolean;
}
```

</ComponentSection>
