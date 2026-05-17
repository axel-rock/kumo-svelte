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

function specializedSnippet(demo: string) {
  switch (demo) {
    case 'CodeHighlightedBasicDemo':
      return `<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte/components/code-highlighted';
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
  import { CodeHighlighted } from 'kumo-svelte/components/code-highlighted';
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
  import { PoweredByCloudflare } from 'kumo-svelte/components/cloudflare-logo';
</script>

<PoweredByCloudflare />`;
    case 'PoweredByCloudflareVariantsDemo':
      return `<script lang="ts">
  import { PoweredByCloudflare } from 'kumo-svelte/components/cloudflare-logo';
</script>

<div class="flex flex-wrap items-center gap-4">
  <PoweredByCloudflare />
  <PoweredByCloudflare color="black" />
  <div class="rounded-lg bg-black p-3">
    <PoweredByCloudflare color="white" />
  </div>
</div>`;
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
  <thead>
    <tr><th>Subject</th><th>From</th><th>Date</th></tr>
  </thead>
  <tbody>
    {#each rows as row}
      <tr><td>{row.subject}</td><td>{row.from}</td><td>{row.date}</td></tr>
    {/each}
  </tbody>
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
  import { Grid, GridItem, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="2up" gap="base">
  <GridItem>
    <Surface class="rounded-lg p-4">
      <Text bold>Item 1</Text>
      <div class="mt-1">
        <Text variant="secondary">First grid item</Text>
      </div>
    </Surface>
  </GridItem>
  <GridItem>
    <Surface class="rounded-lg p-4">
      <Text bold>Item 2</Text>
      <div class="mt-1">
        <Text variant="secondary">Second grid item</Text>
      </div>
    </Surface>
  </GridItem>
</Grid>`;
    case 'GridVariantsDemo':
      return `<script lang="ts">
  import { Grid, GridItem, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="3up" gap="sm">
  <GridItem><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></GridItem>
  <GridItem><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></GridItem>
  <GridItem><Surface class="rounded-lg p-4 text-center"><Text>3</Text></Surface></GridItem>
</Grid>`;
    case 'GridAsymmetricDemo':
      return `<script lang="ts">
  import { Grid, GridItem, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="2-1" gap="sm">
  <GridItem>
    <Surface class="rounded-lg p-4">
      <Text bold>Main Content</Text>
      <div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div>
    </Surface>
  </GridItem>
  <GridItem>
    <Surface class="rounded-lg p-4">
      <Text bold>Sidebar</Text>
      <div class="mt-1"><Text variant="secondary">One-third width</Text></div>
    </Surface>
  </GridItem>
</Grid>`;
    case 'GridGapDemo':
      return `<script lang="ts">
  import { Grid, GridItem, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="side-by-side" gap="base">
  <GridItem><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></GridItem>
  <GridItem><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></GridItem>
</Grid>`;
    case 'GridMobileDividerDemo':
      return `<script lang="ts">
  import { Grid, GridItem, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="4up" gap="base" mobileDivider>
  {#each [1, 2, 3, 4] as item}
    <GridItem>
      <Surface class="rounded-lg p-4">
        <Text bold>Item {item}</Text>
        <div class="mt-1"><Text variant="secondary">Has divider on mobile</Text></div>
      </Surface>
    </GridItem>
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

export function getSvelteDemoSnippet(demo: string) {
  const specialized = specializedSnippet(demo);
  if (specialized) return specialized;
  const badge = badgeSnippet(demo);
  if (badge) return badge;
  const button = buttonSnippet(demo);
  if (button) return button;
  const autocomplete = autocompleteSnippet(demo);
  if (autocomplete) return autocomplete;
  const flow = flowSnippet(demo);
  if (flow) return flow;
  if (demo.includes('Chart') || demo.includes('Legend') || demo.includes('Sankey') || demo.includes('Pie') || demo.includes('Categorical') || demo.includes('Heatmap')) return chartSnippet(demo);
  return snippets[demo] ?? previewRendererSnippet(demo);
}
