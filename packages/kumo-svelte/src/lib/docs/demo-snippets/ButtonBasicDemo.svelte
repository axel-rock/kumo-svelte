<script lang="ts">
  import { Button } from 'kumo-svelte';
  import { Plus } from 'phosphor-svelte';
</script>

<div class="flex flex-wrap items-center gap-2">
  <Button variant="secondary">Button</Button>
  <Button variant="secondary" shape="square" aria-label="Add">
    <Plus class="size-4" />
  </Button>
</div>
