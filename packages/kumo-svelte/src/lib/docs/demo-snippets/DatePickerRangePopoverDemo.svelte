<script lang="ts">
  import { Button, DatePicker, Popover, type DateRange } from 'kumo-svelte';
  import { CalendarDotsIcon } from 'phosphor-svelte';

  let range = $state<DateRange | undefined>();

  function formatRange() {
    if (!range?.from) return 'Select dates';
    if (!range.to) return range.from.toLocaleDateString();
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
  }
</script>

<Popover class="p-3">
  {#snippet trigger(props)}
    <Button variant="outline" icon={CalendarDotsIcon} {...props}>
      {formatRange()}
    </Button>
  {/snippet}

  <DatePicker
    mode="range"
    selected={range}
    onChange={(d) => (range = d as DateRange | undefined)}
    numberOfMonths={2}
  />
</Popover>
