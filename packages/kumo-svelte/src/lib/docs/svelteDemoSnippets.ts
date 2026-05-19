const snippets: Record<string, string> = {};

function chartSnippet(demo: string) {
  if (demo.startsWith('Sankey')) {
    return `<script lang="ts">
  import * as echarts from 'echarts';
  import { SankeyChart, ChartPalette } from 'kumo-svelte';

  const nodes = [
    { name: 'Users', value: 103600, color: ChartPalette.categorical(0) },
    { name: 'Networks', value: 84100, color: ChartPalette.categorical(1) },
    { name: 'Apps', value: 122600, color: ChartPalette.categorical(2) },
    { name: 'Tunnels', value: 87800, color: ChartPalette.categorical(3) }
  ];

  const links = [
    { source: 0, target: 2, value: 80000 },
    { source: 0, target: 3, value: 20000 },
    { source: 1, target: 2, value: 30000 },
    { source: 1, target: 3, value: 50000 }
  ];
</script>

<SankeyChart {echarts} {nodes} {links} height={350} />`;
  }

  if (demo.includes('Pie') || demo.includes('Donut')) {
    return `<script lang="ts">
  import * as echarts from 'echarts';
  import { Chart } from 'kumo-svelte';

  const options = {
    animation: true,
    animationDuration: 1200,
    tooltip: { show: true },
    series: [
      {
        type: 'pie',
        radius: ['35%', '70%'],
        data: [
          { value: 101, name: 'Series A' },
          { value: 202, name: 'Series B' },
          { value: 303, name: 'Series C' }
        ]
      }
    ]
  };
</script>

<Chart {echarts} {options} height={320} />`;
  }

  if (demo.includes('Legend')) {
    return `<script lang="ts">
  import { ChartLegend, ChartPalette } from 'kumo-svelte';
</script>

<div class="flex flex-wrap gap-4">
  <ChartLegend
    variant="large"
    name="Requests"
    color={ChartPalette.semantic('Neutral')}
    value="1,234"
    unit="req/s"
  />
  <ChartLegend
    variant="large"
    name="Storage"
    color={ChartPalette.semantic('Attention')}
    value="56"
    unit="GB"
  />
</div>`;
  }

  if (demo.includes('Color') || demo.includes('Heatmap') || demo.includes('Categorical')) {
    return `<script lang="ts">
  import * as echarts from 'echarts';
  import { Chart, ChartPalette } from 'kumo-svelte';

  const options = {
    animation: true,
    animationDuration: 900,
    color: Array.from({ length: 5 }, (_, index) => ChartPalette.categorical(index)),
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [32, 42, 36, 48, 41] }]
  };
</script>

<Chart {echarts} {options} height={320} />`;
  }

  return `<script lang="ts">
  import * as echarts from 'echarts';
  import { TimeseriesChart, ChartPalette } from 'kumo-svelte';

  const data = [
    {
      name: 'Requests',
      color: ChartPalette.semantic('Neutral'),
      data: [
        [Date.now() - 240000, 42],
        [Date.now() - 180000, 55],
        [Date.now() - 120000, 49],
        [Date.now() - 60000, 64],
        [Date.now(), 58]
      ]
    }
  ];
</script>

<TimeseriesChart {echarts} {data} xAxisName="Time (UTC)" yAxisName="Count" />`;
}

function previewRendererSnippet(demo: string) {
  return '';
}

function blockSnippet(demo: string) {
  switch (demo) {
    case 'PageHeaderHeroDemo':
      return `<script lang="ts">
  import { Breadcrumbs, Button } from 'kumo-svelte';
  import { PageHeader } from './page-header';
  import { Code, Globe, House } from 'phosphor-svelte';

  let activeTab = $state('overview');
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link icon={House} href="#">Workers & Pages</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>cloudflare-dev-platform</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  class="w-full"
  breadcrumbContent={breadcrumbs}
  tabs={[
    { label: 'Overview', value: 'overview' },
    { label: 'Metrics', value: 'metrics' },
    { label: 'Deployments', value: 'deployments' },
    { label: 'Bindings', value: 'bindings' },
    { label: 'Observability', value: 'observability' },
    { label: 'Settings', value: 'settings' }
  ]}
  defaultTab="overview"
  bind:activeTab
>
  <Button icon={Code} class="h-8">Edit code</Button>
  <Button icon={Globe} variant="primary" class="h-8">Visit</Button>
</PageHeader>`;
    case 'PageHeaderBasicDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { PageHeader } from './page-header';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>Dashboard</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader breadcrumbContent={breadcrumbs} />`;
    case 'PageHeaderWithIconsDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { PageHeader } from './page-header';
  import { Gear, House } from 'phosphor-svelte';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link icon={House} href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current icon={Gear}>Settings</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader breadcrumbContent={breadcrumbs} />`;
    case 'PageHeaderWithTabsDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { PageHeader } from './page-header';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>Settings</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  breadcrumbContent={breadcrumbs}
  tabs={[
    { label: 'General', value: 'general' },
    { label: 'Security', value: 'security' },
    { label: 'Notifications', value: 'notifications' }
  ]}
  defaultTab="general"
/>`;
    case 'PageHeaderWithActionsDemo':
      return `<script lang="ts">
  import { Breadcrumbs, Button } from 'kumo-svelte';
  import { PageHeader } from './page-header';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="#">Projects</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>My Project</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  breadcrumbContent={breadcrumbs}
  tabs={[
    { label: 'Overview', value: 'overview' },
    { label: 'Settings', value: 'settings' }
  ]}
  defaultTab="overview"
>
  <Button variant="primary" size="base">Deploy</Button>
</PageHeader>`;
    case 'PageHeaderWithTitleDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { PageHeader } from './page-header';
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

<PageHeader breadcrumbContent={breadcrumbs} title="Page title" />`;
    case 'PageHeaderWithTitleDescriptionDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { PageHeader } from './page-header';
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
  description="Action-led, value-oriented description of what this page does. Optional second sentence with use cases or prerequisites."
/>`;
    case 'PageHeaderCompleteDemo':
      return `<script lang="ts">
  import { Breadcrumbs, Button } from 'kumo-svelte';
  import { PageHeader } from './page-header';
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
</PageHeader>`;
    case 'ResourceListBasicDemo':
      return `<script lang="ts">
  import { Surface } from 'kumo-svelte';
  import { ResourceListPage } from './resource-list';
  import { Database } from 'phosphor-svelte';
</script>

<ResourceListPage
  title="Databases"
  description="Manage your database instances and configurations"
  icon={Database}
>
  <Surface class="p-6">
    <p>Main content area - your resource list would go here</p>
  </Surface>
</ResourceListPage>`;
    case 'ResourceListWithUsageDemo':
      return `<script lang="ts">
  import { Code, Surface } from 'kumo-svelte';
  import { ResourceListPage } from './resource-list';
</script>

{#snippet usage()}
  <Surface class="p-4">
    <h3 class="mb-2 font-semibold">Quick Start</h3>
    <p class="mb-3 text-sm text-kumo-subtle">Generate an API key to authenticate your requests</p>
    <Code lang="bash" code={'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com'} />
  </Surface>
{/snippet}

<ResourceListPage
  title="API Keys"
  description="Create and manage API keys for your applications"
  {usage}
>
  <Surface class="p-6">
    <p>API keys list would appear here</p>
  </Surface>
</ResourceListPage>`;
    case 'ResourceListCompleteDemo':
      return `<script lang="ts">
  import { Code, Surface } from 'kumo-svelte';
  import { ResourceListPage } from './resource-list';
  import { Database } from 'phosphor-svelte';
</script>

{#snippet usage()}
  <Surface class="p-4">
    <h3 class="mb-2 font-semibold">Usage Example</h3>
    <Code
      lang="ts"
      code={\`// Read from KV
const value = await KV.get('key');

// Write to KV
await KV.put('key', 'value');\`}
    />
  </Surface>
{/snippet}

{#snippet additionalContent()}
  <Surface class="p-4">
    <h3 class="mb-2 font-semibold">Learn More</h3>
    <p class="text-sm text-kumo-subtle">
      Check out our documentation to learn more about KV storage.
    </p>
  </Surface>
{/snippet}

<ResourceListPage
  title="KV Namespaces"
  description="Store key-value data globally with low-latency access"
  icon={Database}
  {usage}
  {additionalContent}
>
  <div class="space-y-4">
    <Surface class="p-6">
      <h4 class="mb-2 font-semibold">production-kv</h4>
      <p class="text-sm text-kumo-subtle">Created 2 days ago</p>
    </Surface>
    <Surface class="p-6">
      <h4 class="mb-2 font-semibold">staging-kv</h4>
      <p class="text-sm text-kumo-subtle">Created 1 week ago</p>
    </Surface>
  </div>
</ResourceListPage>`;
    case 'DeleteResourceBasicDemo':
    case 'DeleteResourceWorkerDemo':
    case 'DeleteResourceErrorDemo': {
      const worker = demo === 'DeleteResourceWorkerDemo';
      const error = demo === 'DeleteResourceErrorDemo';
      return `<script lang="ts">
  import { Button } from 'kumo-svelte';
  import { DeleteResource } from './delete-resource';

  let open = $state(false);
  let isDeleting = $state(false);
  let errorMessage = $state('');

  async function handleDelete() {
    ${error ? `errorMessage = '';` : ''}
    isDeleting = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    isDeleting = false;
    ${error ? `errorMessage = 'Something went wrong';` : `open = false;`}
  }
</script>

<Button variant="destructive" onclick={() => (open = true)}>
  ${worker ? 'Delete Worker' : 'Delete Zone'}
</Button>

<DeleteResource
  bind:open
  onOpenChange={(nextOpen) => (open = nextOpen)}
  resourceType="${worker ? 'Worker' : 'Zone'}"
  resourceName="${worker ? 'api-gateway-worker' : 'example.com'}"
  onDelete={handleDelete}
  isDeleting={isDeleting}${error ? `\n  errorMessage={errorMessage}` : ''}
/>`;
    }
    default:
      return '';
  }
}

