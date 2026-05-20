<script lang="ts">
  import { Button } from 'kumo-svelte';
  import { Plus } from 'phosphor-svelte';
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button variant="secondary" shape="square" aria-label="Add item">
    <Plus class="size-4" />
  </Button>
  <Button variant="secondary" shape="circle" aria-label="Add item">
    <Plus class="size-4" />
  </Button>
</div>
