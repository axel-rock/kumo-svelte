<script lang="ts">
  import { Code, Globe, Package } from 'phosphor-svelte';
  import { Button, Empty } from 'kumo-svelte';
</script>

<Empty
  title="No packages found"
  description="Get started by installing your first package."
  commandLine="npm install @cloudflare/kumo"
>
  {#snippet icon()}<Package class="size-12" />{/snippet}
  <div class="flex items-center gap-2">
    <Button icon={Code}>See examples</Button>
    <Button icon={Globe} variant="primary">View documentation</Button>
  </div>
</Empty>