function badgeSnippet(demo: string) {
  switch (demo) {
    case 'BadgeSemanticVariantsDemo':
      return `<script lang="ts">
  import { Badge } from 'kumo-svelte';
</script>

<div class="flex flex-wrap items-center gap-2">
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="info">Info</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="beta">Beta</Badge>
</div>`;
    case 'BadgeColorVariantsDemo':
      return `<script lang="ts">
  import { Badge } from 'kumo-svelte';
</script>

<div class="flex flex-wrap items-center gap-2">
  <Badge variant="neutral">Neutral</Badge>
  <Badge variant="red">Red</Badge>
  <Badge variant="orange">Orange</Badge>
  <Badge variant="green">Green</Badge>
  <Badge variant="teal">Teal</Badge>
  <Badge variant="blue">Blue</Badge>
  <Badge variant="purple">Purple</Badge>
</div>`;
    case 'BadgeInSentenceDemo':
      return `<script lang="ts">
  import { Badge } from 'kumo-svelte';
</script>

<p class="flex items-center gap-2">
  Workers
  <Badge variant="secondary">New</Badge>
</p>`;
    default:
      return '';
  }
}

function buttonSnippet(demo: string) {
  const variants: Record<string, { variant: string; label: string }> = {
    ButtonPrimaryDemo: { variant: 'primary', label: 'Primary' },
    ButtonSecondaryDemo: { variant: 'secondary', label: 'Secondary' },
    ButtonGhostDemo: { variant: 'ghost', label: 'Ghost' },
    ButtonDestructiveDemo: { variant: 'destructive', label: 'Destructive' },
    ButtonOutlineDemo: { variant: 'outline', label: 'Outline' },
    ButtonSecondaryDestructiveDemo: { variant: 'secondary-destructive', label: 'Secondary destructive' }
  };

  if (demo in variants) {
    const { variant, label } = variants[demo];
    return `<script lang="ts">
  import { Button } from 'kumo-svelte';
</script>

<Button variant="${variant}">${label}</Button>`;
  }

  switch (demo) {
    case 'ButtonSizesDemo':
      return `<script lang="ts">
  import { Button } from 'kumo-svelte';
</script>

<div class="flex flex-wrap items-center gap-2">
  <Button size="xs">Extra small</Button>
  <Button size="sm">Small</Button>
  <Button size="base">Base</Button>
  <Button size="lg">Large</Button>
</div>`;
    case 'ButtonWithIconDemo':
      return `<script lang="ts">
  import { Button } from 'kumo-svelte';
  import { Plus } from 'phosphor-svelte';
</script>

<Button>
  <Plus class="size-4" />
  Create Worker
</Button>`;
    case 'ButtonIconOnlyDemo':
      return `<script lang="ts">
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
</div>`;
    case 'ButtonLoadingDemo':
      return `<script lang="ts">
  import { Button } from 'kumo-svelte';
</script>

<Button variant="primary" loading>Loading...</Button>`;
    case 'ButtonDisabledDemo':
      return `<script lang="ts">
  import { Button } from 'kumo-svelte';
</script>

<Button variant="secondary" disabled>Disabled</Button>`;
    case 'ButtonTitleDemo':
      return `<script lang="ts">
  import { Button } from 'kumo-svelte';
  import { Plus } from 'phosphor-svelte';
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button variant="secondary" title="Create a new Worker">Create Worker</Button>
  <Button variant="secondary" shape="square" aria-label="Add item" title="Add item">
    <Plus class="size-4" />
  </Button>
</div>`;
    case 'ButtonLinkAsButtonDemo':
      return `<script lang="ts">
  import { Button } from 'kumo-svelte';
  import { ExternalLink } from 'phosphor-svelte';
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button href="/components/link" variant="secondary">Read Link docs</Button>
  <Button href="https://developers.cloudflare.com" variant="ghost">
    Cloudflare Docs <ExternalLink class="size-4" />
  </Button>
</div>`;
    default:
      return '';
  }
}

function switchSnippet(demo: string) {
  switch (demo) {
    case 'SwitchBasicDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';

  let checked = $state(false);
</script>

<Switch label="Switch" bind:checked />`;
    case 'SwitchOffDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<Switch label="Switch" checked={false} />`;
    case 'SwitchOnDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<Switch label="Switch" checked={true} />`;
    case 'SwitchDisabledDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<Switch label="Disabled" checked={false} disabled />`;
    case 'SwitchNeutralDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';

  let checked = $state(false);
</script>

<Switch label="Neutral switch" variant="neutral" bind:checked />`;
    case 'SwitchNeutralStatesDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<div class="flex flex-col gap-4">
  <Switch label="Neutral off" variant="neutral" checked={false} />
  <Switch label="Neutral on" variant="neutral" checked={true} />
  <Switch label="Neutral disabled" variant="neutral" checked={false} disabled />
</div>`;
    case 'SwitchVariantsDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<div class="grid grid-cols-2 gap-x-8 gap-y-4">
  <Switch label="Default off" checked={false} />
  <Switch label="Default on" checked={true} />
  <Switch label="Neutral off" variant="neutral" checked={false} />
  <Switch label="Neutral on" variant="neutral" checked={true} />
</div>`;
    case 'SwitchSizesDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<div class="flex flex-col gap-4">
  <Switch label="Small" size="sm" checked={true} />
  <Switch label="Base (default)" size="base" checked={true} />
  <Switch label="Large" size="lg" checked={true} />
</div>`;
    case 'SwitchCustomIdDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';

  let checked = $state(false);
</script>

<Switch id="my-custom-switch" label="Custom ID" bind:checked />`;
    case 'SwitchGroupDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<Switch.Group legend="Notification settings">
  <Switch.Item label="Email notifications" />
  <Switch.Item label="SMS notifications" />
  <Switch.Item label="Push notifications" />
</Switch.Group>`;
    case 'SwitchLegendSrOnlyDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<Switch.Group>
  <Switch.Legend class="sr-only">Notification settings</Switch.Legend>
  <Switch.Item label="Email notifications" />
  <Switch.Item label="SMS notifications" />
  <Switch.Item label="Push notifications" />
</Switch.Group>`;
    case 'SwitchLegendCustomDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';
</script>

<Switch.Group>
  <Switch.Legend class="text-sm font-normal text-kumo-subtle">
    Notification settings
  </Switch.Legend>
  <Switch.Item label="Email notifications" />
  <Switch.Item label="SMS notifications" />
  <Switch.Item label="Push notifications" />
</Switch.Group>`;
    default:
      return '';
  }
}

