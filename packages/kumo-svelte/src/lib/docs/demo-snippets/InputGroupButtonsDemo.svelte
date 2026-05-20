<script lang="ts">
  import { Eye, EyeSlash, MagnifyingGlass, X } from 'phosphor-svelte';
  import { InputGroup } from 'kumo-svelte';

  let show = $state(false);
  let searchValue = $state('search');
</script>

<div class="flex flex-col gap-4">
  <InputGroup class="w-full max-w-3xs">
    <InputGroup.Input type={show ? 'text' : 'password'} value="password" aria-label="Password" />
    <InputGroup.Addon align="end">
      <InputGroup.Button
        class="text-kumo-subtle"
        icon={show ? EyeSlash : Eye}
        aria-label={show ? 'Hide password' : 'Show password'}
        onclick={() => (show = !show)}
      />
    </InputGroup.Addon>
  </InputGroup>

  <InputGroup class="w-full max-w-3xs">
    <InputGroup.Addon>
      <MagnifyingGlass />
    </InputGroup.Addon>
    <InputGroup.Input bind:value={searchValue} placeholder="Search" aria-label="Search" />
    {#if searchValue}
      <InputGroup.Addon align="end" class="pr-1">
        <InputGroup.Button aria-label="Clear search" onclick={() => (searchValue = '')}>
          <X />
        </InputGroup.Button>
      </InputGroup.Addon>
    {/if}
    <InputGroup.Button variant="secondary">Search</InputGroup.Button>
  </InputGroup>
</div>
