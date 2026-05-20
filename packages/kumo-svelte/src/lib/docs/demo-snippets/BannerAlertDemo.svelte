<script lang="ts">
  import { Banner } from '$lib';
  import { Warning } from 'phosphor-svelte';
</script>

<Banner
  icon={Warning}
  variant="alert"
  title="Session expiring"
  description="Your session will expire in 5 minutes."
/>