function autocompleteSnippet(demo: string) {
  const fruits = `const fruits = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cantaloupe',
  'Cherry',
  'Coconut',
  'Cranberry',
  'Date',
  'Dragon Fruit',
  'Fig',
  'Grape',
  'Grapefruit',
  'Guava',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Lime',
  'Lychee',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
  'Passion Fruit',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Raspberry',
  'Strawberry',
  'Watermelon'
];`;

  const countries = `const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' },
  { label: 'India', value: 'in' },
  { label: 'Brazil', value: 'br' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' }
];`;

  switch (demo) {
    case 'AutocompleteDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${fruits}
</script>

<Autocomplete items={fruits}>
  <Autocomplete.InputGroup placeholder="Search fruits…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#snippet children(item)}
        <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
      {/snippet}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete>`;
    case 'AutocompleteWithFieldDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${countries}
</script>

<div class="w-80">
  <Autocomplete
    items={countries}
    label="Country"
    description="Start typing to filter countries"
  >
    <Autocomplete.InputGroup placeholder="Search countries…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</div>`;
    case 'AutocompleteErrorDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${countries}
</script>

<div class="w-80">
  <Autocomplete
    items={countries}
    label="Country"
    error={{ message: 'Please enter a valid country', match: true }}
  >
    <Autocomplete.InputGroup placeholder="Search countries…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</div>`;
    case 'AutocompleteGroupedDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  const servers = [
    {
      label: 'North America',
      value: 'North America',
      items: [
        { label: 'US East (Virginia)', value: 'us-east-1' },
        { label: 'US West (Oregon)', value: 'us-west-2' },
        { label: 'Canada (Central)', value: 'ca-central-1' }
      ]
    },
    {
      label: 'Europe',
      value: 'Europe',
      items: [
        { label: 'EU West (Ireland)', value: 'eu-west-1' },
        { label: 'EU Central (Frankfurt)', value: 'eu-central-1' },
        { label: 'EU North (Stockholm)', value: 'eu-north-1' }
      ]
    },
    {
      label: 'Asia Pacific',
      value: 'Asia Pacific',
      items: [
        { label: 'AP Southeast (Singapore)', value: 'ap-southeast-1' },
        { label: 'AP Northeast (Tokyo)', value: 'ap-northeast-1' },
        { label: 'AP South (Mumbai)', value: 'ap-south-1' }
      ]
    }
  ];
</script>

<Autocomplete items={servers}>
  <Autocomplete.InputGroup placeholder="Select region…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#snippet children(group)}
        <Autocomplete.Group items={group.items}>
          <Autocomplete.GroupLabel>{group.label}</Autocomplete.GroupLabel>
          <Autocomplete.Collection>
            {#snippet children(item)}
              <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
            {/snippet}
          </Autocomplete.Collection>
        </Autocomplete.Group>
      {/snippet}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete>`;
    case 'AutocompleteSizesDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${fruits}
</script>

<div class="flex flex-wrap items-center gap-4">
  <Autocomplete items={fruits.slice(0, 10)}>
    <Autocomplete.InputGroup size="xs" placeholder="xs" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruits.slice(0, 10)}>
    <Autocomplete.InputGroup size="sm" placeholder="sm" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruits.slice(0, 10)}>
    <Autocomplete.InputGroup size="base" placeholder="base (default)" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruits.slice(0, 10)}>
    <Autocomplete.InputGroup size="lg" placeholder="lg" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</div>`;
    case 'AutocompleteControlledDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${fruits}

  let value = $state('');
</script>

<div class="flex w-80 flex-col gap-3">
  <Autocomplete bind:value items={fruits}>
    <Autocomplete.InputGroup placeholder="Type a fruit…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  {#if value}
    <p class="text-sm text-kumo-subtle">
      Value: <span class="font-medium text-kumo-default">{value}</span>
    </p>
  {/if}
</div>`;
    case 'ComboboxDemo':
      return `<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  ${fruits}

  let value = $state<string | null>('Apple');
</script>

<Combobox bind:value items={fruits}>
  <Combobox.TriggerInput placeholder="Please select" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(item)}
        <Combobox.Item value={item}>{item}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>`;
    case 'ComboboxSearchableInsideDemo':
    case 'ComboboxSearchableSelectDemo':
      return `<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' },
    { value: 'de', label: 'German', emoji: 'DE' },
    { value: 'es', label: 'Spanish', emoji: 'ES' }
  ];

  let value = $state${demo === 'ComboboxSearchableSelectDemo' ? '<any>(null)' : '<any>(languages[0])'};
</script>

<Combobox bind:value items={languages}>
  <Combobox.TriggerValue class="w-[200px]"${demo === 'ComboboxSearchableSelectDemo' ? ' placeholder="Select a language"' : ''} />
  <Combobox.Content>
    <Combobox.Input placeholder="Search languages" />
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(item)}
        <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>`;
    case 'ComboboxGroupedDemo':
      return `<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  const servers = [
    { value: 'Asia', items: [{ label: 'Japan', value: 'japan' }, { label: 'Singapore', value: 'singapore' }] },
    { value: 'Europe', items: [{ label: 'Germany', value: 'germany' }, { label: 'France', value: 'france' }] }
  ];
</script>

<Combobox items={servers}>
  <Combobox.TriggerInput class="w-[200px]" placeholder="Select server" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(group)}
        <Combobox.Group items={group.items}>
          <Combobox.GroupLabel>{group.value}</Combobox.GroupLabel>
          <Combobox.Collection>
            {#snippet children(item)}
              <Combobox.Item value={item}>{item.label}</Combobox.Item>
            {/snippet}
          </Combobox.Collection>
        </Combobox.Group>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>`;
    case 'ComboboxMultipleDemo':
      return `<script lang="ts">
  import { Button, Combobox, Text } from 'kumo-svelte';

  const bots = [
    { value: 'googlebot', label: 'Googlebot', author: 'Google' },
    { value: 'bingbot', label: 'Bingbot', author: 'Microsoft' }
  ];

  let value = $state<any[]>([]);
</script>

<div class="flex gap-2">
  <Combobox bind:value items={bots} multiple>
    <Combobox.TriggerMultipleWithInput class="w-[400px]" placeholder="Select bots">
      {#snippet children(selected)}
        <Combobox.Chip value={selected}>{selected.label}</Combobox.Chip>
      {/snippet}
    </Combobox.TriggerMultipleWithInput>
    <Combobox.Content class="max-h-[200px] min-w-auto overflow-y-auto">
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>
            <div class="flex gap-2">
              <Text>{item.label}</Text>
              <Text variant="secondary">{item.author}</Text>
            </div>
          </Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
  <Button variant="primary">Submit</Button>
</div>`;
    case 'ComboboxWithFieldDemo':
    case 'ComboboxErrorDemo':
      return `<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  const databases = [
    { value: 'postgres', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'redis', label: 'Redis' }
  ];
</script>

<div class="w-80">
  <Combobox
    items={databases}
    label="Database"
    ${demo === 'ComboboxWithFieldDemo' ? 'description="Select your preferred database"' : 'error={{ message: "Please select a database", match: true }}'}
  >
    <Combobox.TriggerInput placeholder="Select database" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>`;
    case 'ComboboxDisabledDemo':
      return `<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  ${fruits}

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' }
  ];
</script>

<div class="flex flex-wrap items-start gap-4">
  <Combobox value="Apple" items={fruits} disabled>
    <Combobox.TriggerInput class="w-[200px]" placeholder="Select fruit" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>

  <Combobox value={languages[0]} items={languages} disabled>
    <Combobox.TriggerValue class="w-[200px]" />
    <Combobox.Content>
      <Combobox.Input placeholder="Search" />
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>`;
    case 'ComboboxDisabledItemsDemo':
      return `<script lang="ts">
  import { Combobox, Text } from 'kumo-svelte';

  const items = [
    { value: 'postgres', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'mariadb', label: 'MariaDB', disabled: true, reason: 'Beta' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'cassandra', label: 'Apache Cassandra', disabled: true, reason: 'Coming soon' }
  ];
</script>

<div class="w-80">
  <Combobox items={items}>
    <Combobox.TriggerInput placeholder="Select database" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item} disabled={item.disabled}>
            <span>
              {item.label}
              {#if item.reason}
                <Text variant="secondary" size="xs" as="span"> - {item.reason}</Text>
              {/if}
            </span>
          </Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>`;
    case 'ComboboxSizesDemo':
      return `<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  ${fruits}
</script>

<div class="flex flex-wrap items-center gap-4">
  <Combobox size="sm" items={fruits.slice(0, 8)}>
    <Combobox.TriggerInput placeholder="Small (sm)" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
  <Combobox size="base" items={fruits.slice(0, 8)}>
    <Combobox.TriggerInput placeholder="Base (default)" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>`;
    case 'ComboboxSizesSearchableInsideDemo':
      return `<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' }
  ];
