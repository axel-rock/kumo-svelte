<script lang="ts">
  import { Banner, Button } from '$lib';
  import { Warning } from 'phosphor-svelte';
</script>

<Banner
  icon={Warning}
  variant="alert"
  title="Session expiring"
  description="Your session will expire in 5 minutes."
>
  {#snippet action()}
    <Button size="sm" variant="secondary">Dismiss</Button>
    <Button size="sm">Extend session</Button>
  {/snippet}
</Banner>
