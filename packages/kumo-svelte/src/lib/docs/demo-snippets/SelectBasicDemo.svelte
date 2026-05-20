<script lang="ts">
  import { Select, Label } from 'kumo-svelte';

  let value = $state('apple');
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' }
  ];
</script>

<div class="space-y-2">
  <Label>Favorite Fruit</Label>
  <Select bind:value {options} />
</div>
