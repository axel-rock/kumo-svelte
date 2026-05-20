<script lang="ts">
  import { Banner } from '$lib';
  import { WarningCircle } from 'phosphor-svelte';
</script>

<Banner
  icon={WarningCircle}
  variant="error"
  title="Save failed"
  description="We couldn't save your changes. Please try again."
/>
