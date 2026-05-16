---
title: "DatePicker"
description: "A date selection calendar supporting single, multiple, and range selection modes."
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

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```svelte
<script lang="ts">
  import { DatePicker } from 'kumo-svelte';
</script>

<DatePicker />
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference


DatePicker forwards all props to <a href="https://daypicker.dev/api/interfaces/PropsBase" target="_blank" rel="noopener noreferrer">Bits UI</a>.
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
    <li>`class` — Additional CSS classes</li>
  </ul>
  <p class="mt-4 text-kumo-subtle text-sm">
    See the <a href="https://daypicker.dev/docs" target="_blank" rel="noopener noreferrer">Bits UI documentation</a> for the full API.
  </p>

### Differences from Bits UI


For consistency with other Kumo form components, DatePicker uses `onChange` instead of Bits UI's `onSelect`.
    Full type inference is preserved — TypeScript will correctly narrow the callback signature based on the `mode` prop.

</ComponentSection>
