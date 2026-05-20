<script lang="ts">
  import { Button, DatePicker, Popover } from 'kumo-svelte';
  import { CalendarDotsIcon } from 'phosphor-svelte';

  let date = $state<Date | undefined>();
</script>

<Popover class="p-3">
  {#snippet trigger(props)}
    <Button variant="outline" icon={CalendarDotsIcon} {...props}>
      {date ? date.toLocaleDateString() : 'Pick a date'}
    </Button>
  {/snippet}

  <DatePicker mode="single" selected={date} onChange={(d) => (date = d as Date | undefined)} />
</Popover>
