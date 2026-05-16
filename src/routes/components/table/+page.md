---
title: "Table"
description: "A table component for displaying tabular data with support for selection, row variants, and column sizing."
sourceFile: "components/table"
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

<ComponentExample demo="TableBasicDemo" />

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
    <LayerCard className="p-0">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Role</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>John Doe</Table.Cell>
            <Table.Cell>john@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </LayerCard>
  );
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### With Checkboxes

  Add row selection with `Table.CheckHead` and `Table.CheckCell`. Both accept
  `onCheckedChange`, which matches the underlying `Checkbox` component's
  signature and exposes optional event details as a second argument.

  The older `onValueChange` prop still works but is deprecated — the lint
  rule will flag it and it will be removed in a future major version. Migrate
  by renaming the prop:

```tsx
// Before (deprecated)
<Table.CheckCell onValueChange={(checked) => toggleRow(id)} />

// After
<Table.CheckCell onCheckedChange={(checked) => toggleRow(id)} />

// With event details
<Table.CheckCell
  onCheckedChange={(checked, eventDetails) => {
    toggleRow(id);
    eventDetails?.event.stopPropagation();
  }}
/>
```

<ComponentExample demo="TableWithCheckboxDemo" />

### Compact Header

  Use `variant="compact"` on `Table.Header` for a more condensed header style.

<ComponentExample demo="TableWithCompactHeaderDemo" />

### Selected Row

Use `variant="selected"` on `Table.Row` to highlight selected rows.

<ComponentExample demo="TableSelectedRowDemo" />

### Fixed Layout with Column Sizes

  For precise control over column widths, set `layout="fixed"` and use
  `colgroup` with `col` elements.

<ComponentExample demo="TableFixedLayoutDemo" />

### Sticky Column

  Pin a column to the left or right edge of the scroll container with
  `sticky="left"` or `sticky="right"` on `Table.Head` and `Table.Cell`. The
  component automatically adds an opaque background and gradient fade. Wrap the
  table in an `overflow-x-auto` container.

<ComponentExample demo="TableStickyColumnDemo" />

### Compact Header with Sticky Column

Combining `variant="compact"` on `Table.Header` with `sticky` columns.

<ComponentExample demo="TableCompactStickyDemo" />

### Full Example

  Complete table with checkboxes, badges, action buttons, and fixed column
  widths.

<ComponentExample demo="TableFullDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Table

Root table component. Renders a semantic `&lt;table&gt;` element.

<PropsTable component="Table"  />

### Table.Header

Table header section. Renders `&lt;thead&gt;`. Set `sticky` to pin the header row to the top of the scroll container.

### Table.Body

Table body section. Renders `&lt;tbody&gt;`.

### Table.Row

Table row. Supports `variant="selected"` for highlighting.

<PropsTable component="Table.Row"  />

### Table.Head

Header cell. Renders `&lt;th&gt;`. Accepts `sticky="left"` or `sticky="right"` to pin the column.

### Table.Cell

Body cell. Renders `&lt;td&gt;`. Accepts `sticky="left"` or `sticky="right"` to pin the column.

### Table.CheckHead

Header cell with checkbox for "select all" functionality.

<PropsTable component="Table.CheckHead"  />

### Table.CheckCell

Body cell with checkbox for row selection.

<PropsTable component="Table.CheckCell"  />

### Table.ResizeHandle

  Draggable handle for column resizing. Use with TanStack Table or custom resize
  logic.

</ComponentSection>

<!-- TanStack Table Integration -->

<ComponentSection>

## TanStack Table Integration

  
    For advanced features like sorting, filtering, and resizable columns, integrate with <a href="https://tanstack.com/table" class="text-kumo-link hover:underline" target="_blank" rel="noopener noreferrer">TanStack Table</a>. The Table component is designed to work seamlessly with TanStack's headless API.
  

```tsx

function DataTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <Table layout="fixed">
      <colgroup>
        {table.getAllColumns().map((column) => (
          <col key={column.id} style={{ width: column.getSize() }} />
        ))}
      </colgroup>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Head key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                <Table.ResizeHandle
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
/>
              </Table.Head>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
```

</ComponentSection>

<!-- Accessibility -->

<ComponentSection>

## Accessibility

### Semantic HTML

  Table uses semantic `&lt;table&gt;`, `&lt;thead&gt;`, `&lt;tbody&gt;`, `&lt;th&gt;`, and `&lt;td&gt;` elements for proper screen reader navigation.

### Checkbox Labels

  Always provide `aria-label` for `Table.CheckHead` and `Table.CheckCell` to
  describe their purpose.

### Keyboard Navigation

  <kbd class="rounded bg-kumo-control px-1.5 py-0.5">Tab</kbd> moves focus
  through interactive elements. Checkboxes respond to 
  <kbd class="rounded bg-kumo-control px-1.5 py-0.5">Space</kbd>.

</ComponentSection>
