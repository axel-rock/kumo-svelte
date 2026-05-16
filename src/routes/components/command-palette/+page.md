---
title: "CommandPalette"
description: "A composable command palette component for search and command dialogs."
sourceFile: "components/command-palette"
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

<ComponentExample demo="CommandPaletteBasicDemo" />

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

  
    CommandPalette is a compound component built on Base UI's Autocomplete
    primitive. It provides accessible keyboard navigation and customizable
    styling for command palette interfaces.
  

```tsx

interface Item {
  id: string;
  title: string;
}

const items: Item[] = [
  { id: "1", title: "Create Project" },
  { id: "2", title: "Open Settings" },
];

export default function Example() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <CommandPalette.Root
        open={open}
        onOpenChange={setOpen}
        items={items}
        value={search}
        onValueChange={setSearch}
        itemToStringValue={(item) => item.title}
        getSelectableItems={(items) => items}
      >
        <CommandPalette.Input placeholder="Search..." />
        <CommandPalette.List>
          <CommandPalette.Results>
            {(item) => (
              <CommandPalette.Item
                key={item.id}
                value={item}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </CommandPalette.Item>
            )}
          </CommandPalette.Results>
          <CommandPalette.Empty>No results</CommandPalette.Empty>
        </CommandPalette.List>
      </CommandPalette.Root>
    </>
  );
}
```

</ComponentSection>

<!-- Keyboard Navigation -->

<ComponentSection>

## Keyboard Navigation

  Built-in keyboard navigation is provided automatically:
  <p class="not-prose my-4 rounded-lg border border-kumo-hairline bg-kumo-canvas p-4 text-sm text-kumo-subtle">KeyboardShortcuts</p>

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

```tsx
interface CommandPaletteRootProps<TGroup, TItem> {
  // Dialog state
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackdropClick?: (e: React.MouseEvent) => void;

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

  children: React.ReactNode;
}
```

### CommandPalette.ResultItem Props

```tsx
interface CommandPaletteResultItemProps<T> {
  value: T;
  title: string;
  breadcrumbs?: string[];
  titleHighlights?: [number, number][];
  breadcrumbHighlights?: [number, number][][];
  description?: string;
  icon?: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  showArrow?: boolean; // default: true
  external?: boolean; // shows external link icon
  nonInteractive?: boolean;
}
```

</ComponentSection>
