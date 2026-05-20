<script lang="ts">
  import { Banner, Button } from '$lib';
  import { Info } from 'phosphor-svelte';
</script>

<Banner icon={Info} title="Update available" description="A new version is ready to install.">
  {#snippet action()}
    <Button size="sm" variant="primary">Update now</Button>
  {/snippet}
</Banner>
