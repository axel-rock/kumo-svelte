---
title: "DatePicker"
description: "Date and date range pickers built on Bits UI calendar primitives."
sourceFile: "components/date-picker"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="DatePickerSingleDemo" />
</ComponentSection>

<ComponentSection>

## Range

<ComponentExample demo="DatePickerRangeDemo" />

</ComponentSection>

<ComponentSection>

## Multiple Months

<ComponentExample demo="DatePickerTwoMonthsDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```svelte
<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { DatePicker } from 'kumo-svelte';

  let value = $state(new CalendarDate(2026, 5, 16));
</script>

<DatePicker bind:value />
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

DatePicker and DateRangePicker are styled wrappers around Bits UI's DatePicker and DateRangePicker primitives.
Values use `DateValue` objects from `@internationalized/date`, which keeps the Svelte API aligned with Bits UI and avoids native input string parsing.

Key DatePicker props include:

  <ul class="mt-4 list-disc list-inside space-y-2">
    <li>`value` — Selected `DateValue`; bind with `bind:value` for two-way updates</li>
    <li>`onValueChange` — Callback when the selected date changes</li>
    <li>`placeholder` — Calendar view placeholder date</li>
    <li>`numberOfMonths` — Number of months to display</li>
    <li>`minValue` / `maxValue` — Minimum and maximum allowed dates</li>
    <li>`isDateDisabled` — Disable specific dates</li>
    <li>`isDateUnavailable` — Mark dates unavailable while keeping them selectable</li>
    <li>`disabled` / `readonly` — Control interaction state</li>
    <li>`locale` — Locale string for formatting</li>
    <li>`class`, `triggerClass`, `contentClass`, `calendarClass` — Styling hooks</li>
  </ul>
  <p class="mt-4 text-kumo-subtle text-sm">
    DateRangePicker accepts the same calendar props, but its `value` is an object with `start` and `end` dates.
    See the <a href="https://bits-ui.com/docs/components/date-picker" target="_blank" rel="noopener noreferrer">Bits UI DatePicker documentation</a> for the full primitive API.
  </p>

</ComponentSection>
