<script lang="ts">
  import {
    Badge,
    Banner,
    Breadcrumbs,
    Button,
    Checkbox,
    ClipboardText,
    Code,
    Collapsible,
    Combobox,
    CommandPalette,
    Dialog,
    DropdownMenu,
    Empty,
    Field,
    Grid,
    Input,
    InputArea,
    InputGroup,
    Label,
    LayerCard,
    Link,
    Loader,
    Meter,
    Pagination,
    Popover,
    Radio,
    Select,
    SensitiveInput,
    Switch,
    SwitchGroup,
    SwitchItem,
    SwitchLegend,
    Table,
    TableOfContents,
    Tabs,
    Text,
    Toasty,
    Tooltip
  } from '$lib';
  import { ChevronRight, Copy, Download, Search, Settings, Trash2 } from '@lucide/svelte';
  import ChartDemos from './chart-demos/ChartDemos.svelte';

  interface Props {
    demo: string;
  }

  let { demo }: Props = $props();
  let switchBasicChecked = $state(false);
  let switchNeutralChecked = $state(false);
  let switchCustomIdChecked = $state(false);

  const selectOptions = [
    { label: 'Workers', value: 'workers' },
    { label: 'Pages', value: 'pages' },
    { label: 'R2', value: 'r2' },
    { label: 'D1', value: 'd1', disabled: true }
  ];

  let menuItems = $derived([
    { label: 'View details' },
    { label: 'Edit settings' },
    { label: 'Delete', disabled: demo.includes('Disabled') }
  ]);

  const breadcrumbItems = [
    { label: 'Account', href: '/' },
    { label: 'Workers', href: '/' },
    { label: 'api-edge' }
  ];

  const tocItems = [
    { href: '#overview', title: 'Overview', depth: 1 },
    { href: '#usage', title: 'Usage', depth: 1 },
    { href: '#api', title: 'API reference', depth: 1 }
  ];

  const tableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'requests', label: 'Requests' }
  ];

  const tableRows = [
    { name: 'api-edge', status: 'Healthy', requests: '1.2M' },
    { name: 'checkout', status: 'Deploying', requests: '84K' },
    { name: 'webhooks', status: 'Paused', requests: '19K' }
  ];

  const radioOptions = [
    { label: 'Production', value: 'production', description: 'Route live traffic.' },
    { label: 'Preview', value: 'preview', description: 'Test before release.' },
    { label: 'Disabled', value: 'disabled', disabled: true }
  ];

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'settings', label: 'Settings' },
    { value: 'logs', label: 'Logs' }
  ];

  const looksLike = (prefix: string) => demo.toLowerCase().startsWith(prefix.toLowerCase());
  const chartDemoNames = new Set([
    'BasicLineChartDemo',
    'BarChartDemo',
    'CategoricalBarChartDemo',
    'CategoricalDonutChartDemo',
    'CategoricalLineChartDemo',
    'ChartColorSystemsDemo',
    'ChartExampleDemo',
    'CustomAxisLabelFormatDemo',
    'CustomTooltipChartDemo',
    'GradientLineChartDemo',
    'IncompleteDataChartDemo',
    'LegendCompactDemo',
    'LegendDefaultDemo',
    'LoadingChartDemo',
    'PieChartDemo',
    'PieChartPreviewDemo',
    'SankeyChartBasicDemo',
    'SankeyChartDrillDownDemo',
    'SankeyChartFullWidthDemo',
    'SankeyChartInteractiveDemo',
    'SankeyChartMultiLevelDemo',
    'SankeyChartPreviewDemo',
    'SankeyChartRichTooltipDemo',
    'SankeyChartTooltipDemo',
    'TimeRangeSelectionChartDemo',
    'TimeseriesChartPreviewDemo'
  ]);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  {#if chartDemoNames.has(demo) || looksLike('Chart') || looksLike('Categorical') || looksLike('Sankey') || looksLike('Timeseries') || looksLike('Pie')}
    <ChartDemos {demo} />
  {:else if looksLike('Button')}
    <div class="flex flex-wrap items-center justify-center gap-3">
      <Button variant={demo.includes('Primary') ? 'primary' : demo.includes('Ghost') ? 'ghost' : demo.includes('Destructive') ? 'destructive' : demo.includes('Outline') ? 'outline' : 'secondary'} size={demo.includes('Sizes') ? 'sm' : 'base'} loading={demo.includes('Loading')} disabled={demo.includes('Disabled')}>
        {#if demo.includes('Icon')}<Download class="size-4" aria-hidden="true" />{/if}
        {demo.includes('IconOnly') ? '' : 'Deploy worker'}
      </Button>
      {#if demo.includes('Sizes')}
        <Button size="xs">Extra small</Button>
        <Button size="lg" variant="primary">Large</Button>
      {/if}
    </div>
  {:else if looksLike('Badge')}
    <div class="flex flex-wrap justify-center gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="blue">Workers</Badge>
    </div>
  {:else if looksLike('Banner')}
    <Banner variant={demo.includes('Error') ? 'error' : demo.includes('Alert') ? 'alert' : 'default'} title="Deployment ready" description="Your worker was built and is ready to receive traffic." />
  {:else if looksLike('Breadcrumbs')}
    <Breadcrumbs items={breadcrumbItems} />
  {:else if looksLike('Checkbox')}
    <div class="grid gap-3">
      <Checkbox checked={true}>Enable automatic deployments</Checkbox>
      <Checkbox disabled={demo.includes('Disabled')}>Require approval</Checkbox>
    </div>
  {:else if looksLike('ClipboardText')}
    <ClipboardText value="wrangler deploy --env production" />
  {:else if looksLike('CodeHighlighted') || looksLike('Code')}
    <Code>{`import { Button } from 'kumo-svelte';\n\n<Button variant="primary">Deploy</Button>`}</Code>
  {:else if looksLike('Collapsible')}
    <Collapsible open={demo.includes('Hero') || demo.includes('Basic')}>
      {#snippet trigger()}Build details{/snippet}
      <p class="text-sm text-kumo-subtle">Dependencies installed, routes generated, and static assets uploaded.</p>
    </Collapsible>
  {:else if looksLike('Combobox') || looksLike('Autocomplete')}
    <Combobox options={selectOptions} placeholder="Select product" />
  {:else if looksLike('CommandPalette')}
    <CommandPalette commands={[{ label: 'Open dashboard' }, { label: 'Deploy project' }, { label: 'View logs' }, { label: 'Manage domains' }]} />
  {:else if looksLike('DatePicker')}
    <Input type="date" class="max-w-52" />
  {:else if looksLike('Dialog')}
    <Dialog title="Delete deployment" description="This action cannot be undone.">
      {#snippet trigger()}<span class="inline-flex h-9 cursor-pointer items-center rounded-lg bg-kumo-danger px-3 text-base font-medium text-white shadow-xs">Open dialog</span>{/snippet}
      <div class="flex justify-end gap-2"><Button>Cancel</Button><Button variant="destructive">Delete</Button></div>
    </Dialog>
  {:else if looksLike('Dropdown')}
    <DropdownMenu items={menuItems}>
      {#snippet trigger()}Actions{/snippet}
    </DropdownMenu>
  {:else if looksLike('Empty')}
    <Empty title="No deployments" description="Create a deployment to see it here." />
  {:else if looksLike('Flow')}
    <div class="flex items-center gap-3 text-sm">
      <div class="rounded-lg border border-kumo-hairline bg-kumo-base px-3 py-2">Queued</div>
      <ChevronRight class="size-4 text-kumo-muted" aria-hidden="true" />
      <div class="rounded-lg border border-kumo-hairline bg-kumo-base px-3 py-2">Build</div>
      <ChevronRight class="size-4 text-kumo-muted" aria-hidden="true" />
      <div class="rounded-lg border border-kumo-hairline bg-kumo-base px-3 py-2">Deploy</div>
    </div>
  {:else if looksLike('Grid')}
    <Grid class="w-full max-w-xl" cols={demo.includes('Asymmetric') ? 3 : 2}>
      <LayerCard><div class="text-xs text-kumo-muted">Requests</div><div class="mt-1 text-lg font-semibold">1.2M</div></LayerCard>
      <LayerCard><div class="text-xs text-kumo-muted">Errors</div><div class="mt-1 text-lg font-semibold">0.03%</div></LayerCard>
      <LayerCard><div class="text-xs text-kumo-muted">Latency</div><div class="mt-1 text-lg font-semibold">42ms</div></LayerCard>
    </Grid>
  {:else if looksLike('InputArea')}
    <InputArea placeholder="Describe the rollout..." rows={4} />
  {:else if looksLike('InputGroup')}
    <InputGroup>
      <Search class="size-4 text-kumo-muted" aria-hidden="true" />
      <Input placeholder="Search resources" />
      <Button size="sm">Search</Button>
    </InputGroup>
  {:else if looksLike('Input')}
    <div class="w-full max-w-sm space-y-2">
      <Label for="demo-input">Project name</Label>
      <Input id="demo-input" placeholder="kumo-svelte" invalid={demo.includes('Error')} disabled={demo.includes('Disabled')} />
    </div>
  {:else if looksLike('Label')}
    <div class="w-full max-w-sm space-y-2">
      <Label for="label-demo">API token</Label>
      <Input id="label-demo" placeholder="Enter token" />
    </div>
  {:else if looksLike('LayerCard')}
    <LayerCard>
      <div class="text-xs text-kumo-muted">Worker requests</div>
      <div class="mt-1 text-2xl font-semibold">8.4M</div>
      <div class="mt-2 text-sm text-kumo-success">+12% from last week</div>
    </LayerCard>
  {:else if looksLike('Link')}
    <Text>Read the <Link href="/installation">installation guide</Link> before deploying.</Text>
  {:else if looksLike('Loader')}
    <Loader />
  {:else if looksLike('MenuBar')}
    <div class="flex items-center gap-1 rounded-lg bg-kumo-fill p-1">
      <Button size="sm" variant="ghost">File</Button>
      <Button size="sm" variant="ghost">Edit</Button>
      <Button size="sm" variant="ghost">View</Button>
    </div>
  {:else if looksLike('Meter')}
    <Meter value={demo.includes('Full') ? 100 : demo.includes('Low') ? 18 : 64} label="CPU usage" />
  {:else if looksLike('Pagination')}
    <Pagination page={demo.includes('Mid') ? 6 : 1} pages={12} />
  {:else if looksLike('Popover')}
    <Popover title="Deployment status" description="Deployments usually complete in under one minute.">
      {#snippet trigger()}<span class="inline-flex h-9 cursor-pointer items-center rounded-lg bg-kumo-base px-3 text-base font-medium text-kumo-default shadow-xs ring ring-kumo-hairline">Show status</span>{/snippet}
    </Popover>
  {:else if looksLike('Radio')}
    <Radio options={radioOptions} value="production" />
  {:else if looksLike('ResourceList')}
    <div class="w-full max-w-xl divide-y divide-kumo-hairline rounded-lg border border-kumo-hairline bg-kumo-base">
      {#each ['api-edge', 'checkout-worker', 'image-resizer'] as item}
        <div class="flex items-center justify-between px-4 py-3">
          <span class="font-mono text-sm">{item}</span>
          <Badge variant="success">Active</Badge>
        </div>
      {/each}
    </div>
  {:else if looksLike('DeleteResource')}
    <div class="flex items-center gap-3">
      <Button variant="destructive"><Trash2 class="size-4" aria-hidden="true" /> Delete resource</Button>
      <Button>Cancel</Button>
    </div>
  {:else if looksLike('Select')}
    <Select class="max-w-64" options={selectOptions} placeholder="Select service" />
  {:else if looksLike('SensitiveInput')}
    <SensitiveInput value="sk_live_••••••••••••" />
  {:else if looksLike('SkeletonLine')}
    <div class="w-full max-w-sm space-y-3">
      <div class="h-2 w-full animate-pulse rounded bg-kumo-fill"></div>
      <div class="h-2 w-3/4 animate-pulse rounded bg-kumo-fill"></div>
      <div class="h-2 w-1/2 animate-pulse rounded bg-kumo-fill"></div>
    </div>
  {:else if demo === 'SwitchBasicDemo'}
    <Switch label="Switch" bind:checked={switchBasicChecked} />
  {:else if demo === 'SwitchOffDemo'}
    <Switch label="Switch" checked={false} />
  {:else if demo === 'SwitchOnDemo'}
    <Switch label="Switch" checked={true} />
  {:else if demo === 'SwitchDisabledDemo'}
    <Switch label="Disabled" checked={false} disabled />
  {:else if demo === 'SwitchNeutralDemo'}
    <Switch label="Neutral switch" variant="neutral" bind:checked={switchNeutralChecked} />
  {:else if demo === 'SwitchNeutralStatesDemo'}
    <div class="flex flex-col gap-4">
      <Switch label="Neutral off" variant="neutral" checked={false} />
      <Switch label="Neutral on" variant="neutral" checked={true} />
      <Switch label="Neutral disabled" variant="neutral" checked={false} disabled />
    </div>
  {:else if demo === 'SwitchVariantsDemo'}
    <div class="grid grid-cols-2 gap-x-8 gap-y-4">
      <Switch label="Default off" checked={false} />
      <Switch label="Default on" checked={true} />
      <Switch label="Neutral off" variant="neutral" checked={false} />
      <Switch label="Neutral on" variant="neutral" checked={true} />
    </div>
  {:else if demo === 'SwitchSizesDemo'}
    <div class="flex flex-col gap-4">
      <Switch label="Small" size="sm" checked={true} />
      <Switch label="Base (default)" size="base" checked={true} />
      <Switch label="Large" size="lg" checked={true} />
    </div>
  {:else if demo === 'SwitchCustomIdDemo'}
    <Switch id="my-custom-switch" label="Custom ID" bind:checked={switchCustomIdChecked} />
  {:else if demo === 'SwitchGroupDemo'}
    <SwitchGroup legend="Notification settings">
      <SwitchItem label="Email notifications" />
      <SwitchItem label="SMS notifications" />
      <SwitchItem label="Push notifications" />
    </SwitchGroup>
  {:else if demo === 'SwitchLegendSrOnlyDemo'}
    <SwitchGroup>
      <SwitchLegend class="sr-only">Notification settings</SwitchLegend>
      <SwitchItem label="Email notifications" />
      <SwitchItem label="SMS notifications" />
      <SwitchItem label="Push notifications" />
    </SwitchGroup>
  {:else if demo === 'SwitchLegendCustomDemo'}
    <SwitchGroup>
      <SwitchLegend class="text-sm font-normal text-kumo-subtle">Notification settings</SwitchLegend>
      <SwitchItem label="Email notifications" />
      <SwitchItem label="SMS notifications" />
      <SwitchItem label="Push notifications" />
    </SwitchGroup>
  {:else if looksLike('Switch')}
    <Switch label="Switch" checked={demo.includes('On') || demo.includes('Basic')} />
  {:else if looksLike('TableOfContents')}
    <TableOfContents items={tocItems} />
  {:else if looksLike('Table')}
    <Table>
      <thead>
        <tr>{#each tableColumns as column}<th class="px-3 py-2 text-left">{column.label}</th>{/each}</tr>
      </thead>
      <tbody>
        {#each tableRows as row}
          <tr class="border-t border-kumo-line"><td class="px-3 py-2">{row.name}</td><td class="px-3 py-2">{row.status}</td><td class="px-3 py-2">{row.requests}</td></tr>
        {/each}
      </tbody>
    </Table>
  {:else if looksLike('Tabs')}
    <Tabs items={tabs} value="overview" />
  {:else if looksLike('Text')}
    <div class="space-y-1">
      <Text variant="strong">Cloudflare dashboard typography</Text>
      <Text variant="muted">Use restrained text styles for dense operational interfaces.</Text>
    </div>
  {:else if looksLike('Toast')}
    <Toasty title="Deployment started">We will notify you when it completes.</Toasty>
  {:else if looksLike('Tooltip')}
    <Tooltip content="Copy deployment URL">
      {#snippet trigger()}<span class="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg bg-kumo-base text-kumo-default shadow-xs ring ring-kumo-hairline" aria-label="Copy URL"><Copy class="size-4" /></span>{/snippet}
    </Tooltip>
  {:else}
    <div class="flex items-center gap-2 rounded-lg border border-kumo-hairline bg-kumo-base px-4 py-3 text-sm text-kumo-subtle">
      <Settings class="size-4" aria-hidden="true" />
      <span>{demo}</span>
    </div>
  {/if}
</div>
