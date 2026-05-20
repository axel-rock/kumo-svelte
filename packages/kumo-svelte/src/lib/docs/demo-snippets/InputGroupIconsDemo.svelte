<script lang="ts">
  import { LinkSimple } from 'phosphor-svelte';
  import { InputGroup } from 'kumo-svelte';
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroup.Addon>
    <LinkSimple />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Paste a link..." aria-label="Link" />
</InputGroup>
