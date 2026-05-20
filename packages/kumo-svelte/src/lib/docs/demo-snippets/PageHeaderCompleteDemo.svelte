<script lang="ts">
  import { Breadcrumbs, Button } from 'kumo-svelte';
  import { PageHeader } from '../../../blocks/page-header';
  import { Plus } from 'phosphor-svelte';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="#">Products</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>Page title</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  breadcrumbContent={breadcrumbs}
  title="Page title"
  description="Action-led, value-oriented description of what this page does."
  tabs={[
    { label: 'Overview', value: 'overview' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Settings', value: 'settings' }
  ]}
  defaultTab="overview"
>
  <Button variant="outline" size="sm">Export</Button>
  <Button variant="primary" size="sm" icon={Plus}>New Item</Button>
</PageHeader>
