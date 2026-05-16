---
title: "DatePicker"
description: "A date selection calendar supporting single, multiple, and range selection modes."
sourceFile: "components/date-picker"
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

<ComponentExample demo="DatePickerSingleDemo" />

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

  
    DatePicker supports three selection modes: `single`,
    `multiple`, and
    `range`.
  

```tsx

export default function Example() {
  const [date, setDate] = useState<Date>();

  return <DatePicker mode="single" selected={date} onChange={setDate} />;
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Single Date Selection

Select a single date. The most common use case for date pickers.

<ComponentExample demo="DatePickerSingleDemo" />

### Multiple Date Selection

  Select multiple individual dates. Use `max` to limit the number of selections.

<ComponentExample demo="DatePickerMultipleDemo" />

### Date Range Selection

  Select a continuous range of dates. Works well with `numberOfMonths=&#123;2&#125;` for a
  side-by-side view.

<ComponentExample demo="DatePickerRangeDemo" />

### Range with Min/Max Constraints

Constrain the range length using `min` and `max` props (in days/nights).

<ComponentExample demo="DatePickerRangeMinMaxDemo" />

### With Popover

  Compose with the [Popover](/components/popover) component to create a dropdown
  date picker.

<ComponentExample demo="DatePickerPopoverDemo" />

### Date Range with Popover

A date range picker in a popover with two months displayed.

<ComponentExample demo="DatePickerRangePopoverDemo" />

### Date Range with Presets

Combine the date picker with preset options for quick selection.

<ComponentExample demo="DatePickerRangeWithPresetsDemo" />

### Disabled Dates with Usage Limits

  
    Use the `disabled` prop to make certain dates unselectable,
    and `footer` to display usage information.

<ComponentExample demo="DatePickerDisabledWithFooterDemo" />

</ComponentSection>

<!-- Full Popover Example -->

<ComponentSection>

## Full Popover Example

  
    Here's a complete example showing how to compose DatePicker with Popover:
  

```tsx

export function DatePickerDropdown() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <Popover.Trigger
        render={<Button variant="outline" icon={CalendarDotsIcon} />}
      >
        {date ? date.toLocaleDateString() : "Pick a date"}
      </Popover.Trigger>
      <Popover.Content className="p-3">
        <DatePicker
          mode="single"
          selected={date}
          onChange={(d) => setDate(d)}
/>
      </Popover.Content>
    </Popover>
  );
}
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  
    DatePicker forwards all props to <a href="https://daypicker.dev/api/interfaces/PropsBase" target="_blank" rel="noopener noreferrer">react-day-picker</a>. 
    Key props include:
  
  <ul class="mt-4 list-disc list-inside space-y-2">
    <li>`mode` — <code class="text-xs">"single" | "multiple" | "range"</code> — Selection mode (required)</li>
    <li>`selected` — Currently selected date(s)</li>
    <li>`onChange` — Callback when selection changes</li>
    <li>`numberOfMonths` — Number of months to display</li>
    <li>`disabled` — Dates that cannot be selected</li>
    <li>`min` / `max` — Min/max selection constraints</li>
    <li>`footer` — Content rendered below the calendar</li>
    <li>`locale` — date-fns locale for internationalization</li>
    <li>`className` — Additional CSS classes</li>
  </ul>
  <p class="mt-4 text-kumo-subtle text-sm">
    See the <a href="https://daypicker.dev/docs" target="_blank" rel="noopener noreferrer">react-day-picker documentation</a> for the full API.
  

### Differences from react-day-picker

  
    For consistency with other Kumo form components, DatePicker uses `onChange` instead of react-day-picker's `onSelect`.
    Full type inference is preserved — TypeScript will correctly narrow the callback signature based on the `mode` prop.

</ComponentSection>
