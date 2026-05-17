---
title: "Table"
description: "A table component for displaying tabular data with support for selection, row variants, and column sizing."
sourceFile: "components/table"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
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

```svelte
<script lang="ts">
  import { Table } from 'kumo-svelte';
</script>
```

### Granular

```svelte
<script lang="ts">
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from 'kumo-svelte/components/table';
</script>
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { LayerCard } from 'kumo-svelte';
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from 'kumo-svelte/components/table';
</script>

<LayerCard class="p-0">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>John Doe</TableCell>
        <TableCell>john@example.com</TableCell>
        <TableCell>Admin</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</LayerCard>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### With Checkboxes

Add row selection with `TableCheckHead` and `TableCheckCell`. Both accept
`onCheckedChange`, which matches the underlying Svelte `Checkbox` callback.

The older `onValueChange` prop still works but is deprecated and will be
removed in a future major version. Migrate by renaming the prop:

```svelte
<!-- Before (deprecated) -->
<TableCheckCell onValueChange={(checked) => toggleRow(id)} />

<!-- After -->
<TableCheckCell onCheckedChange={(checked) => toggleRow(id)} />
```

<ComponentExample demo="TableWithCheckboxDemo" />

### Compact Header

Use `variant="compact"` on `TableHeader` for a more condensed header style.

<ComponentExample demo="TableWithCompactHeaderDemo" />

### Selected Row

Use `variant="selected"` on `TableRow` to highlight selected rows.

<ComponentExample demo="TableSelectedRowDemo" />

### Fixed Layout with Column Sizes

For precise control over column widths, set `layout="fixed"` and use
`colgroup` with `col` elements.

<ComponentExample demo="TableFixedLayoutDemo" />

### Sticky Column

Pin a column to the left or right edge of the scroll container with
`sticky="left"` or `sticky="right"` on `TableHead` and `TableCell`. The
component automatically adds an opaque background and gradient fade. Wrap the
table in an `overflow-x-auto` container.

<ComponentExample demo="TableStickyColumnDemo" />

### Compact Header with Sticky Column

Combining `variant="compact"` on `TableHeader` with `sticky` columns.

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

Root table component. Renders a semantic `<table>` element.

<PropsTable component="Table" />

### TableHeader

Table header section. Renders `<thead>`. Set `sticky` to pin the header row to the top of the scroll container.

### TableBody

Table body section. Renders `<tbody>`.

### TableRow

Table row. Supports `variant="selected"` for highlighting.

<PropsTable component="Table.Row" />

### TableHead

Header cell. Renders `<th>`. Accepts `sticky="left"` or `sticky="right"` to pin the column.

### TableCell

Body cell. Renders `<td>`. Accepts `sticky="left"` or `sticky="right"` to pin the column.

### TableCheckHead

Header cell with checkbox for "select all" functionality.

<PropsTable component="Table.CheckHead" />

### TableCheckCell

Body cell with checkbox for row selection.

<PropsTable component="Table.CheckCell" />

### TableResizeHandle

Draggable handle for column resizing. Use with TanStack Table or custom resize
logic.

</ComponentSection>

<!-- TanStack Table Integration -->

<ComponentSection>

## TanStack Table Integration

For advanced features like sorting, filtering, and resizable columns, integrate with <a href="https://tanstack.com/table" class="text-kumo-link hover:underline" target="_blank" rel="noopener noreferrer">TanStack Table</a>. The Table component is designed to work with TanStack's headless API.

```svelte
<script lang="ts">
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableResizeHandle } from 'kumo-svelte/components/table';
</script>

<Table layout="fixed">
  <colgroup>
    {#each table.getAllColumns() as column}
      <col style:width={`${column.getSize()}px`} />
    {/each}
  </colgroup>
  <TableHeader>
    {#each table.getHeaderGroups() as headerGroup}
      <TableRow>
        {#each headerGroup.headers as header}
          <TableHead>
            {flexRender(header.column.columnDef.header, header.getContext())}
            <TableResizeHandle
              onmousedown={header.getResizeHandler()}
              ontouchstart={header.getResizeHandler()}
            />
          </TableHead>
        {/each}
      </TableRow>
    {/each}
  </TableHeader>
  <TableBody>
    {#each table.getRowModel().rows as row}
      <TableRow>
        {#each row.getVisibleCells() as cell}
          <TableCell>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        {/each}
      </TableRow>
    {/each}
  </TableBody>
</Table>
```

</ComponentSection>

<!-- Accessibility -->

<ComponentSection>

## Accessibility

### Semantic HTML

Table uses semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>` elements for proper screen reader navigation.

### Checkbox Labels

Always provide `aria-label` for `TableCheckHead` and `TableCheckCell` to
describe their purpose.

### Keyboard Navigation

<kbd class="rounded bg-kumo-control px-1.5 py-0.5">Tab</kbd> moves focus
through interactive elements. Checkboxes respond to
<kbd class="rounded bg-kumo-control px-1.5 py-0.5">Space</kbd>.

</ComponentSection>