</script>

<div class="flex flex-wrap items-center gap-4">
  <Combobox size="sm" value={languages[0]} items={languages}>
    <Combobox.TriggerValue class="w-[160px]" />
    <Combobox.Content>
      <Combobox.Input placeholder="Search" />
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
  <Combobox size="base" value={languages[1]} items={languages}>
    <Combobox.TriggerValue class="w-[180px]" />
    <Combobox.Content>
      <Combobox.Input placeholder="Search" />
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>`;
    case 'ComboboxCustomTriggerDemo':
      return `<script lang="ts">
  import { Combobox } from 'kumo-svelte';
  import { MagnifyingGlass } from 'phosphor-svelte';

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' }
  ];

  let value = $state(languages[0]);
</script>

<Combobox bind:value items={languages}>
  <Combobox.Trigger class="rounded-md px-2 py-1 text-sm hover:bg-kumo-fill-hover">
    <Combobox.Value>
      <span class="truncate">{value.emoji} {value.label}</span>
    </Combobox.Value>
    <MagnifyingGlass class="size-3.5 shrink-0 text-kumo-subtle" />
  </Combobox.Trigger>
  <Combobox.Content>
    <Combobox.Input placeholder="Search languages" />
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(item)}
        <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>`;
    default:
      return '';
  }
}

function flowSnippet(demo: string) {
  switch (demo) {
    case 'FlowBasicDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow>
  <Flow.Node>Step 1</Flow.Node>
  <Flow.Node>Step 2</Flow.Node>
  <Flow.Node>Step 3</Flow.Node>
</Flow>`;
    case 'FlowParallelDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow>
  <Flow.Node>Start</Flow.Node>
  <Flow.Parallel>
    <Flow.Node>Branch A</Flow.Node>
    <Flow.Node>Branch B</Flow.Node>
    <Flow.Node>Branch C</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>End</Flow.Node>
</Flow>`;
    case 'FlowCustomContentDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow>
  <Flow.Node bare class="size-4 rounded-full bg-kumo-hairline" />
  <Flow.Node bare class="rounded-lg bg-kumo-contrast px-3 py-2 font-medium text-kumo-inverse">
    my-worker
  </Flow.Node>
</Flow>`;
    case 'FlowCenteredDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow align="center">
  <Flow.Node bare class="size-4 rounded-full bg-kumo-hairline" />
  <Flow.Node>my-worker</Flow.Node>
  <Flow.Node class="px-3 py-6">Taller node</Flow.Node>
</Flow>`;
    case 'FlowComplexDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow>
  <Flow.Parallel>
    <Flow.Node>HTTP Trigger</Flow.Node>
    <Flow.Node>Cron Trigger</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>Process Request</Flow.Node>
  <Flow.Parallel>
    <Flow.Node>Log Analytics</Flow.Node>
    <Flow.Node>Update Cache</Flow.Node>
    <Flow.Node>Send Notification</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>Complete</Flow.Node>
</Flow>`;
    case 'FlowAnchorDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow>
  <Flow.Node>Load balancer</Flow.Node>
  <Flow.Node bare class="overflow-hidden rounded-lg bg-kumo-overlay shadow-none ring ring-kumo-hairline">
    <div class="flex h-10 items-center px-2.5 text-kumo-subtle">my-worker</div>
    <div class="m-1.5 mt-0 rounded bg-kumo-base px-2 py-1.5 shadow ring ring-kumo-hairline">
      Bindings <span class="ml-3 inline-block w-5 text-kumo-subtle">2</span>
    </div>
  </Flow.Node>
  <Flow.Parallel>
    <Flow.Node>DATABASE</Flow.Node>
    <Flow.Node>OTHER_SERVICE</Flow.Node>
  </Flow.Parallel>
</Flow>`;
    case 'FlowPanningDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow class="max-w-full rounded-lg border border-kumo-hairline">
  <Flow.Node>Start</Flow.Node>
  <Flow.Node>Authenticate</Flow.Node>
  <Flow.Node>Validate</Flow.Node>
  <Flow.Node>Transform</Flow.Node>
  <Flow.Node>Process</Flow.Node>
  <Flow.Node>Store</Flow.Node>
  <Flow.Node>Notify</Flow.Node>
  <Flow.Node>Log</Flow.Node>
  <Flow.Node>Complete</Flow.Node>
  <Flow.Node>End</Flow.Node>
</Flow>`;
    case 'FlowDisabledDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow>
  <Flow.Node>Request</Flow.Node>
  <Flow.Parallel>
    <Flow.Node>Primary Handler</Flow.Node>
    <Flow.Node disabled>Backup Handler (disabled)</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>Response</Flow.Node>
</Flow>`;
    case 'FlowParallelAlignEndDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow>
  <Flow.Node>Start</Flow.Node>
  <Flow.Parallel align="end">
    <Flow.Node>Short</Flow.Node>
    <Flow.Node>Medium Length</Flow.Node>
    <Flow.Node>Very Long Node Name</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>End</Flow.Node>
</Flow>`;
    case 'FlowParallelNestedListDemo':
      return `<script lang="ts">
  import { Flow } from 'kumo-svelte';
</script>

<Flow>
  <Flow.Parallel>
    <Flow.List>
      <Flow.Node>Client Users</Flow.Node>
      <Flow.Node>Engineering Team Access</Flow.Node>
    </Flow.List>
    <Flow.List>
      <Flow.Parallel>
        <Flow.Node>All Authenticated Users</Flow.Node>
        <Flow.Node>Client Users</Flow.Node>
        <Flow.Node>Site Users</Flow.Node>
      </Flow.Parallel>
      <Flow.Node>Contractor Access</Flow.Node>
    </Flow.List>
  </Flow.Parallel>
  <Flow.Node>Destinations</Flow.Node>
</Flow>`;
    default:
      return '';
  }
}

function tabsSnippet(demo: string) {
  const items = `  const items = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' }
  ];`;

  switch (demo) {
    case 'TabsDefaultDemo':
      return `<script lang="ts">
  import { Tabs } from 'kumo-svelte';

${items}
</script>

<div class="flex flex-col gap-6">
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Segmented (default)</p>
    <Tabs variant="segmented" {items} value="tab1" />
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Underline</p>
    <Tabs variant="underline" {items} value="tab1" />
  </div>
</div>`;
    case 'TabsSegmentedDemo':
      return `<script lang="ts">
  import { Tabs } from 'kumo-svelte';

${items}
</script>

<Tabs variant="segmented" {items} value="tab1" />`;
    case 'TabsUnderlineDemo':
      return `<script lang="ts">
  import { Tabs } from 'kumo-svelte';

${items}
</script>

<Tabs variant="underline" {items} value="tab1" />`;
    case 'TabsSmDemo':
      return `<script lang="ts">
  import { Tabs } from 'kumo-svelte';

${items}
</script>

<div class="flex flex-col gap-6">
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Segmented sm</p>
    <Tabs variant="segmented" size="sm" {items} value="tab1" />
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Underline sm</p>
    <Tabs variant="underline" size="sm" {items} value="tab1" />
  </div>
</div>`;
    case 'TabsControlledDemo':
      return `<script lang="ts">
  import { Tabs } from 'kumo-svelte';

${items}
  let value = $state('tab1');
</script>

<div class="space-y-4">
  <Tabs {items} bind:value />
  <p class="text-sm text-kumo-subtle">
    Active tab: <code class="text-sm">{value}</code>
  </p>
</div>`;
    case 'TabsManyDemo':
      return `<script lang="ts">
  import { Tabs } from 'kumo-svelte';

  const items = [
    { value: 'overview', label: 'Overview' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'reports', label: 'Reports' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'settings', label: 'Settings' },
    { value: 'billing', label: 'Billing' },
    { value: 'security', label: 'Security' },
    { value: 'integrations', label: 'Integrations' }
  ];
</script>

<div class="w-full max-w-md">
  <Tabs {items} value="overview" />
</div>`;
    default:
      return '';
  }
}

