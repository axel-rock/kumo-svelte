<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { House } from 'phosphor-svelte';
</script>

<Breadcrumbs>
  <Breadcrumbs.Link href="#" icon={House}>Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current loading />
</Breadcrumbs>
