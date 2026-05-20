<script lang="ts">
  import { MagnifyingGlass, Question } from 'phosphor-svelte';
  import { InputGroup } from 'kumo-svelte';
</script>

<InputGroup class="w-full max-w-2xs">
  <InputGroup.Addon>
    <MagnifyingGlass />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search with query language..." aria-label="Search" />
  <InputGroup.Addon align="end">
    <InputGroup.Button
      class="text-kumo-subtle"
      icon={Question}
      tooltip="Query language help"
    />
  </InputGroup.Addon>
</InputGroup>