function specializedSnippet(demo: string) {
  switch (demo) {
    case 'CodeHighlightedBasicDemo':
      return `<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';
</script>

<CodeHighlighted
  code={\`interface WorkerRoute {
  pattern: string;
  script: string;
}\`}
  lang="typescript"
/>`;
    case 'CodeHighlightedCopyButtonDemo':
      return `<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';
</script>

<CodeHighlighted code="npm install kumo-svelte" lang="bash" showCopyButton />`;
    case 'CloudflareLogoBasicDemo':
      return `<script lang="ts">
  import { CloudflareLogo } from 'kumo-svelte';
</script>

<CloudflareLogo class="w-72" />`;
    case 'CloudflareLogoGlyphDemo':
      return `<script lang="ts">
  import { CloudflareLogo } from 'kumo-svelte';
</script>

<CloudflareLogo variant="glyph" class="w-24" />`;
    case 'CloudflareLogoColorVariantsDemo':
      return `<script lang="ts">
  import { CloudflareLogo } from 'kumo-svelte';
</script>

<div class="flex flex-wrap items-center gap-8">
  <CloudflareLogo class="w-28" color="color" />
  <div class="rounded-lg bg-white p-4">
    <CloudflareLogo class="w-28" color="black" />
  </div>
  <div class="rounded-lg bg-black p-4">
    <CloudflareLogo class="w-28" color="white" />
  </div>
</div>`;
    case 'CloudflareLogoGlyphVariantsDemo':
      return `<script lang="ts">
  import { CloudflareLogo } from 'kumo-svelte';
</script>

<div class="flex flex-wrap items-center gap-8">
  <CloudflareLogo variant="glyph" class="w-12" color="color" />
  <div class="rounded-lg bg-white p-4">
    <CloudflareLogo variant="glyph" class="w-12" color="black" />
  </div>
  <div class="rounded-lg bg-black p-4">
    <CloudflareLogo variant="glyph" class="w-12" color="white" />
  </div>
</div>`;
    case 'CloudflareLogoSizesDemo':
      return `<script lang="ts">
  import { CloudflareLogo } from 'kumo-svelte';
</script>

<div class="flex flex-wrap items-end gap-6">
  <CloudflareLogo class="w-20" />
  <CloudflareLogo class="w-28" />
  <CloudflareLogo class="w-44" />
</div>`;
    case 'PoweredByCloudflareBasicDemo':
      return `<script lang="ts">
  import { PoweredByCloudflare } from 'kumo-svelte';
</script>

<PoweredByCloudflare />`;
    case 'PoweredByCloudflareVariantsDemo':
      return `<script lang="ts">
  import { PoweredByCloudflare } from 'kumo-svelte';
</script>

<div class="flex flex-wrap items-center gap-4">
  <PoweredByCloudflare />
  <PoweredByCloudflare color="black" />
  <div class="rounded-lg bg-black p-3">
    <PoweredByCloudflare color="white" />
  </div>
</div>`;
    case 'BreadcrumbsDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
</script>

<Breadcrumbs>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
</Breadcrumbs>`;
    case 'BreadcrumbsWithIconsDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { House } from 'phosphor-svelte';
</script>

<Breadcrumbs>
  <Breadcrumbs.Link href="#" icon={House}>Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Projects</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Current Project</Breadcrumbs.Current>
</Breadcrumbs>`;
    case 'BreadcrumbsLoadingDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { House } from 'phosphor-svelte';
</script>

<Breadcrumbs>
  <Breadcrumbs.Link href="#" icon={House}>Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current loading />
</Breadcrumbs>`;
    case 'BreadcrumbsRootDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { House } from 'phosphor-svelte';
</script>

<Breadcrumbs>
  <Breadcrumbs.Current icon={House}>Worker Analytics</Breadcrumbs.Current>
</Breadcrumbs>`;
    case 'BreadcrumbsWithClipboardDemo':
      return `<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
</script>

<Breadcrumbs>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
  <Breadcrumbs.Clipboard text="#" />
</Breadcrumbs>`;
    case 'MeterBasicDemo':
      return `<script lang="ts">
  import { Meter } from 'kumo-svelte';
</script>

<Meter label="Storage used" value={65} />`;
    case 'MeterCustomValueDemo':
      return `<script lang="ts">
  import { Meter } from 'kumo-svelte';
</script>

<Meter label="API requests" value={75} customValue="750 / 1,000" />`;
    case 'MeterHiddenValueDemo':
      return `<script lang="ts">
  import { Meter } from 'kumo-svelte';
</script>

<Meter label="Progress" value={40} showValue={false} />`;
    case 'MeterFullDemo':
      return `<script lang="ts">
  import { Meter } from 'kumo-svelte';
</script>

<Meter label="Quota reached" value={100} />`;
    case 'MeterLowDemo':
      return `<script lang="ts">
  import { Meter } from 'kumo-svelte';
</script>

<Meter label="Memory usage" value={15} />`;
    case 'DatePickerSingleDemo':
      return `<script lang="ts">
  import { DatePicker } from 'kumo-svelte';

  let date = $state<Date | undefined>();
</script>

<div class="flex flex-col gap-4">
  <DatePicker
    mode="single"
    selected={date}
    onChange={(d) => {
      if (d instanceof Date) {
        date = d;
      }
    }}
  />
  <p class="text-sm text-kumo-subtle">
    Selected: {date ? date.toLocaleDateString() : 'None'}
  </p>
</div>`;
    case 'DatePickerMultipleDemo':
      return `<script lang="ts">
  import { DatePicker } from 'kumo-svelte';

  let dates = $state<Date[] | undefined>();
</script>

<div class="flex flex-col gap-4">
  <DatePicker
    mode="multiple"
    selected={dates}
    onChange={(d) => (dates = d as Date[] | undefined)}
    max={5}
  />
  <p class="text-sm text-kumo-subtle">
    Selected: {dates?.length ?? 0} date(s)
  </p>
</div>`;
    case 'DatePickerRangeDemo':
      return `<script lang="ts">
  import { DatePicker, type DateRange } from 'kumo-svelte';

  let range = $state<DateRange | undefined>();
</script>

<div class="flex flex-col gap-4">
  <DatePicker
    mode="range"
    selected={range}
    onChange={(d) => (range = d as DateRange | undefined)}
    numberOfMonths={2}
  />
  <p class="text-sm text-kumo-subtle">
    Range: {range?.from
      ? \`\${range.from.toLocaleDateString()} - \${range.to?.toLocaleDateString() ?? '...'}\`
      : 'None'}
  </p>
</div>`;
    case 'DatePickerRangeMinMaxDemo':
      return `<script lang="ts">
  import { DatePicker, type DateRange } from 'kumo-svelte';

  let range = $state<DateRange | undefined>();
</script>

{#snippet footer()}
  <span class="text-xs text-kumo-subtle">Select 3-7 nights</span>
{/snippet}

<div class="flex flex-col gap-4">
  <DatePicker
    mode="range"
    selected={range}
    onChange={(d) => (range = d as DateRange | undefined)}
    min={3}
    max={7}
    {footer}
  />
</div>`;
    case 'DatePickerPopoverDemo':
      return `<script lang="ts">
  import { Button, DatePicker, Popover } from 'kumo-svelte';
  import { CalendarDotsIcon } from 'phosphor-svelte';

  let date = $state<Date | undefined>();
</script>

<Popover class="p-3">
  {#snippet trigger(props)}
    <Button variant="outline" icon={CalendarDotsIcon} {...props}>
      {date ? date.toLocaleDateString() : 'Pick a date'}
    </Button>
  {/snippet}

  <DatePicker mode="single" selected={date} onChange={(d) => (date = d as Date | undefined)} />
</Popover>`;
    case 'DatePickerRangePopoverDemo':
      return `<script lang="ts">
  import { Button, DatePicker, Popover, type DateRange } from 'kumo-svelte';
  import { CalendarDotsIcon } from 'phosphor-svelte';

  let range = $state<DateRange | undefined>();

  function formatRange() {
    if (!range?.from) return 'Select dates';
    if (!range.to) return range.from.toLocaleDateString();
    return \`\${range.from.toLocaleDateString()} - \${range.to.toLocaleDateString()}\`;
  }
</script>

<Popover class="p-3">
  {#snippet trigger(props)}
    <Button variant="outline" icon={CalendarDotsIcon} {...props}>
      {formatRange()}
    </Button>
  {/snippet}

  <DatePicker
    mode="range"
    selected={range}
    onChange={(d) => (range = d as DateRange | undefined)}
    numberOfMonths={2}
  />
</Popover>`;
    case 'DatePickerRangeWithPresetsDemo':
      return `<script lang="ts">
  import { Button, DatePicker, Popover, type DateRange } from 'kumo-svelte';
  import { CalendarDotsIcon } from 'phosphor-svelte';

  let range = $state<DateRange | undefined>();
  let month = $state(new Date());
  const today = new Date();

  const presets = [
    { label: 'Today', range: { from: today, to: today } },
    {
      label: 'Last 7 days',
      range: { from: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000), to: today }
    },
    {
      label: 'Last 30 days',
      range: { from: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000), to: today }
    },
    {
      label: 'Last 90 days',
      range: { from: new Date(today.getTime() - 89 * 24 * 60 * 60 * 1000), to: today }
    },
    {
      label: 'This month',
      range: { from: new Date(today.getFullYear(), today.getMonth(), 1), to: new Date(today.getFullYear(), today.getMonth() + 1, 0) }
    },
    {
      label: 'Last month',
      range: { from: new Date(today.getFullYear(), today.getMonth() - 1, 1), to: new Date(today.getFullYear(), today.getMonth(), 0) }
    }
  ];

  function formatRange() {
    if (!range?.from) return 'Select dates';
    if (!range.to) return range.from.toLocaleDateString();
    return \`\${range.from.toLocaleDateString()} - \${range.to.toLocaleDateString()}\`;
  }

  function handlePresetClick(preset: { range: DateRange }) {
    range = preset.range;
    if (preset.range.from) month = preset.range.from;
  }

  function isPresetActive(preset: { range: DateRange }) {
    if (!range?.from || !range?.to || !preset.range.from || !preset.range.to) return false;
    return range.from.toDateString() === preset.range.from.toDateString()
      && range.to.toDateString() === preset.range.to.toDateString();
  }
</script>

<Popover class="p-0">
  {#snippet trigger(props)}
    <Button variant="outline" icon={CalendarDotsIcon} {...props}>{formatRange()}</Button>
  {/snippet}

  <div class="flex">
    <div class="flex flex-col gap-1 border-r border-kumo-hairline p-2 text-sm">
      {#each presets as preset (preset.label)}
        <button
          type="button"
          onclick={() => handlePresetClick(preset)}
          class={isPresetActive(preset)
            ? 'rounded-md bg-kumo-bg-inverse px-3 py-1.5 text-left whitespace-nowrap text-kumo-text-inverse'
            : 'rounded-md px-3 py-1.5 text-left whitespace-nowrap text-kumo-subtle hover:bg-kumo-control'}
        >
          {preset.label}
        </button>
      {/each}
    </div>
    <div class="p-3">
      <DatePicker
        mode="range"
        selected={range}
        onChange={(d) => (range = d as DateRange | undefined)}
        bind:month
        numberOfMonths={2}
      />
    </div>
  </div>
</Popover>`;
    case 'DatePickerDisabledWithFooterDemo':
      return `<script lang="ts">
  import { DatePicker } from 'kumo-svelte';

  let dates = $state<Date[] | undefined>();
  const today = new Date();
  const maxDays = 5;
  const unavailableDates = [
    new Date(today.getFullYear(), today.getMonth(), 5),
    new Date(today.getFullYear(), today.getMonth(), 12),
    new Date(today.getFullYear(), today.getMonth(), 18),
    new Date(today.getFullYear(), today.getMonth(), 25)
  ];
</script>

{#snippet footer()}
  <p class="w-full pt-2 text-xs text-kumo-subtle">
    {dates?.length ?? 0}/{maxDays} days selected. Grayed dates are unavailable.
  </p>
{/snippet}

<DatePicker
  mode="multiple"
  selected={dates}
  onChange={(d) => (dates = d as Date[] | undefined)}
  max={maxDays}
  disabled={unavailableDates}
  fixedWeeks
  {footer}
/>`;
    case 'ButtonBasicDemo':
      return `<script lang="ts">
  import { Button } from 'kumo-svelte';
  import { Plus } from 'phosphor-svelte';
</script>

<div class="flex flex-wrap items-center gap-2">
  <Button variant="secondary">Button</Button>
  <Button variant="secondary" shape="square" aria-label="Add">
    <Plus class="size-4" />
  </Button>
</div>`;
    case 'InputBasicDemo':
      return `<script lang="ts">
  import { Input, Label } from 'kumo-svelte';
</script>

<div class="space-y-2">
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
  <p class="text-sm text-kumo-subtle">We'll never share your email</p>
</div>`;
    case 'LabelBasicDemo':
      return `<script lang="ts">
  import { Label } from 'kumo-svelte';
</script>

<div class="flex flex-col gap-4">
  <Label>Default Label</Label>
  <Label showOptional>Optional Label</Label>
  <Label tooltip="More information about this field">
    Label with Tooltip
  </Label>
</div>`;
    case 'LabelOptionalFieldDemo':
      return `<script lang="ts">
  import { Input } from 'kumo-svelte';
</script>

<Input label="Phone Number" required={false} placeholder="+1 555-0000" />`;
    case 'LabelWithTooltipDemo':
      return `<script lang="ts">
  import { Input } from 'kumo-svelte';
</script>

<Input
  label="API Key"
  labelTooltip="Find this in your dashboard settings under API > Keys"
  placeholder="sk_live_..."
/>`;
    case 'LabelReactNodeDemo':
    case 'LabelSnippetDemo':
      return `<script lang="ts">
  import { Checkbox } from 'kumo-svelte';
</script>

<Checkbox>
  I agree to the <strong>Terms of Service</strong>
</Checkbox>`;
    case 'LabelFormMixedDemo':
      return `<script lang="ts">
  import { Input, Select } from 'kumo-svelte';

  const options = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' }
  ];
</script>

<div class="flex max-w-md flex-col gap-4">
  <Input label="Full Name" placeholder="John Doe" />
  <Input
    label="Email"
    labelTooltip="We'll send your receipt here"
    placeholder="john@example.com"
    type="email"
  />
  <Input label="Company" required={false} placeholder="Acme Inc." />
  <Select label="Country" placeholder="Select a country" {options} />
</div>`;
    case 'LabelStandaloneDemo':
      return `<script lang="ts">
  import { Label } from 'kumo-svelte';
</script>

<div class="flex flex-col gap-3">
  <Label>Default</Label>
  <Label showOptional>Optional</Label>
  <Label tooltip="Important field">With Tooltip</Label>
</div>`;
    case 'CheckboxBasicDemo':
      return `<script lang="ts">
  import { Checkbox } from 'kumo-svelte';
</script>

<Checkbox>Accept terms and conditions</Checkbox>`;
    case 'SelectBasicDemo':
      return `<script lang="ts">
  import { Select, Label } from 'kumo-svelte';

  let value = $state('apple');
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' }
  ];
</script>

<div class="space-y-2">
  <Label>Favorite Fruit</Label>
  <Select bind:value {options} />
</div>`;
    case 'SwitchBasicDemo':
      return `<script lang="ts">
  import { Switch } from 'kumo-svelte';

  let checked = $state(false);
</script>

<Switch label="Switch" bind:checked />`;
    case 'TableBasicDemo':
      return `<script lang="ts">
  import { Table } from 'kumo-svelte';

  const rows = [
    { subject: 'Kumo v1.0.0 released', from: 'Visal In', date: '5 seconds ago' },
    { subject: 'New Job Offer', from: 'Cloudflare', date: '10 minutes ago' }
  ];
</script>

<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Subject</Table.Head>
      <Table.Head>From</Table.Head>
      <Table.Head>Date</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each rows as row}
      <Table.Row>
        <Table.Cell>{row.subject}</Table.Cell>
        <Table.Cell>{row.from}</Table.Cell>
        <Table.Cell>{row.date}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table>`;
    case 'CodeBasicDemo':
      return `<script lang="ts">
  import { Code } from 'kumo-svelte';
</script>

<Code>
{` + "`" + `import { Button } from 'kumo-svelte';

<Button variant="primary">Deploy</Button>` + "`" + `}
</Code>`;
    case 'TextVariantsDemo':
      return `<script lang="ts">
  import { Text } from 'kumo-svelte';
</script>

<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="heading1" as="h1">Heading 1</Text>
    <Text variant="mono-secondary">text-3xl (30px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="heading2" as="h2">Heading 2</Text>
    <Text variant="mono-secondary">text-2xl (24px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="heading3" as="h3">Heading 3</Text>
    <Text variant="mono-secondary">text-lg (16px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text>Body</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text bold>Body bold</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text size="lg">Body lg</Text>
    <Text variant="mono-secondary">text-lg (16px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text size="sm">Body sm</Text>
    <Text variant="mono-secondary">text-sm (13px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text size="xs">Body xs</Text>
    <Text variant="mono-secondary">text-xs (12px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="secondary">Body secondary</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="mono">Monospace</Text>
    <Text variant="mono-secondary">text-sm (13px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="mono" size="lg">Monospace lg</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="mono-secondary">Monospace secondary</Text>
    <Text variant="mono-secondary">text-sm (13px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="success">Success</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="error">Error</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
</div>`;
    case 'TextTruncateDemo':
      return `<script lang="ts">
  import { Text } from 'kumo-svelte';
</script>

<div class="w-64 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
  <Text truncate>
    This is a long piece of text that will be truncated with an ellipsis when it overflows its container.
  </Text>
</div>`;
    case 'MenuBarBasicDemo':
    case 'MenuBarTextFormattingDemo':
    case 'MenuBarNoActiveDemo':
      return `<script lang="ts">
  import { MenuBar } from 'kumo-svelte';
  import { TextB, TextItalic } from 'phosphor-svelte';

  let active = $state${demo === 'MenuBarNoActiveDemo' ? '<string | undefined>(undefined)' : '<string | undefined>("bold")'};
</script>

<MenuBar
  isActive={active}
  optionIds
  options={[
    {
      icon: TextB,
      id: "bold",
      tooltip: "Bold",
      onClick: () => (active = active === "bold" ? undefined : "bold"),
    },
    {
      icon: TextItalic,
      id: "italic",
      tooltip: "Italic",
      onClick: () => (active = active === "italic" ? undefined : "italic"),
    },
  ]}
/>`;
    case 'LoaderBasicDemo':
      return `<script lang="ts">
  import { Loader } from 'kumo-svelte';
</script>

<Loader />`;
    case 'LoaderSizesDemo':
      return `<script lang="ts">
  import { Loader } from 'kumo-svelte';
</script>

<div class="flex items-center gap-4">
  <Loader size="sm" />
  <Loader size="base" />
  <Loader size="lg" />
</div>`;
    case 'LoaderCustomSizeDemo':
      return `<script lang="ts">
  import { Loader } from 'kumo-svelte';
</script>

<Loader size={24} />`;
    case 'LoaderCustomColorDemo':
      return `<script lang="ts">
  import { Loader } from 'kumo-svelte';
</script>

<Loader class="text-kumo-subtle" />`;
    case 'SensitiveInputDemo':
      return `<script lang="ts">
  import { SensitiveInput } from 'kumo-svelte';
</script>

<div class="w-80">
  <SensitiveInput label="API Key" defaultValue="sk_live_abc123xyz789" />
</div>`;
    case 'SensitiveInputSizesDemo':
      return `<script lang="ts">
  import { SensitiveInput } from 'kumo-svelte';

  const sizes = ['xs', 'sm', 'base', 'lg'] as const;
</script>

<div class="flex flex-col gap-4">
  {#each sizes as size (size)}
    <div class="flex items-center gap-2">
      <span class="w-12 text-sm text-kumo-subtle">{size}</span>
      <SensitiveInput
        label={\`\${size} size\`}
        {size}
        defaultValue="secret-api-key-123"
      />
    </div>
  {/each}
</div>`;
    case 'SensitiveInputControlledDemo':
      return `<script lang="ts">
  import { SensitiveInput, Button } from 'kumo-svelte';

  let value = $state('my-secret-value');
</script>

<div class="flex w-80 flex-col gap-4">
  <SensitiveInput
    label="Controlled Secret"
    {value}
    onValueChange={(next) => (value = next)}
  />
  <div class="text-sm text-kumo-subtle">
    Current value: <code class="text-kumo-default">{value}</code>
  </div>
  <div class="flex gap-2">
    <Button
      onclick={() => (value = 'new-secret-' + Date.now())}
      variant="primary"
      size="sm"
    >
      Change value
    </Button>
    <Button onclick={() => (value = '')} variant="secondary" size="sm">
      Clear
    </Button>
  </div>
</div>`;
    case 'SensitiveInputStatesDemo':
      return `<script lang="ts">
  import { SensitiveInput } from 'kumo-svelte';
</script>

<div class="flex w-80 flex-col gap-4">
  <SensitiveInput
    label="Error State"
    variant="error"
    defaultValue="invalid-key"
    error="This API key is not valid"
  />
  <SensitiveInput label="Disabled" defaultValue="cannot-edit" disabled />
  <SensitiveInput
    label="Read-only"
    defaultValue="view-only-secret-key"
    readOnly
  />
  <SensitiveInput
    label="With Description"
    defaultValue="my-secret-value"
    description="Keep this value secure and don't share it"
  />
</div>`;
    case 'SkeletonLineDemo':
      return `<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte';
</script>

<div class="flex w-64 flex-col gap-3">
  <SkeletonLine />
  <SkeletonLine />
  <SkeletonLine />
</div>`;
    case 'SkeletonLineWidthDemo':
      return `<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte';
</script>

<div class="flex w-64 flex-col gap-3">
  <SkeletonLine minWidth={80} maxWidth={100} />
  <SkeletonLine minWidth={60} maxWidth={80} />
  <SkeletonLine minWidth={40} maxWidth={60} />
</div>`;
    case 'SkeletonLineHeightDemo':
      return `<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte';
</script>

<div class="flex w-64 flex-col gap-3">
  <SkeletonLine class="h-2" />
  <SkeletonLine class="h-4" />
  <SkeletonLine class="h-6" />
  <SkeletonLine class="h-8" />
</div>`;
    case 'SkeletonLineBlockHeightDemo':
      return `<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte';
</script>

<div class="flex w-64 flex-col gap-1">
  {#each [32, 48, 64] as blockHeight (blockHeight)}
    <div class="relative">
      <div class="absolute top-0 bottom-0 right-full mr-2 flex items-center border-r-2 border-kumo-fill pr-2 text-sm">
        {blockHeight}px
      </div>
      <SkeletonLine {blockHeight} />
    </div>
  {/each}
</div>`;
    case 'SkeletonLineCardDemo':
      return `<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte';
</script>

<div class="w-64 rounded-lg p-4 ring ring-kumo-hairline">
  <div class="mb-4 h-4">
    <SkeletonLine minWidth={40} maxWidth={60} />
  </div>
  <div class="flex flex-col gap-2">
    <SkeletonLine />
    <SkeletonLine />
    <SkeletonLine minWidth={50} maxWidth={70} />
  </div>
</div>`;
    case 'GridDemo':
      return `<script lang="ts">
  import { Grid, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="2up" gap="base">
  <Grid.Item>
    <Surface class="rounded-lg p-4">
      <Text bold>Item 1</Text>
      <div class="mt-1">
        <Text variant="secondary">First grid item</Text>
      </div>
    </Surface>
  </Grid.Item>
  <Grid.Item>
    <Surface class="rounded-lg p-4">
      <Text bold>Item 2</Text>
      <div class="mt-1">
        <Text variant="secondary">Second grid item</Text>
      </div>
    </Surface>
  </Grid.Item>
</Grid>`;
    case 'GridVariantsDemo':
      return `<script lang="ts">
  import { Grid, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="3up" gap="sm">
  <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></Grid.Item>
  <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></Grid.Item>
  <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>3</Text></Surface></Grid.Item>
</Grid>`;
    case 'GridAsymmetricDemo':
      return `<script lang="ts">
  import { Grid, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="2-1" gap="sm">
  <Grid.Item>
    <Surface class="rounded-lg p-4">
      <Text bold>Main Content</Text>
      <div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div>
    </Surface>
  </Grid.Item>
  <Grid.Item>
    <Surface class="rounded-lg p-4">
      <Text bold>Sidebar</Text>
      <div class="mt-1"><Text variant="secondary">One-third width</Text></div>
    </Surface>
  </Grid.Item>
</Grid>`;
    case 'GridGapDemo':
      return `<script lang="ts">
  import { Grid, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="side-by-side" gap="base">
  <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></Grid.Item>
  <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></Grid.Item>
</Grid>`;
    case 'GridMobileDividerDemo':
      return `<script lang="ts">
  import { Grid, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="4up" gap="base" mobileDivider>
  {#each [1, 2, 3, 4] as item}
    <Grid.Item>
      <Surface class="rounded-lg p-4">
        <Text bold>Item {item}</Text>
        <div class="mt-1"><Text variant="secondary">Has divider on mobile</Text></div>
      </Surface>
    </Grid.Item>
  {/each}
</Grid>`;
    case 'ToastBasicDemo':
    case 'ToastTitleOnlyDemo':
    case 'ToastDescriptionOnlyDemo':
    case 'ToastSuccessDemo':
    case 'ToastMultipleDemo':
    case 'ToastErrorDemo':
    case 'ToastWarningDemo':
    case 'ToastInfoDemo':
    case 'ToastActionsDemo':
    case 'ToastPromiseDemo':
      return `<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager)}
    <Button
      variant="${demo === 'ToastSuccessDemo' ? 'primary' : 'secondary'}"
      onclick={() =>
        toastManager.add({
          title: "${demo === 'ToastTitleOnlyDemo' ? 'Settings saved' : demo === 'ToastDescriptionOnlyDemo' ? '' : demo === 'ToastSuccessDemo' ? 'Deployed successfully' : demo === 'ToastErrorDemo' ? 'Deployment failed' : demo === 'ToastWarningDemo' ? 'Rate limit warning' : demo === 'ToastInfoDemo' ? 'New version available' : 'Toast created'}",
          description: "${demo === 'ToastTitleOnlyDemo' ? '' : demo === 'ToastDescriptionOnlyDemo' ? 'Your changes have been saved successfully.' : demo === 'ToastSuccessDemo' ? 'Your Worker is now live.' : demo === 'ToastErrorDemo' ? 'Unable to connect to the server.' : demo === 'ToastWarningDemo' ? "You're approaching your API quota." : demo === 'ToastInfoDemo' ? 'Kumo v4.2 includes performance improvements.' : 'This is a toast notification.'}",
          variant: "${demo === 'ToastSuccessDemo' ? 'success' : demo === 'ToastErrorDemo' ? 'error' : demo === 'ToastWarningDemo' ? 'warning' : demo === 'ToastInfoDemo' ? 'info' : 'default'}"
        })}
    >
      ${demo === 'ToastSuccessDemo' ? 'Deploy Worker' : demo === 'ToastMultipleDemo' ? 'Show multiple toasts' : demo === 'ToastErrorDemo' ? 'Show error toast' : demo === 'ToastWarningDemo' ? 'Show warning toast' : demo === 'ToastInfoDemo' ? 'Show info toast' : demo === 'ToastActionsDemo' ? 'Show with actions' : demo === 'ToastPromiseDemo' ? 'Deploy with promise' : demo === 'ToastTitleOnlyDemo' ? 'Title only' : demo === 'ToastDescriptionOnlyDemo' ? 'Description only' : 'Show toast'}
    </Button>
  {/snippet}
</Toasty>`;
    case 'ToastCustomContentDemo':
      return `<script lang="ts">
  import { Button, Link, Toasty } from 'kumo-svelte';
  import { CheckCircle } from 'phosphor-svelte';
</script>

<Toasty>
  {#snippet children(toastManager)}
    {#snippet content()}
      <div class="flex items-center gap-2">
        <CheckCircle class="size-4" />
        <Link href="/">my-first-worker</Link> created!
      </div>
    {/snippet}

    <Button onclick={() => toastManager.add({ content })}>Show custom content</Button>
  {/snippet}
</Toasty>`;
    default:
      return '';
  }
}

