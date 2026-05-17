<script lang="ts">
  import {
    Badge,
    Banner,
    Breadcrumbs,
    Button,
    Checkbox,
    ClipboardText,
    CloudflareLogo,
    Code,
    CodeHighlighted,
    Collapsible,
    Combobox,
    CommandPalette,
    DatePicker,
    DateRangePicker,
    Dialog,
    DropdownMenu,
    Empty,
    Field,
    Flow,
    Grid,
    GridItem,
    Input,
    InputArea,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupSuffix,
    Label,
    LayerCard,
    Link,
    Loader,
    SkeletonLine,
    MenuBar,
    Meter,
    Pagination,
    Popover,
    Radio,
    Select,
    SensitiveInput,
    Surface,
    Switch,
    SwitchGroup,
    SwitchItem,
    SwitchLegend,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableOfContents,
    Tabs,
    Text,
    Toasty,
    Tooltip
  } from '$lib';
  import { CalendarDate } from '@internationalized/date';
  import { ArrowRight, ArrowSquareOut as ExternalLink, CheckCircle, Cloud, Code as Code2, Copy, Database, Download, Eye, FolderOpen, Gear as Settings, Globe, Info, LinkSimple as Link2, MagnifyingGlass as Search, Package, Plus, Question as HelpCircle, TextB as Bold, TextItalic as Italic, Trash, WarningCircle, X, XCircle } from 'phosphor-svelte';
  import { generateCloudflareLogoSvg } from '$lib/components/cloudflare-logo';
  import { PoweredByCloudflare } from '$lib/components/cloudflare-logo';
  import ChartDemos from './chart-demos/ChartDemos.svelte';

  interface Props {
    demo: string;
  }

  let { demo }: Props = $props();
  let switchBasicChecked = $state(false);
  let switchNeutralChecked = $state(false);
  let switchCustomIdChecked = $state(false);
  let menuBarActive = $state<string | undefined>('bold');
  let copiedCloudflareLogo = $state<string | undefined>();
  let datePickerValue = $state(new CalendarDate(2026, 5, 16));
  let dateRangePickerValue = $state({
    start: new CalendarDate(2026, 5, 12),
    end: new CalendarDate(2026, 5, 18)
  });

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
  const highlightedExampleCode = `interface WorkerRoute {
  pattern: string;
  script: string;
}

const route: WorkerRoute = {
  pattern: "example.com/*",
  script: "edge-api"
};`;

  const tocItems = [
    { href: '#overview', title: 'Overview', depth: 1 },
    { href: '#usage', title: 'Usage', depth: 1 },
    { href: '#api', title: 'API reference', depth: 1 }
  ];

  const gridGaps = ['none', 'sm', 'base', 'lg'] as const;
  const selectSizes = ['xs', 'sm', 'base', 'lg'] as const;

  const emailRows = [
    { subject: 'Kumo v1.0.0 released', from: 'Visal In', date: '5 seconds ago' },
    { subject: 'New Job Offer', from: 'Cloudflare', date: '10 minutes ago' },
    { subject: 'Daily Engineering Digest', from: 'WorkOS', date: '1 hour ago' }
  ];

  const radioOptions = [
    { label: 'Production', value: 'production', description: 'Route live traffic.' },
    { label: 'Preview', value: 'preview', description: 'Test before release.' },
    { label: 'Disabled', value: 'disabled', disabled: true }
  ];

  const upstreamTabs = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' }
  ];
  const manyTabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'reports', label: 'Reports' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'settings', label: 'Settings' },
    { value: 'billing', label: 'Billing' },
    { value: 'security', label: 'Security' },
    { value: 'integrations', label: 'Integrations' }
  ];

  const looksLike = (prefix: string) => demo.toLowerCase().startsWith(prefix.toLowerCase());
  const legacyRichLabelDemo = ['Input', 'Re', 'act', 'NodeLabelDemo'].join('');
  const isRichNodeLabelDemo = $derived(demo === legacyRichLabelDemo || demo === 'InputSnippetLabelDemo');
  const words = $derived(demo.replace(/Demo$/, '').replace(/([a-z])([A-Z])/g, '$1 $2'));
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

  async function copyCloudflareLogo(variant: 'glyph' | 'full') {
    await navigator.clipboard.writeText(generateCloudflareLogoSvg({ variant }));
    copiedCloudflareLogo = variant;
    setTimeout(() => {
      copiedCloudflareLogo = undefined;
    }, 2000);
  }
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  {#if chartDemoNames.has(demo) || looksLike('Chart') || looksLike('Categorical') || looksLike('Sankey') || looksLike('Timeseries') || looksLike('Pie')}
    <ChartDemos {demo} />
  {:else if demo === 'ButtonBasicDemo'}
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="secondary">Button</Button>
      <Button variant="secondary" shape="square" aria-label="Add"><Plus class="size-4" /></Button>
    </div>
  {:else if demo === 'ButtonPrimaryDemo'}
    <Button variant="primary">Primary</Button>
  {:else if demo === 'ButtonSecondaryDemo'}
    <Button variant="secondary">Secondary</Button>
  {:else if demo === 'ButtonGhostDemo'}
    <Button variant="ghost">Ghost</Button>
  {:else if demo === 'ButtonDestructiveDemo'}
    <Button variant="destructive">Destructive</Button>
  {:else if demo === 'ButtonOutlineDemo'}
    <Button variant="outline">Outline</Button>
  {:else if demo === 'ButtonSecondaryDestructiveDemo'}
    <Button variant="secondary-destructive">Secondary Destructive</Button>
  {:else if demo === 'ButtonSizesDemo'}
    <div class="flex flex-wrap items-center justify-center gap-3">
      <Button size="xs" variant="secondary">Extra Small</Button>
      <Button size="sm" variant="secondary">Small</Button>
      <Button size="base" variant="secondary">Base</Button>
      <Button size="lg" variant="secondary">Large</Button>
    </div>
  {:else if demo === 'ButtonWithIconDemo'}
    <Button variant="secondary"><Plus class="size-4" /> Create Worker</Button>
  {:else if demo === 'ButtonIconOnlyDemo'}
    <div class="flex flex-wrap items-center gap-3">
      <Button variant="secondary" shape="square" aria-label="Add item"><Plus class="size-4" /></Button>
      <Button variant="secondary" shape="circle" aria-label="Add item"><Plus class="size-4" /></Button>
    </div>
  {:else if demo === 'ButtonLoadingDemo'}
    <Button variant="primary" loading>Loading...</Button>
  {:else if demo === 'ButtonDisabledDemo'}
    <Button variant="secondary" disabled>Disabled</Button>
  {:else if demo === 'ButtonUsageDemo'}
    <Button variant="secondary">Click me</Button>
  {:else if demo === 'ButtonTitleDemo'}
    <div class="flex flex-wrap items-center gap-3">
      <Button variant="secondary" title="Create a new Worker">Create Worker</Button>
      <Button variant="secondary" shape="square" aria-label="Add item" title="Add item"><Plus class="size-4" /></Button>
    </div>
  {:else if demo === 'ButtonLinkAsButtonDemo'}
    <div class="flex flex-wrap items-center gap-3">
      <Button href="/components/link" variant="secondary">Read Link docs</Button>
      <Button href="https://developers.cloudflare.com" variant="ghost">Cloudflare Docs <ExternalLink class="size-4" /></Button>
    </div>
  {:else if looksLike('Badge')}
    {#if demo === 'BadgeInSentenceDemo'}
      <p class="text-sm text-kumo-default">Deployment <Badge variant="success">Active</Badge> is receiving traffic.</p>
    {:else if demo === 'BadgeColorVariantsDemo'}
      <div class="flex flex-wrap justify-center gap-2"><Badge variant="red">Red</Badge><Badge variant="green">Green</Badge><Badge variant="orange">Orange</Badge><Badge variant="purple">Purple</Badge><Badge variant="teal">Teal</Badge><Badge variant="blue">Blue</Badge></div>
    {:else}
      <div class="flex flex-wrap justify-center gap-2"><Badge variant="primary">Primary</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="success">Success</Badge><Badge variant="warning">Warning</Badge><Badge variant="error">Error</Badge><Badge variant="info">Info</Badge><Badge variant="outline">Outline</Badge></div>
    {/if}
  {:else if looksLike('Banner')}
    {#if demo === 'BannerVariantsDemo'}
      <div class="grid w-full max-w-xl gap-3"><Banner icon={Info} title="Default banner" description="General status message." /><Banner icon={WarningCircle} variant="alert" title="Alert banner" description="Review this before continuing." /><Banner icon={XCircle} variant="error" title="Error banner" description="Something needs attention." /></div>
    {:else if demo === 'BannerWithActionDemo' || demo === 'BannerWithActionsDemo'}
      <Banner icon={demo === 'BannerWithActionsDemo' ? WarningCircle : Info} title="Deployment ready" description="Your worker was built and is ready to receive traffic.">
        {#snippet action()}<Button size="sm" variant="secondary">View</Button>{#if demo === 'BannerWithActionsDemo'}<Button size="sm" variant="ghost">Dismiss</Button>{/if}{/snippet}
      </Banner>
    {:else if demo === 'BannerCustomContentDemo'}
      <Banner icon={Info} title="Custom content" description="Bring your own layout inside the banner." />
    {:else}
      <Banner icon={demo.includes('Error') ? XCircle : demo.includes('Alert') || demo.includes('Icon') ? WarningCircle : Info} variant={demo.includes('Error') ? 'error' : demo.includes('Alert') ? 'alert' : 'default'} title={demo.includes('Icon') ? 'New notification' : 'Deployment ready'} description="Your worker was built and is ready to receive traffic." />
    {/if}
  {:else if looksLike('Breadcrumbs')}
    {#if demo === 'BreadcrumbsLoadingDemo'}
      <Breadcrumbs><Breadcrumbs.Link href="#">Account</Breadcrumbs.Link><Breadcrumbs.Separator /><Breadcrumbs.Link href="#">Workers</Breadcrumbs.Link><Breadcrumbs.Separator /><Breadcrumbs.Current loading /></Breadcrumbs>
    {:else if demo === 'BreadcrumbsRootDemo'}
      <Breadcrumbs><Breadcrumbs.Current icon={Cloud}>Worker Analytics</Breadcrumbs.Current></Breadcrumbs>
    {:else if demo === 'BreadcrumbsWithClipboardDemo'}
      <Breadcrumbs><Breadcrumbs.Link href="#">Account</Breadcrumbs.Link><Breadcrumbs.Separator /><Breadcrumbs.Current>api-edge</Breadcrumbs.Current><Breadcrumbs.Clipboard text="/workers/api-edge" /></Breadcrumbs>
    {:else if demo === 'BreadcrumbsWithIconsDemo'}
      <Breadcrumbs><Breadcrumbs.Link href="#" icon={Globe}>Account</Breadcrumbs.Link><Breadcrumbs.Separator /><Breadcrumbs.Link href="#" icon={Cloud}>Workers</Breadcrumbs.Link><Breadcrumbs.Separator /><Breadcrumbs.Current icon={Code2}>api-edge</Breadcrumbs.Current></Breadcrumbs>
    {:else}
      <Breadcrumbs items={breadcrumbItems} />
    {/if}
  {:else if demo === 'CheckboxBasicDemo'}
    <Checkbox>Accept terms and conditions</Checkbox>
  {:else if demo === 'CheckboxDefaultDemo'}
    <Checkbox>Enable notifications</Checkbox>
  {:else if demo === 'CheckboxCheckedDemo'}
    <Checkbox checked={true}>I agree</Checkbox>
  {:else if demo === 'CheckboxIndeterminateDemo'}
    <div class="inline-flex items-center gap-2 text-sm text-kumo-default">
      <span class="flex size-4 items-center justify-center rounded-sm bg-kumo-base ring ring-kumo-line"><span class="h-0.5 w-2 rounded bg-kumo-brand"></span></span>
      Select all
    </div>
  {:else if demo === 'CheckboxLabelFirstDemo'}
    <label class="inline-flex items-center gap-2 text-sm text-kumo-default">
      Remember me
      <Checkbox />
    </label>
  {:else if demo === 'CheckboxDisabledDemo'}
    <Checkbox disabled>Disabled option</Checkbox>
  {:else if demo === 'CheckboxErrorDemo'}
    <Checkbox class="ring-kumo-danger">Invalid option</Checkbox>
  {:else if demo === 'CheckboxGroupDemo' || demo === 'CheckboxLegendSrOnlyDemo' || demo === 'CheckboxLegendCustomDemo'}
    <div class="grid gap-3">
      {#if demo !== 'CheckboxLegendSrOnlyDemo'}<p class={demo === 'CheckboxLegendCustomDemo' ? 'text-sm font-normal text-kumo-subtle' : 'text-sm font-medium text-kumo-default'}>{demo === 'CheckboxGroupDemo' ? 'Email preferences' : 'Notification preferences'}</p>{/if}
      {#if demo === 'CheckboxGroupDemo'}<p class="-mt-2 text-sm text-kumo-subtle">Choose how you'd like to receive updates</p>{/if}
      <Checkbox checked={true}>Email notifications</Checkbox>
      <Checkbox>SMS notifications</Checkbox>
      <Checkbox>Push notifications</Checkbox>
    </div>
  {:else if demo === 'CheckboxGroupErrorDemo'}
    <div class="grid gap-3">
      <p class="text-sm font-medium text-kumo-default">Required preferences</p>
      <Checkbox class="ring-kumo-danger">Email</Checkbox>
      <Checkbox class="ring-kumo-danger">SMS</Checkbox>
      <p class="text-sm text-kumo-danger">Please select at least one notification method</p>
    </div>
  {:else if looksLike('ClipboardText')}
    {#if demo === 'ClipboardTextShortDemo'}
      <ClipboardText size="sm" text="api-edge" />
    {:else if demo === 'ClipboardTextApiKeyDemo'}
      <ClipboardText text="cf_live_2xv4e7k9n8p3m6q1" />
    {:else if demo === 'ClipboardTextAlternateDemo'}
      <ClipboardText text="Production endpoint" textToCopy="https://api-edge.example.workers.dev" />
    {:else if demo === 'ClipboardTextLongDemo'}
      <ClipboardText class="max-w-md" text="https://api-edge.example.workers.dev/v1/accounts/9f3a7c1b2d4e6f8a/workers/deployments/latest" />
    {:else if demo === 'ClipboardTextTooltipDemo'}
      <ClipboardText value="wrangler deploy --env production" tooltip={{ text: 'Copy command', copiedText: 'Copied command' }} />
    {:else}
      <ClipboardText value="wrangler deploy --env production" />
    {/if}
  {:else if looksLike('CloudflareLogo') || looksLike('PoweredByCloudflare')}
    {#if demo === 'CloudflareLogoBasicDemo'}
      <CloudflareLogo class="w-72" />
    {:else if demo === 'CloudflareLogoGlyphDemo'}
      <CloudflareLogo variant="glyph" class="w-24" />
    {:else if demo === 'CloudflareLogoColorVariantsDemo'}
      <div class="flex flex-wrap items-center gap-8">
        <CloudflareLogo class="w-28" color="color" />
        <div class="rounded-lg bg-white p-4"><CloudflareLogo class="w-28" color="black" /></div>
        <div class="rounded-lg bg-black p-4"><CloudflareLogo class="w-28" color="white" /></div>
      </div>
    {:else if demo === 'CloudflareLogoGlyphVariantsDemo'}
      <div class="flex flex-wrap items-center gap-8">
        <CloudflareLogo variant="glyph" class="w-12" color="color" />
        <div class="rounded-lg bg-white p-4"><CloudflareLogo variant="glyph" class="w-12" color="black" /></div>
        <div class="rounded-lg bg-black p-4"><CloudflareLogo variant="glyph" class="w-12" color="white" /></div>
      </div>
    {:else if demo === 'CloudflareLogoSizesDemo'}
      <div class="flex flex-wrap items-end gap-6">
        <CloudflareLogo class="w-20" />
        <CloudflareLogo class="w-28" />
        <CloudflareLogo class="w-44" />
      </div>
    {:else if demo === 'CloudflareLogoCopyDemo'}
      <div class="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenu.Trigger class="flex items-center gap-2 rounded-lg bg-black px-4 py-3 text-white transition-opacity hover:opacity-80">
            <CloudflareLogo variant="glyph" color="white" class="w-8" />
            <span class="font-medium">Logo</span>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item icon={Cloud} onclick={() => copyCloudflareLogo('glyph')}>
              {copiedCloudflareLogo === 'glyph' ? 'Copied!' : 'Copy logo as SVG'}
            </DropdownMenu.Item>
            <DropdownMenu.Item icon={Code2} onclick={() => copyCloudflareLogo('full')}>
              {copiedCloudflareLogo === 'full' ? 'Copied!' : 'Copy full logo as SVG'}
            </DropdownMenu.Item>
            <DropdownMenu.Item icon={Download} onclick={() => window.open('https://www.cloudflare.com/press-kit/', '_blank', 'noopener')}>
              Download brand assets
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item icon={ExternalLink} onclick={() => window.open('https://www.cloudflare.com/brand-assets/', '_blank', 'noopener')}>
              Visit brand guidelines
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
        <span class="text-sm text-kumo-subtle">Click to open the brand assets menu</span>
      </div>
    {:else if demo === 'PoweredByCloudflareVariantsDemo'}
      <div class="flex flex-wrap items-center gap-4">
        <PoweredByCloudflare />
        <PoweredByCloudflare color="black" />
        <div class="rounded-lg bg-black p-3"><PoweredByCloudflare color="white" /></div>
      </div>
    {:else if demo === 'PoweredByCloudflareFooterDemo'}
      <footer class="flex w-full items-center justify-between rounded-lg border border-kumo-hairline bg-kumo-elevated px-6 py-4">
        <span class="text-sm text-kumo-subtle">&copy; 2026 Your Company. All rights reserved.</span>
        <PoweredByCloudflare />
      </footer>
    {:else}
      <PoweredByCloudflare />
    {/if}
  {:else if looksLike('Code')}
    {#if looksLike('CodeHighlighted')}
      <div class="w-full max-w-2xl"><CodeHighlighted code={highlightedExampleCode} lang="typescript" showCopyButton /></div>
    {:else}
      <Code>{`import { Button } from 'kumo-svelte';\n\n<Button variant="primary">Deploy</Button>`}</Code>
    {/if}
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
    {#if demo === 'DatePickerRangeDemo'}
      <DateRangePicker bind:value={dateRangePickerValue} />
    {:else if demo === 'DatePickerDisabledDemo'}
      <DatePicker value={datePickerValue} disabled />
    {:else if demo === 'DatePickerTwoMonthsDemo'}
      <DatePicker bind:value={datePickerValue} numberOfMonths={2} />
    {:else}
      <DatePicker bind:value={datePickerValue} />
    {/if}
  {:else if looksLike('Dialog')}
    <Dialog title={demo.includes('Alert') || demo.includes('Delete') ? 'Delete Project' : demo.includes('Select') ? 'Select Region' : demo.includes('Combobox') ? 'Choose Template' : demo.includes('Dropdown') ? 'Project Actions' : 'Edit Profile'} description={demo.includes('Alert') || demo.includes('Delete') ? 'This action cannot be undone.' : 'Make changes and save when you are done.'}>
      {#snippet trigger()}<span class="inline-flex h-9 cursor-pointer items-center rounded-lg bg-kumo-base px-3 text-base font-medium text-kumo-default shadow-xs ring ring-kumo-hairline">{demo.includes('Alert') || demo.includes('Delete') ? 'Delete Account' : demo.includes('Actions') ? 'Open dialog' : 'Click me'}</span>{/snippet}
      <div class="flex justify-end gap-2"><Button>Cancel</Button><Button variant="destructive">Delete</Button></div>
    </Dialog>
  {:else if looksLike('Dropdown')}
    <DropdownMenu>
      <DropdownMenu.Trigger>
        {#if demo === 'DropdownBasicDemo'}
          <Button icon={Plus}>Add</Button>
        {:else if demo === 'DropdownNestedDemo'}
          <Button>Account</Button>
        {:else if demo === 'DropdownInsetDemo'}
          <Button>Edit</Button>
        {:else}
          <Button>Actions</Button>
        {/if}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#if demo === 'DropdownBasicDemo'}
          <DropdownMenu.Item>Worker</DropdownMenu.Item>
          <DropdownMenu.Item>Pages</DropdownMenu.Item>
          <DropdownMenu.Item>KV Namespace</DropdownMenu.Item>
        {:else if demo === 'DropdownCheckboxDemo'}
          <DropdownMenu.Label>Display</DropdownMenu.Label>
          <DropdownMenu.CheckboxItem checked>Show sidebar</DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Show line numbers</DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem checked>Word wrap</DropdownMenu.CheckboxItem>
        {:else if demo === 'DropdownInsetDemo'}
          <DropdownMenu.Item icon={Settings}>Rename</DropdownMenu.Item>
          <DropdownMenu.Item icon={Copy}>Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item inset>Move to folder</DropdownMenu.Item>
          <DropdownMenu.Item inset>Add to favorites</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item icon={Trash} variant="danger">Delete</DropdownMenu.Item>
        {:else}
          <DropdownMenu.Item icon={Settings}>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Billing</DropdownMenu.Item>
          <DropdownMenu.Item>Dark mode</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item icon={Trash} variant="danger">Log out</DropdownMenu.Item>
        {/if}
      </DropdownMenu.Content>
    </DropdownMenu>
  {:else if looksLike('Empty')}
    <Empty
      size={demo === 'EmptySizesDemo' ? 'sm' : 'base'}
      title={demo === 'EmptyMinimalDemo' ? 'Nothing here' : demo === 'EmptyWithCommandDemo' ? 'No projects found' : demo === 'EmptyBasicDemo' ? 'No results found' : demo === 'EmptyWithActionsDemo' ? 'No connection' : 'No packages found'}
      description={demo === 'EmptyMinimalDemo' ? undefined : demo === 'EmptyWithCommandDemo' ? 'Get started by creating your first project using the command below.' : demo === 'EmptyBasicDemo' ? `Try adjusting your search or filter to find what you're looking for.` : demo === 'EmptyWithActionsDemo' ? 'Unable to connect to the server. Please check your connection and try again.' : 'Get started by installing your first package.'}
      commandLine={demo === 'EmptyWithCommandDemo' ? 'npm create kumo-project' : demo === 'EmptyDemo' ? 'npm install @cloudflare/kumo' : undefined}
    >
      {#snippet icon()}
        {#if demo === 'EmptyWithCommandDemo'}<FolderOpen class="size-12 text-kumo-inactive" />{:else if demo === 'EmptyWithActionsDemo'}<Cloud class="size-12 text-kumo-inactive" />{:else if demo === 'EmptySizesDemo'}<Database class="size-8 text-kumo-inactive" />{:else}<Package class="size-12 text-kumo-inactive" />{/if}
      {/snippet}
      {#if demo === 'EmptyWithActionsDemo' || demo === 'EmptyDemo'}
        <div class="flex items-center gap-2">
          {#if demo === 'EmptyDemo'}<Button icon={Code2}>See examples</Button><Button icon={Globe} variant="primary">View documentation</Button>{:else}<Button variant="primary">Retry</Button><Button variant="secondary">Go Back</Button>{/if}
        </div>
      {/if}
    </Empty>
  {:else if looksLike('Flow')}
    {#if demo === 'FlowBasicDemo'}
      <Flow>
        <Flow.Node>Step 1</Flow.Node>
        <Flow.Node>Step 2</Flow.Node>
        <Flow.Node>Step 3</Flow.Node>
      </Flow>
    {:else if demo === 'FlowParallelDemo'}
      <Flow>
        <Flow.Node>Start</Flow.Node>
        <Flow.Parallel>
          <Flow.Node>Branch A</Flow.Node>
          <Flow.Node>Branch B</Flow.Node>
          <Flow.Node>Branch C</Flow.Node>
        </Flow.Parallel>
        <Flow.Node>End</Flow.Node>
      </Flow>
    {:else if demo === 'FlowCustomContentDemo'}
      <Flow>
        <Flow.Node bare class="size-4 rounded-full bg-kumo-hairline" />
        <Flow.Node bare class="rounded-lg bg-kumo-contrast px-3 py-2 font-medium text-kumo-inverse">my-worker</Flow.Node>
      </Flow>
    {:else if demo === 'FlowCenteredDemo'}
      <Flow align="center">
        <Flow.Node bare class="size-4 rounded-full bg-kumo-hairline" />
        <Flow.Node>my-worker</Flow.Node>
        <Flow.Node class="px-3 py-6">Taller node</Flow.Node>
      </Flow>
    {:else if demo === 'FlowComplexDemo'}
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
      </Flow>
    {:else if demo === 'FlowAnchorDemo'}
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
      </Flow>
    {:else if demo === 'FlowPanningDemo'}
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
      </Flow>
    {:else if demo === 'FlowDisabledDemo'}
      <Flow>
        <Flow.Node>Request</Flow.Node>
        <Flow.Parallel>
          <Flow.Node>Primary Handler</Flow.Node>
          <Flow.Node disabled>Backup Handler (disabled)</Flow.Node>
        </Flow.Parallel>
        <Flow.Node>Response</Flow.Node>
      </Flow>
    {:else if demo === 'FlowParallelAlignEndDemo'}
      <Flow>
        <Flow.Node>Start</Flow.Node>
        <Flow.Parallel align="end">
          <Flow.Node>Short</Flow.Node>
          <Flow.Node>Medium Length</Flow.Node>
          <Flow.Node>Very Long Node Name</Flow.Node>
        </Flow.Parallel>
        <Flow.Node>End</Flow.Node>
      </Flow>
    {:else if demo === 'FlowParallelNestedListDemo'}
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
      </Flow>
    {:else}
      <Flow>
        <Flow.Node>HTTP Request</Flow.Node>
        <Flow.Parallel>
          <Flow.Node>Auth Check</Flow.Node>
          <Flow.Node>Rate Limit</Flow.Node>
          <Flow.Node>Cache Lookup</Flow.Node>
        </Flow.Parallel>
        <Flow.Node>Route Handler</Flow.Node>
      </Flow>
    {/if}
  {:else if demo === 'GridDemo'}
    <Grid variant="2up" gap="base" class="w-full">
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
    </Grid>
  {:else if demo === 'GridVariantsDemo'}
    <div class="flex w-full flex-col gap-8">
      <div>
        <p class="mb-2 text-kumo-subtle">variant="2up"</p>
        <Grid variant="2up" gap="sm">
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></GridItem>
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></GridItem>
        </Grid>
      </div>
      <div>
        <p class="mb-2 text-kumo-subtle">variant="3up"</p>
        <Grid variant="3up" gap="sm">
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></GridItem>
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></GridItem>
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>3</Text></Surface></GridItem>
        </Grid>
      </div>
      <div>
        <p class="mb-2 text-kumo-subtle">variant="4up"</p>
        <Grid variant="4up" gap="sm">
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></GridItem>
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></GridItem>
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>3</Text></Surface></GridItem>
          <GridItem><Surface class="rounded-lg p-4 text-center"><Text>4</Text></Surface></GridItem>
        </Grid>
      </div>
    </div>
  {:else if demo === 'GridAsymmetricDemo'}
    <div class="flex w-full flex-col gap-8">
      <div>
        <p class="mb-2 text-kumo-subtle">variant="2-1" (66% / 33%)</p>
        <Grid variant="2-1" gap="sm">
          <GridItem><Surface class="rounded-lg p-4"><Text bold>Main Content</Text><div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div></Surface></GridItem>
          <GridItem><Surface class="rounded-lg p-4"><Text bold>Sidebar</Text><div class="mt-1"><Text variant="secondary">One-third width</Text></div></Surface></GridItem>
        </Grid>
      </div>
      <div>
        <p class="mb-2 text-kumo-subtle">variant="1-2" (33% / 66%)</p>
        <Grid variant="1-2" gap="sm">
          <GridItem><Surface class="rounded-lg p-4"><Text bold>Sidebar</Text><div class="mt-1"><Text variant="secondary">One-third width</Text></div></Surface></GridItem>
          <GridItem><Surface class="rounded-lg p-4"><Text bold>Main Content</Text><div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div></Surface></GridItem>
        </Grid>
      </div>
    </div>
  {:else if demo === 'GridGapDemo'}
    <div class="flex w-full flex-col gap-8">
      {#each gridGaps as gridGap}
        <div>
          <p class="mb-2 text-kumo-subtle">gap="{gridGap}"{gridGap === 'base' ? ' (default, responsive)' : ''}</p>
          <Grid variant="side-by-side" gap={gridGap}>
            <GridItem><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></GridItem>
            <GridItem><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></GridItem>
          </Grid>
        </div>
      {/each}
    </div>
  {:else if demo === 'GridMobileDividerDemo'}
    <Grid variant="4up" gap="base" mobileDivider class="w-full">
      {#each [1, 2, 3, 4] as item}
        <GridItem>
          <Surface class="rounded-lg p-4">
            <Text bold>Item {item}</Text>
            <div class="mt-1">
              <Text variant="secondary">Has divider on mobile</Text>
            </div>
          </Surface>
        </GridItem>
      {/each}
    </Grid>
  {:else if looksLike('InputArea')}
    <div class="w-full max-w-sm space-y-2">
      {#if !demo.includes('Bare')}<Label>{isRichNodeLabelDemo ? 'Notes for billing' : demo.includes('Optional') ? 'Notes (optional)' : 'Description'}</Label>{/if}
      <InputArea placeholder={demo.includes('Bare') ? 'Write a comment...' : 'Describe the rollout...'} rows={demo.includes('Rows') ? 6 : 4} disabled={demo.includes('Disabled')} invalid={demo.includes('Error')} />
      {#if demo.includes('Error')}<p class="text-sm text-kumo-danger">{demo.includes('Object') ? 'Description is too short' : 'Description is required'}</p>{/if}
    </div>
  {:else if looksLike('InputGroup')}
    {#if demo === 'InputGroupTextDemo'}
      <div class="flex flex-col gap-4">
        <InputGroup class="w-full max-w-3xs"><InputGroupAddon>@</InputGroupAddon><InputGroupInput placeholder="username" aria-label="Username" /></InputGroup>
        <InputGroup class="w-full max-w-3xs"><InputGroupInput placeholder="email" aria-label="Email" /><InputGroupAddon align="end">@example.com</InputGroupAddon></InputGroup>
        <InputGroup class="w-full max-w-3xs"><InputGroupAddon>/api/</InputGroupAddon><InputGroupInput placeholder="endpoint" aria-label="API path" /><InputGroupAddon align="end">.json</InputGroupAddon></InputGroup>
      </div>
    {:else if demo === 'InputGroupButtonsDemo'}
      <div class="flex flex-col gap-4">
        <InputGroup class="w-full max-w-3xs"><InputGroupInput type="password" value="password" aria-label="Password" /><InputGroupAddon align="end"><InputGroupButton icon={Eye} class="text-kumo-subtle" aria-label="Show password" /></InputGroupAddon></InputGroup>
        <InputGroup class="w-full max-w-3xs" focusMode="hybrid"><InputGroupAddon><Search /></InputGroupAddon><InputGroupInput value="search" aria-label="Search" /><InputGroupAddon align="end" class="pr-1"><InputGroupButton aria-label="Clear search"><X /></InputGroupButton></InputGroupAddon><InputGroupButton variant="secondary">Search</InputGroupButton></InputGroup>
      </div>
    {:else if demo === 'InputGroupKbdDemo'}
      <InputGroup class="w-full max-w-3xs"><InputGroupAddon><Search /></InputGroupAddon><InputGroupInput placeholder="Search..." aria-label="Search" /><InputGroupAddon align="end"><kbd class="border-none! bg-none!">⌘K</kbd></InputGroupAddon></InputGroup>
    {:else if demo === 'InputGroupLoadingDemo'}
      <InputGroup class="w-full max-w-3xs"><InputGroupInput value="checking" aria-label="Domain" /><InputGroupSuffix>.workers.dev</InputGroupSuffix><InputGroupAddon align="end"><Loader /></InputGroupAddon></InputGroup>
    {:else if demo === 'InputGroupTooltipButtonDemo'}
      <InputGroup class="w-full max-w-2xs"><InputGroupAddon><Search /></InputGroupAddon><InputGroupInput placeholder="Search with query language..." aria-label="Search" /><InputGroupAddon align="end"><InputGroupButton icon={HelpCircle} tooltip="Query language help" class="text-kumo-subtle" /></InputGroupAddon></InputGroup>
    {:else if demo === 'InputGroupIconsDemo'}
      <InputGroup class="w-full max-w-3xs"><InputGroupAddon><Link2 /></InputGroupAddon><InputGroupInput placeholder="Paste a link..." aria-label="Link" /></InputGroup>
    {:else}
      <InputGroup class="w-full max-w-2xs"><InputGroupInput value="kumo" maxlength={20} /><InputGroupSuffix>.workers.dev</InputGroupSuffix><InputGroupAddon align="end"><CheckCircle class="text-kumo-success" /></InputGroupAddon></InputGroup>
    {/if}
  {:else if demo === 'InputBasicDemo'}
    <div class="w-full max-w-sm space-y-2">
      <Label>Email</Label>
      <Input placeholder="you@example.com" />
      <p class="text-sm text-kumo-subtle">We'll never share your email</p>
    </div>
  {:else if demo === 'InputWithLabelDemo'}
    <div class="w-full max-w-sm space-y-2">
      <Label>Username</Label>
      <Input placeholder="Choose a username" />
      <p class="text-sm text-kumo-subtle">3-20 characters, alphanumeric only</p>
    </div>
  {:else if demo === 'InputErrorStringDemo'}
    <div class="w-full max-w-sm space-y-2">
      <Label>Email</Label>
      <Input value="invalid-email" invalid />
      <p class="text-sm text-kumo-danger">Please enter a valid email address</p>
    </div>
  {:else if demo === 'InputErrorObjectDemo'}
    <div class="w-full max-w-sm space-y-2">
      <Label>Password</Label>
      <Input type="password" value="short" invalid />
      <p class="text-sm text-kumo-danger">Password must be at least 8 characters</p>
    </div>
  {:else if demo === 'InputSizesDemo'}
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div class="space-y-1.5"><Label>Extra Small</Label><Input size="xs" placeholder="Extra small input" /></div>
      <div class="space-y-1.5"><Label>Small</Label><Input size="sm" placeholder="Small input" /></div>
      <div class="space-y-1.5"><Label>Base</Label><Input placeholder="Base input (default)" /></div>
      <div class="space-y-1.5"><Label>Large</Label><Input size="lg" placeholder="Large input" /></div>
    </div>
  {:else if demo === 'InputDisabledDemo'}
    <div class="w-full max-w-sm space-y-2"><Label>Disabled field</Label><Input placeholder="Cannot edit" disabled /></div>
  {:else if demo === 'InputBareDemo'}
    <Input placeholder="Search..." aria-label="Search products" class="max-w-sm" />
  {:else if demo === 'InputErrorWithoutLabelDemo'}
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div class="space-y-1.5"><Input value="not a host" placeholder="example.com" invalid /><p class="text-sm text-kumo-danger">Please enter a valid hostname</p></div>
      <div class="space-y-1.5"><Input value="missing-slash" placeholder="/api/v1/users" invalid /><p class="text-sm text-kumo-danger">Path must start with /</p></div>
    </div>
  {:else if demo === 'InputTypesDemo'}
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div class="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="you@example.com" /></div>
      <div class="space-y-1.5"><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>
      <div class="space-y-1.5"><Label>Age</Label><Input type="number" placeholder="18" /></div>
      <div class="space-y-1.5"><Label>Phone</Label><Input type="tel" placeholder="+1 (555) 000-0000" /></div>
    </div>
  {:else if demo === 'InputOptionalFieldDemo'}
    <div class="w-full max-w-sm space-y-2"><Label>Phone Number <span class="font-normal text-kumo-subtle">(optional)</span></Label><Input placeholder="+1 (555) 000-0000" /></div>
  {:else if demo === 'InputLabelTooltipDemo'}
    <div class="w-full max-w-sm space-y-2"><Label>API Key</Label><Input placeholder="sk_live_..." /></div>
  {:else if isRichNodeLabelDemo}
    <div class="w-full max-w-sm space-y-2">
      <Label>Email for <strong>billing</strong> <span class="text-kumo-danger">*</span></Label>
      <Input placeholder="billing@company.com" type="email" />
    </div>
  {:else if demo === 'InputControlledOnChangeDemo' || demo === 'InputControlledOnValueChangeDemo'}
    <div class="w-full max-w-sm space-y-2"><Label>{demo.includes('OnChange') ? 'With onChange' : 'With onValueChange'}</Label><Input placeholder="Type something..." /><p class="text-sm text-kumo-subtle">{demo.includes('OnChange') ? 'Uses e.target.value' : 'Receives the value directly'}</p></div>
  {:else if looksLike('Label')}
    {#if demo === 'LabelBasicDemo'}
      <div class="flex flex-col gap-4">
        <Label>Default Label</Label>
        <Label showOptional>Optional Label</Label>
        <Label tooltip="More information about this field">Label with Tooltip</Label>
      </div>
    {:else if demo === 'LabelOptionalFieldDemo'}
      <Input label="Phone Number" required={false} placeholder="+1 555-0000" />
    {:else if demo === 'LabelWithTooltipDemo'}
      <Input
        label="API Key"
        labelTooltip="Find this in your dashboard settings under API > Keys"
        placeholder="sk_live_..."
      />
    {:else if demo === 'LabelReactNodeDemo' || demo === 'LabelSnippetDemo'}
      <Checkbox>
        I agree to the <strong>Terms of Service</strong>
      </Checkbox>
    {:else if demo === 'LabelFormMixedDemo'}
      <div class="flex w-full max-w-md flex-col gap-4">
        <Input label="Full Name" placeholder="John Doe" />
        <Input
          label="Email"
          labelTooltip="We'll send your receipt here"
          placeholder="john@example.com"
          type="email"
        />
        <Input label="Company" required={false} placeholder="Acme Inc." />
        <Select
          label="Country"
          placeholder="Select a country"
          options={[
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Canada', value: 'ca' }
          ]}
        />
      </div>
    {:else if demo === 'LabelStandaloneDemo'}
      <div class="flex flex-col gap-3">
        <Label>Default</Label>
        <Label showOptional>Optional</Label>
        <Label tooltip="Important field">With Tooltip</Label>
      </div>
    {:else}
      <div class="w-full max-w-sm space-y-2">
        <Label for="label-demo">API token</Label>
        <Input id="label-demo" placeholder="Enter token" />
      </div>
    {/if}
  {:else if looksLike('LayerCard')}
    {#if demo === 'LayerCardMultipleDemo'}
      <div class="flex gap-4">
        <LayerCard class="w-[200px]"><LayerCard.Secondary>Components</LayerCard.Secondary><LayerCard.Primary><p class="text-sm">Browse all components</p></LayerCard.Primary></LayerCard>
        <LayerCard class="w-[200px]"><LayerCard.Secondary>Examples</LayerCard.Secondary><LayerCard.Primary><p class="text-sm">View code examples</p></LayerCard.Primary></LayerCard>
      </div>
    {:else if demo === 'LayerCardSurfaceDemo'}
      <LayerCard class="w-[250px] p-4"><p class="text-sm text-kumo-subtle">Quick start guide for new users</p></LayerCard>
    {:else if demo === 'LayerCardBasicDemo' || demo === 'LayerCardTestIdDemo'}
      <LayerCard class="w-[250px]"><LayerCard.Secondary>Getting Started</LayerCard.Secondary><LayerCard.Primary><p class="text-sm text-kumo-subtle">Quick start guide for new users</p></LayerCard.Primary></LayerCard>
    {:else}
      <LayerCard><LayerCard.Secondary class="flex items-center justify-between"><div>Next Steps</div><Button variant="ghost" size="sm" shape="square" aria-label="Go to next steps"><ArrowRight class="size-4" /></Button></LayerCard.Secondary><LayerCard.Primary>Get started with Kumo</LayerCard.Primary></LayerCard>
    {/if}
  {:else if looksLike('Link')}
    <Text>Read the <Link href="/installation">installation guide</Link> before deploying.</Text>
  {:else if looksLike('Loader')}
    {#if demo === 'LoaderSizesDemo'}
      <div class="flex items-center gap-4">
        <Loader size="sm" />
        <Loader size="base" />
        <Loader size="lg" />
      </div>
    {:else if demo === 'LoaderCustomSizeDemo'}
      <Loader size={24} />
    {:else if demo === 'LoaderCustomColorDemo'}
      <Loader class="text-kumo-subtle" />
    {:else}
      <Loader />
    {/if}
  {:else if looksLike('MenuBar')}
    <MenuBar
      isActive={demo === 'MenuBarNoActiveDemo' ? undefined : menuBarActive}
      optionIds
      options={[
        {
          icon: Bold,
          id: 'bold',
          tooltip: 'Bold',
          onClick: () => (menuBarActive = menuBarActive === 'bold' ? undefined : 'bold')
        },
        {
          icon: Italic,
          id: 'italic',
          tooltip: 'Italic',
          onClick: () => (menuBarActive = menuBarActive === 'italic' ? undefined : 'italic')
        }
      ]}
    />
  {:else if looksLike('Meter')}
    <div class="w-full max-w-sm">
      {#if demo === 'MeterCustomValueDemo'}
        <Meter label="API requests" value={75} customValue="750 / 1,000" />
      {:else if demo === 'MeterHiddenValueDemo'}
        <Meter label="Progress" value={40} showValue={false} />
      {:else if demo === 'MeterFullDemo'}
        <Meter label="Quota reached" value={100} />
      {:else if demo === 'MeterLowDemo'}
        <Meter label="Memory usage" value={15} />
      {:else if demo === 'MeterCustomStyleDemo'}
        <Meter
          label="Upload progress"
          value={80}
          indicatorClassName="from-kumo-success via-kumo-success to-kumo-success"
        />
      {:else}
        <Meter label="Storage used" value={65} />
      {/if}
    </div>
  {:else if looksLike('Pagination')}
    <Pagination page={demo.includes('Mid') ? 6 : 1} pages={12} />
  {:else if looksLike('Popover')}
    <Popover title={demo.includes('Custom') ? 'Custom content' : 'Deployment status'} description={demo.includes('Close') ? 'This popover includes a close action.' : 'Deployments usually complete in under one minute.'}>
      {#snippet trigger()}<span class="inline-flex h-9 cursor-pointer items-center rounded-lg bg-kumo-base px-3 text-base font-medium text-kumo-default shadow-xs ring ring-kumo-hairline">{demo.includes('Hover') ? 'Hover me' : demo.includes('Position') ? 'Positioned popover' : 'Show status'}</span>{/snippet}
    </Popover>
  {:else if looksLike('Radio')}
    <div class={demo.includes('Horizontal') || demo.includes('CardHorizontal') ? 'flex gap-4' : 'grid gap-3'}>
      {#if !demo.includes('LegendSrOnly')}<p class={demo.includes('LegendCustom') ? 'text-sm font-normal text-kumo-subtle' : 'text-sm font-medium text-kumo-default'}>{demo.includes('Card') ? 'Plan' : 'Environment'}</p>{/if}
      <Radio options={radioOptions} value={demo.includes('Disabled') ? 'disabled' : 'production'} />
      {#if demo.includes('Error')}<p class="text-sm text-kumo-danger">Choose an environment to continue.</p>{/if}
    </div>
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
      <Button variant="destructive"><Trash class="size-4" aria-hidden="true" /> Delete resource</Button>
      <Button>Cancel</Button>
    </div>
  {:else if looksLike('Select')}
    <div class="w-full max-w-xs space-y-2">
      {#if demo === 'SelectSizesDemo'}
        <div class="grid gap-4">
          {#each selectSizes as selectSize (selectSize)}
            <div class="flex items-center gap-3">
              <span class="w-10 text-sm text-kumo-subtle">{selectSize}</span>
              <Select aria-label={`Select size ${selectSize}`} size={selectSize} class="w-[200px]" placeholder="Choose..." options={[{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }]} />
            </div>
          {/each}
        </div>
      {:else}
        <Select
          class={demo === 'SelectWithFieldDemo' ? 'w-[280px]' : 'w-[200px]'}
          label={demo === 'SelectWithoutLabelDemo' ? undefined : demo === 'SelectWithTooltipDemo' ? 'Priority' : demo === 'SelectLoadingDataDemo' ? 'Assignee' : demo === 'SelectPlaceholderDemo' ? 'Category' : demo === 'SelectWithFieldDemo' ? 'Issue Type' : 'Favorite Fruit'}
          aria-label={demo === 'SelectWithoutLabelDemo' ? 'Select a fruit' : undefined}
          description={demo === 'SelectWithFieldDemo' ? 'Choose the category that best describes your issue' : undefined}
          error={demo === 'SelectWithFieldDemo' ? 'Please select an issue type' : undefined}
          labelTooltip={demo === 'SelectWithTooltipDemo' ? 'Higher priority issues are addressed first' : undefined}
          placeholder={demo === 'SelectPlaceholderDemo' ? 'Choose a category...' : demo === 'SelectWithTooltipDemo' ? 'Select priority' : demo === 'SelectLoadingDataDemo' ? 'Select assignee' : undefined}
          value={demo === 'SelectWithoutLabelDemo' || demo === 'SelectBasicDemo' ? 'apple' : undefined}
          disabled={demo.includes('Disabled')}
          loading={demo.includes('Loading')}
          options={demo === 'SelectWithTooltipDemo' ? [{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }, { label: 'Critical', value: 'critical' }] : demo === 'SelectWithFieldDemo' || demo === 'SelectPlaceholderDemo' ? [{ label: 'Bug', value: 'bug' }, { label: 'Documentation', value: 'documentation' }, { label: 'Feature', value: 'feature' }] : [{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }, { label: 'Cherry', value: 'cherry' }]}
        />
      {/if}
    </div>
  {:else if looksLike('SensitiveInput')}
    <SensitiveInput value="sk_live_••••••••••••" />
  {:else if looksLike('SkeletonLine')}
    {#if demo === 'SkeletonLineWidthDemo'}
      <div class="flex w-64 flex-col gap-3">
        <SkeletonLine minWidth={80} maxWidth={100} />
        <SkeletonLine minWidth={60} maxWidth={80} />
        <SkeletonLine minWidth={40} maxWidth={60} />
      </div>
    {:else if demo === 'SkeletonLineHeightDemo'}
      <div class="flex w-64 flex-col gap-3">
        <SkeletonLine class="h-2" />
        <SkeletonLine class="h-4" />
        <SkeletonLine class="h-6" />
        <SkeletonLine class="h-8" />
      </div>
    {:else if demo === 'SkeletonLineBlockHeightDemo'}
      <div class="flex w-64 flex-col gap-1">
        {#each [32, 48, 64] as blockHeight (blockHeight)}
          <div class="relative">
            <div class="absolute top-0 bottom-0 right-full mr-2 flex items-center border-r-2 border-kumo-fill pr-2 text-sm">
              {blockHeight}px
            </div>
            <SkeletonLine {blockHeight} />
          </div>
        {/each}
      </div>
    {:else if demo === 'SkeletonLineCardDemo'}
      <div class="w-64 rounded-lg p-4 ring ring-kumo-hairline">
        <div class="mb-4 h-4">
          <SkeletonLine minWidth={40} maxWidth={60} />
        </div>
        <div class="flex flex-col gap-2">
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine minWidth={50} maxWidth={70} />
        </div>
      </div>
    {:else}
      <div class="flex w-64 flex-col gap-3">
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
      </div>
    {/if}
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
    <LayerCard class="w-full max-w-md overflow-x-auto p-0">
      <Table>
        <TableHeader variant={demo.includes('Compact') ? 'compact' : 'default'}>
          <TableRow><TableHead>Subject</TableHead><TableHead>From</TableHead><TableHead>Date</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          {#each emailRows as row, index (row.subject)}
            <TableRow variant={demo.includes('Selected') && index === 1 ? 'selected' : 'default'}>
              <TableCell>{row.subject}</TableCell><TableCell>{row.from}</TableCell><TableCell>{row.date}</TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </LayerCard>
  {:else if looksLike('Tabs')}
    {#if demo === 'TabsDefaultDemo'}
      <div class="flex flex-col gap-6">
        <div><p class="mb-2 text-sm text-kumo-subtle">Segmented (default)</p><Tabs variant="segmented" items={upstreamTabs} value="tab1" /></div>
        <div><p class="mb-2 text-sm text-kumo-subtle">Underline</p><Tabs variant="underline" items={upstreamTabs} value="tab1" /></div>
      </div>
    {:else if demo === 'TabsSmDemo'}
      <div class="flex flex-col gap-6">
        <div><p class="mb-2 text-sm text-kumo-subtle">Segmented sm</p><Tabs variant="segmented" size="sm" items={upstreamTabs} value="tab1" /></div>
        <div><p class="mb-2 text-sm text-kumo-subtle">Underline sm</p><Tabs variant="underline" size="sm" items={upstreamTabs} value="tab1" /></div>
      </div>
    {:else if demo === 'TabsManyDemo'}
      <div class="w-full max-w-md"><Tabs items={manyTabs} value="overview" /></div>
    {:else if demo === 'TabsControlledDemo'}
      <div class="space-y-4"><Tabs items={upstreamTabs} value="tab1" /><p class="text-sm text-kumo-subtle">Active tab: <code class="text-sm">tab1</code></p></div>
    {:else}
      <Tabs variant={demo === 'TabsUnderlineDemo' ? 'underline' : 'segmented'} items={upstreamTabs} value="tab1" />
    {/if}
  {:else if looksLike('Text')}
    {#if demo === 'TextTruncateDemo'}
      <div class="w-64 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
        <Text truncate>
          This is a long piece of text that will be truncated with an ellipsis when it overflows its container.
        </Text>
      </div>
    {:else}
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
      </div>
    {/if}
  {:else if looksLike('Toast')}
    <Toasty>
      {#snippet children(toastManager)}
        {#snippet customToastContent()}
          <div class="flex items-center gap-2">
            <CheckCircle class="size-4" />
            <Link href="/">my-first-worker</Link> created!
          </div>
        {/snippet}
        <Button
          variant={demo.includes('Success') ? 'primary' : 'secondary'}
          onclick={() => {
            if (demo === 'ToastMultipleDemo') {
              toastManager.add({ title: 'First toast', description: 'This is the first notification.' });
              setTimeout(() => toastManager.add({ title: 'Second toast', description: 'This is the second notification.' }), 500);
              setTimeout(() => toastManager.add({ title: 'Third toast', description: 'This is the third notification.' }), 1000);
            } else if (demo === 'ToastCustomContentDemo') {
              toastManager.add({
                content: customToastContent
              });
            } else if (demo === 'ToastActionsDemo') {
              toastManager.add({
                title: 'Need help?',
                description: 'Get assistance with your deployment.',
                actions: [
                  { children: 'Support', variant: 'secondary', onClick: () => console.log('Support clicked') },
                  { children: 'Ask AI', variant: 'primary', onClick: () => console.log('Ask AI clicked') }
                ]
              });
            } else if (demo === 'ToastPromiseDemo') {
              const deployment = new Promise<{ name: string }>((resolve, reject) => {
                setTimeout(() => (Math.random() > 0.3 ? resolve({ name: 'my-worker' }) : reject(new Error('Network error'))), 2000);
              });
              toastManager.promise(deployment, {
                loading: { title: 'Deploying...', description: 'Please wait while we deploy your Worker.' },
                success: (data) => ({ title: 'Deployed!', description: `Worker "${data.name}" is now live.` }),
                error: (err) => ({ title: 'Deployment failed', description: err.message, variant: 'error' })
              });
            } else {
              toastManager.add({
                title: demo.includes('DescriptionOnly') ? undefined : demo.includes('Success') ? 'Deployed successfully' : demo.includes('Error') ? 'Deployment failed' : demo.includes('Warning') ? 'Rate limit warning' : demo.includes('Info') ? 'New version available' : demo.includes('TitleOnly') ? 'Settings saved' : 'Toast created',
                description: demo.includes('TitleOnly') ? undefined : demo.includes('DescriptionOnly') ? 'Your changes have been saved successfully.' : demo.includes('Success') ? 'Your Worker is now live.' : demo.includes('Error') ? 'Unable to connect to the server.' : demo.includes('Warning') ? "You're approaching your API quota." : demo.includes('Info') ? 'Kumo v4.2 includes performance improvements.' : 'This is a toast notification.',
                variant: demo.includes('Success') ? 'success' : demo.includes('Error') ? 'error' : demo.includes('Warning') ? 'warning' : demo.includes('Info') ? 'info' : 'default'
              });
            }
          }}
        >
          {demo.includes('Success') ? 'Deploy Worker' : demo.includes('Multiple') ? 'Show multiple toasts' : demo.includes('Error') ? 'Show error toast' : demo.includes('Warning') ? 'Show warning toast' : demo.includes('Info') ? 'Show info toast' : demo.includes('CustomContent') ? 'Show custom content' : demo.includes('Actions') ? 'Show with actions' : demo.includes('Promise') ? 'Deploy with promise' : demo.includes('TitleOnly') ? 'Title only' : demo.includes('DescriptionOnly') ? 'Description only' : 'Show toast'}
        </Button>
      {/snippet}
    </Toasty>
  {:else if looksLike('Tooltip')}
    {#if demo === 'TooltipMultipleDemo'}
      <div class="flex gap-2">
        <Tooltip content="Add"><Button shape="square" aria-label="Add"><Plus class="size-4" /></Button></Tooltip>
        <Tooltip content="Change language"><Button shape="square" aria-label="Change language"><Globe class="size-4" /></Button></Tooltip>
      </div>
    {:else if demo === 'TooltipCustomTriggerDemo'}
      <Tooltip content="Click to learn more">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-kumo-brand px-3 py-1.5 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95"><HelpCircle class="size-4" />Help</span>
      </Tooltip>
    {:else if demo === 'TooltipDelayDemo'}
      <div class="flex gap-4">
        <Tooltip content="Opens after 1 second" delay={1000}><Button variant="secondary">1s open delay</Button></Tooltip>
        <Tooltip content="Stays open 500ms after leaving" closeDelay={500}><Button variant="secondary">500ms close delay</Button></Tooltip>
        <Tooltip content="Instant open, stays 1s" delay={0} closeDelay={1000}><Button variant="secondary">Instant + 1s close</Button></Tooltip>
      </div>
    {:else}
      <Tooltip content={demo === 'TooltipBasicDemo' ? 'Add' : 'Add new item'}><Button shape="square" aria-label="Add"><Plus class="size-4" /></Button></Tooltip>
    {/if}
  {:else}
    <div class="flex items-center gap-2 rounded-lg border border-kumo-hairline bg-kumo-base px-4 py-3 text-sm text-kumo-subtle">
      <Settings class="size-4" aria-hidden="true" />
      <span>{demo}</span>
    </div>
  {/if}
</div>
