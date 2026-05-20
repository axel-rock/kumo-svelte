<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { PageHeader } from '../../../blocks/page-header';
  import { Gear, House } from 'phosphor-svelte';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link icon={House} href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current icon={Gear}>Settings</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader breadcrumbContent={breadcrumbs} />