function tableOfContentsSnippet(demo: string) {
  const headings = `  const headings = [
    'Introduction',
    'Installation',
    'Usage',
    'API Reference',
    'Examples'
  ];`;

  switch (demo) {
    case 'TableOfContentsBasicDemo':
      return `<script lang="ts">
  import { TableOfContents } from 'kumo-svelte';

${headings}
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      {#each headings as heading (heading)}
        <TableOfContents.Item active={heading === 'Usage'} class="cursor-pointer">
          {heading}
        </TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
</div>`;
    case 'TableOfContentsInteractiveDemo':
      return `<script lang="ts">
  import { TableOfContents } from 'kumo-svelte';

${headings}
  let active = $state('Introduction');
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      {#each headings as heading (heading)}
        <TableOfContents.Item
          active={heading === active}
          onclick={() => (active = heading)}
          class="cursor-pointer"
        >
          {heading}
        </TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
</div>`;
    case 'TableOfContentsNoActiveDemo':
      return `<script lang="ts">
  import { TableOfContents } from 'kumo-svelte';

${headings}
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      {#each headings as heading (heading)}
        <TableOfContents.Item class="cursor-pointer">{heading}</TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
</div>`;
    case 'TableOfContentsGroupDemo':
      return `<script lang="ts">
  import { TableOfContents } from 'kumo-svelte';
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      <TableOfContents.Item active class="cursor-pointer">Overview</TableOfContents.Item>
      <TableOfContents.Group label="Examples" href="#examples-demo">
        <TableOfContents.Item class="cursor-pointer">Basic example</TableOfContents.Item>
        <TableOfContents.Item class="cursor-pointer">Advanced example</TableOfContents.Item>
      </TableOfContents.Group>
      <TableOfContents.Group label="Getting Started">
        <TableOfContents.Item class="cursor-pointer">Installation</TableOfContents.Item>
        <TableOfContents.Item class="cursor-pointer">Configuration</TableOfContents.Item>
      </TableOfContents.Group>
      <TableOfContents.Group label="API" href="#api-demo">
        <TableOfContents.Item class="cursor-pointer">Props</TableOfContents.Item>
        <TableOfContents.Item class="cursor-pointer">Events</TableOfContents.Item>
      </TableOfContents.Group>
    </TableOfContents.List>
  </TableOfContents>
</div>`;
    case 'TableOfContentsWithoutTitleDemo':
      return `<script lang="ts">
  import { TableOfContents } from 'kumo-svelte';

${headings}
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContents.List>
      {#each headings.slice(0, 3) as heading (heading)}
        <TableOfContents.Item active={heading === 'Introduction'} class="cursor-pointer">
          {heading}
        </TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
</div>`;
    case 'TableOfContentsRenderPropDemo':
      return `<script lang="ts">
  import { TableOfContents } from 'kumo-svelte';

  let clicked = $state<string | null>(null);
</script>

<div class="min-w-48 space-y-3">
  <TableOfContents>
    <TableOfContents.List>
      {#each ['Introduction', 'Installation', 'Usage'] as heading (heading)}
        <TableOfContents.Item
          as="button"
          type="button"
          active={heading === 'Introduction'}
          onclick={() => (clicked = heading)}
        >
          {heading}
        </TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
  {#if clicked}
    <p class="text-xs text-kumo-subtle">Clicked: {clicked}</p>
  {/if}
</div>`;
    default:
      return '';
  }
}

export function getSvelteDemoSnippet(demo: string) {
  const block = blockSnippet(demo);
  if (block) return block;
  const specialized = specializedSnippet(demo);
  if (specialized) return specialized;
  const tableOfContents = tableOfContentsSnippet(demo);
  if (tableOfContents) return tableOfContents;
  const badge = badgeSnippet(demo);
  if (badge) return badge;
  const button = buttonSnippet(demo);
  if (button) return button;
  const switchDemo = switchSnippet(demo);
  if (switchDemo) return switchDemo;
  const autocomplete = autocompleteSnippet(demo);
  if (autocomplete) return autocomplete;
  const flow = flowSnippet(demo);
  if (flow) return flow;
  const tabs = tabsSnippet(demo);
  if (tabs) return tabs;
  if (demo.includes('Chart') || demo.includes('Legend') || demo.includes('Sankey') || demo.includes('Pie') || demo.includes('Categorical') || demo.includes('Heatmap')) return chartSnippet(demo);
  return snippets[demo] ?? previewRendererSnippet(demo);
}
