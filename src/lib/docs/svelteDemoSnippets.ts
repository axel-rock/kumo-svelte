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
].map((fruit) => ({ label: fruit, value: fruit }));`;

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

<Autocomplete options={fruits} placeholder="Search fruits…" />`;
    case 'AutocompleteWithFieldDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${countries}
</script>

<div class="w-80">
  <Autocomplete
    options={countries}
    label="Country"
    description="Start typing to filter countries"
    placeholder="Search countries…"
  />
</div>`;
    case 'AutocompleteErrorDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${countries}
</script>

<div class="w-80">
  <Autocomplete
    options={countries}
    label="Country"
    error={{ message: 'Please enter a valid country', match: true }}
    placeholder="Search countries…"
  />
</div>`;
    case 'AutocompleteGroupedDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  const servers = [
    { label: 'US East (Virginia)', value: 'us-east-1', group: 'North America' },
    { label: 'US West (Oregon)', value: 'us-west-2', group: 'North America' },
    { label: 'Canada (Central)', value: 'ca-central-1', group: 'North America' },
    { label: 'EU West (Ireland)', value: 'eu-west-1', group: 'Europe' },
    { label: 'EU Central (Frankfurt)', value: 'eu-central-1', group: 'Europe' },
    { label: 'EU North (Stockholm)', value: 'eu-north-1', group: 'Europe' },
    { label: 'AP Southeast (Singapore)', value: 'ap-southeast-1', group: 'Asia Pacific' },
    { label: 'AP Northeast (Tokyo)', value: 'ap-northeast-1', group: 'Asia Pacific' },
    { label: 'AP South (Mumbai)', value: 'ap-south-1', group: 'Asia Pacific' }
  ];
</script>

<Autocomplete options={servers} placeholder="Select region…" />`;
    case 'AutocompleteSizesDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${fruits}
</script>

<div class="flex flex-wrap items-center gap-4">
  <Autocomplete options={fruits.slice(0, 10)} size="xs" placeholder="xs" />
  <Autocomplete options={fruits.slice(0, 10)} size="sm" placeholder="sm" />
  <Autocomplete options={fruits.slice(0, 10)} size="base" placeholder="base (default)" />
  <Autocomplete options={fruits.slice(0, 10)} size="lg" placeholder="lg" />
</div>`;
    case 'AutocompleteControlledDemo':
      return `<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  ${fruits}

  let value = $state('');
</script>

<div class="flex w-80 flex-col gap-3">
  <Autocomplete bind:value options={fruits} placeholder="Type a fruit…" />
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
  import { CalendarDate } from '@internationalized/date';
  import { DatePicker } from 'kumo-svelte';

  let value = $state(new CalendarDate(2026, 5, 16));
</script>

<DatePicker bind:value />`;
    case 'DatePickerRangeDemo':
      return `<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { DateRangePicker } from 'kumo-svelte';

  let value = $state({
    start: new CalendarDate(2026, 5, 12),
    end: new CalendarDate(2026, 5, 18)
  });
</script>

<DateRangePicker bind:value />`;
    case 'DatePickerTwoMonthsDemo':
      return `<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { DatePicker } from 'kumo-svelte';

  let value = $state(new CalendarDate(2026, 5, 16));
</script>

<DatePicker bind:value numberOfMonths={2} />`;
    case 'DatePickerDisabledDemo':
      return `<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { DatePicker } from 'kumo-svelte';

  const value = new CalendarDate(2026, 5, 16);
</script>

<DatePicker {value} disabled />`;
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
  const autocomplete = autocompleteSnippet(demo);
  if (autocomplete) return autocomplete;
  const flow = flowSnippet(demo);
  if (flow) return flow;
  if (demo.includes('Chart') || demo.includes('Legend') || demo.includes('Sankey') || demo.includes('Pie') || demo.includes('Categorical') || demo.includes('Heatmap')) return chartSnippet(demo);
  return snippets[demo] ?? previewRendererSnippet(demo);
}
