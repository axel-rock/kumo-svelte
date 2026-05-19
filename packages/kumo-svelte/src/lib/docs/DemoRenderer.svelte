<script lang="ts">
  import {
    Badge,
    Banner,
    Autocomplete,
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
    Dialog,
    DropdownMenu,
    Empty,
    Field,
    Flow,
    Grid,
    Input,
    InputArea,
    InputGroup,
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
    Table,
    TableOfContents,
    Tabs,
    Text,
    Toasty,
    Tooltip
  } from '$lib';
  import type { DateRange } from '$lib';
  import { ArrowRight, ArrowSquareOut as ExternalLink, CalendarDotsIcon, CheckCircle, Cloud, Code as Code2, Copy, Database, Download, Eye, FolderOpen, Gear as Settings, Globe, House, Info, LinkSimple as Link2, MagnifyingGlass as Search, Package, Plus, Question as HelpCircle, TextB as Bold, TextItalic as Italic, Trash, Warning, WarningCircle, X } from 'phosphor-svelte';
  import { generateCloudflareLogoSvg } from '$lib/components/cloudflare-logo';
  import { PoweredByCloudflare } from '$lib/components/cloudflare-logo';
  import { DeleteResource } from '../../blocks/delete-resource';
  import { PageHeader } from '../../blocks/page-header';
  import { ResourceListPage } from '../../blocks/resource-list';
  import ChartDemos from './chart-demos/ChartDemos.svelte';

  interface Props {
    demo: string;
  }

  let { demo }: Props = $props();
  let switchBasicChecked = $state(false);
  let switchNeutralChecked = $state(false);
  let switchCustomIdChecked = $state(false);
  let pageHeaderTab = $state('overview');
  let deleteResourceOpen = $state(false);
  let deleteResourceDeleting = $state(false);
  let deleteResourceErrorMessage = $state('');
  let menuBarActive = $state<string | undefined>('bold');
  let copiedCloudflareLogo = $state<string | undefined>();
  let autocompleteValue = $state('');
  let comboboxValue = $state<any>('Apple');
  let comboboxLanguage = $state<any>({ value: 'en', label: 'English', emoji: 'GB' });
  let comboboxNullable = $state<any>(null);
  let comboboxMultiple = $state<any[]>([]);
  let datePickerDate = $state<Date | undefined>();
  let datePickerDates = $state<Date[] | undefined>();
  let datePickerRange = $state<DateRange | undefined>();
  let datePickerPresetRange = $state<DateRange | undefined>();
  let datePickerPresetMonth = $state<Date>(new Date());
  let sensitiveInputValue = $state('my-secret-value');
  let tableOfContentsActive = $state('Introduction');
  let tableOfContentsClicked = $state<string | null>(null);
  let paginationPages = $state<Record<string, number>>({});
  let paginationPerPages = $state<Record<string, number>>({});
  const paginationInitialPage = $derived(demo === 'PaginationMidPageDemo' ? 5 : 1);
  const paginationInitialPerPage = $derived(demo === 'PaginationCustomPageSizeOptionsDemo' ? 10 : 25);
  const paginationPage = $derived(paginationPages[demo] ?? paginationInitialPage);
  const paginationPerPage = $derived(paginationPerPages[demo] ?? paginationInitialPerPage);

  function setPaginationPage(nextPage: number) {
    paginationPages[demo] = nextPage;
  }

  function setPaginationPerPage(nextPerPage: number) {
    paginationPerPages[demo] = nextPerPage;
  }

  function openDeleteResource() {
    deleteResourceErrorMessage = '';
    deleteResourceOpen = true;
  }

  async function handleDeleteResource() {
    deleteResourceErrorMessage = '';
    deleteResourceDeleting = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    deleteResourceDeleting = false;
    if (demo === 'DeleteResourceErrorDemo') {
      deleteResourceErrorMessage = 'Something went wrong';
      return;
    }
    deleteResourceOpen = false;
  }

  const selectOptions = [
    { label: 'Workers', value: 'workers' },
    { label: 'Pages', value: 'pages' },
    { label: 'R2', value: 'r2' },
    { label: 'D1', value: 'd1', disabled: true }
  ];

  const autocompleteFruits = [
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
  ];

  const autocompleteCountries = [
    { code: 'us', label: 'United States' },
    { code: 'gb', label: 'United Kingdom' },
    { code: 'de', label: 'Germany' },
    { code: 'fr', label: 'France' },
    { code: 'jp', label: 'Japan' },
    { code: 'cn', label: 'China' },
    { code: 'in', label: 'India' },
    { code: 'br', label: 'Brazil' },
    { code: 'ca', label: 'Canada' },
    { code: 'au', label: 'Australia' },
    { code: 'mx', label: 'Mexico' },
    { code: 'kr', label: 'South Korea' },
    { code: 'it', label: 'Italy' },
    { code: 'es', label: 'Spain' },
    { code: 'nl', label: 'Netherlands' },
    { code: 'se', label: 'Sweden' },
    { code: 'no', label: 'Norway' },
    { code: 'pl', label: 'Poland' },
    { code: 'ar', label: 'Argentina' },
    { code: 'za', label: 'South Africa' }
  ].map((country) => ({ label: country.label, value: country.code }));

  const autocompleteServers = [
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

  const autocompleteServerGroups = [
    {
      label: 'North America',
      value: 'North America',
      items: autocompleteServers.filter((item) => item.group === 'North America')
    },
    {
      label: 'Europe',
      value: 'Europe',
      items: autocompleteServers.filter((item) => item.group === 'Europe')
    },
    {
      label: 'Asia Pacific',
      value: 'Asia Pacific',
      items: autocompleteServers.filter((item) => item.group === 'Asia Pacific')
    }
  ];

  const comboboxFruits = autocompleteFruits;
  const comboboxLanguages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' },
    { value: 'de', label: 'German', emoji: 'DE' },
    { value: 'es', label: 'Spanish', emoji: 'ES' },
    { value: 'it', label: 'Italian', emoji: 'IT' },
    { value: 'pt', label: 'Portuguese', emoji: 'PT' },
    { value: 'nl', label: 'Dutch', emoji: 'NL' },
    { value: 'ja', label: 'Japanese', emoji: 'JP' },
    { value: 'zh', label: 'Chinese', emoji: 'CN' },
    { value: 'ko', label: 'Korean', emoji: 'KR' }
  ];
  const comboboxServers = [
    { value: 'Asia', items: [{ label: 'Japan', value: 'japan' }, { label: 'China', value: 'china' }, { label: 'Singapore', value: 'singapore' }] },
    { value: 'Europe', items: [{ label: 'Germany', value: 'germany' }, { label: 'France', value: 'france' }, { label: 'Italy', value: 'italy' }] },
    { value: 'North America', items: [{ label: 'United States (East)', value: 'us-east' }, { label: 'United States (West)', value: 'us-west' }, { label: 'Canada', value: 'canada' }] }
  ];
  const comboboxDatabases = [
    { value: 'postgres', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'mariadb', label: 'MariaDB' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'redis', label: 'Redis' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'd1', label: 'Cloudflare D1' }
  ];
  const comboboxBots = [
    { value: 'googlebot', label: 'Googlebot', author: 'Google' },
    { value: 'bingbot', label: 'Bingbot', author: 'Microsoft' },
    { value: 'duckduckbot', label: 'DuckDuckBot', author: 'DuckDuckGo' },
    { value: 'applebot', label: 'Applebot', author: 'Apple' }
  ];

  const datePresetToday = new Date();
  const datePickerPresets = [
    { label: 'Today', range: { from: datePresetToday, to: datePresetToday } },
    {
      label: 'Last 7 days',
      range: { from: new Date(datePresetToday.getTime() - 6 * 24 * 60 * 60 * 1000), to: datePresetToday }
    },
    {
      label: 'Last 30 days',
      range: { from: new Date(datePresetToday.getTime() - 29 * 24 * 60 * 60 * 1000), to: datePresetToday }
    },
    {
      label: 'Last 90 days',
      range: { from: new Date(datePresetToday.getTime() - 89 * 24 * 60 * 60 * 1000), to: datePresetToday }
    },
    {
      label: 'This month',
      range: {
        from: new Date(datePresetToday.getFullYear(), datePresetToday.getMonth(), 1),
        to: new Date(datePresetToday.getFullYear(), datePresetToday.getMonth() + 1, 0)
      }
    },
    {
      label: 'Last month',
      range: {
        from: new Date(datePresetToday.getFullYear(), datePresetToday.getMonth() - 1, 1),
        to: new Date(datePresetToday.getFullYear(), datePresetToday.getMonth(), 0)
      }
    }
  ];

  const datePickerUnavailableDates = [
    new Date(datePresetToday.getFullYear(), datePresetToday.getMonth(), 5),
    new Date(datePresetToday.getFullYear(), datePresetToday.getMonth(), 12),
    new Date(datePresetToday.getFullYear(), datePresetToday.getMonth(), 18),
    new Date(datePresetToday.getFullYear(), datePresetToday.getMonth(), 25)
  ];

  function formatDateRange(range: DateRange | undefined) {
    if (!range?.from) return 'Select dates';
    if (!range.to) return range.from.toLocaleDateString();
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
  }

  function isDatePresetActive(preset: { range: DateRange }) {
    if (!datePickerPresetRange?.from || !datePickerPresetRange?.to || !preset.range.from || !preset.range.to) return false;
    return datePickerPresetRange.from.toDateString() === preset.range.from.toDateString() && datePickerPresetRange.to.toDateString() === preset.range.to.toDateString();
  }

  function handleDatePresetClick(preset: { range: DateRange }) {
    datePickerPresetRange = preset.range;
    if (preset.range.from) {
      datePickerPresetMonth = preset.range.from;
    }
  }

  let menuItems = $derived([
    { label: 'View details' },
    { label: 'Edit settings' },
    { label: 'Delete', disabled: demo.includes('Disabled') }
  ]);

  const highlightedExampleCode = `interface WorkerRoute {
  pattern: string;
  script: string;
}

const route: WorkerRoute = {
  pattern: "example.com/*",
  script: "edge-api"
};`;

  const tableOfContentsHeadings = [
    'Introduction',
    'Installation',
    'Usage',
    'API Reference',
    'Examples'
  ];

  const gridGaps = ['none', 'sm', 'base', 'lg'] as const;
  const selectSizes = ['xs', 'sm', 'base', 'lg'] as const;
  const sensitiveInputSizes = ['xs', 'sm', 'base', 'lg'] as const;

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
      <p class="flex items-center gap-2">
        Workers
        <Badge variant="secondary">New</Badge>
      </p>
    {:else if demo === 'BadgeColorVariantsDemo'}
      <div class="flex flex-wrap items-center gap-2"><Badge variant="neutral">Neutral</Badge><Badge variant="red">Red</Badge><Badge variant="orange">Orange</Badge><Badge variant="green">Green</Badge><Badge variant="teal">Teal</Badge><Badge variant="blue">Blue</Badge><Badge variant="purple">Purple</Badge></div>
    {:else}
      <div class="flex flex-wrap items-center gap-2"><Badge variant="primary">Primary</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="error">Error</Badge><Badge variant="success">Success</Badge><Badge variant="warning">Warning</Badge><Badge variant="info">Info</Badge><Badge variant="outline">Outline</Badge><Badge variant="beta">Beta</Badge></div>
    {/if}
  {:else if looksLike('Banner')}
    {#if demo === 'BannerVariantsDemo'}
      <div class="w-full space-y-3"><Banner icon={Info} title="Update available" description="A new version is ready to install." /><Banner icon={Warning} variant="alert" title="Session expiring" description="Your session will expire in 5 minutes." /><Banner icon={WarningCircle} variant="error" title="Save failed" description="We couldn't save your changes. Please try again." /></div>
    {:else if demo === 'BannerWithActionDemo' || demo === 'BannerWithActionsDemo'}
      <Banner icon={demo === 'BannerWithActionsDemo' ? Warning : Info} variant={demo === 'BannerWithActionsDemo' ? 'alert' : 'default'} title={demo === 'BannerWithActionsDemo' ? 'Session expiring' : 'Update available'} description={demo === 'BannerWithActionsDemo' ? 'Your session will expire in 5 minutes.' : 'A new version is ready to install.'}>
        {#snippet action()}<Button size="sm" variant={demo === 'BannerWithActionsDemo' ? 'secondary' : 'primary'}>{demo === 'BannerWithActionsDemo' ? 'Dismiss' : 'Update now'}</Button>{#if demo === 'BannerWithActionsDemo'}<Button size="sm">Extend session</Button>{/if}{/snippet}
      </Banner>
    {:else if demo === 'BannerCustomContentDemo'}
      <Banner icon={Info} title="Custom content supported" description="This banner supports custom content with Text." />
    {:else}
      <Banner icon={demo.includes('Error') ? WarningCircle : demo.includes('Alert') || demo.includes('Icon') ? Warning : Info} variant={demo.includes('Error') ? 'error' : demo.includes('Alert') || demo.includes('Icon') ? 'alert' : 'default'} title={demo.includes('Error') ? 'Save failed' : demo.includes('Alert') || demo.includes('Icon') ? 'Session expiring' : 'Update available'} description={demo.includes('Error') ? "We couldn't save your changes. Please try again." : demo.includes('Alert') || demo.includes('Icon') ? 'Your session will expire in 5 minutes.' : 'A new version is ready to install.'} />
    {/if}
  {:else if looksLike('Breadcrumbs')}
    {#if demo === 'BreadcrumbsLoadingDemo'}
      <Breadcrumbs>
        <Breadcrumbs.Link href="#" icon={House}>Home</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Current loading />
      </Breadcrumbs>
    {:else if demo === 'BreadcrumbsRootDemo'}
      <Breadcrumbs><Breadcrumbs.Current icon={House}>Worker Analytics</Breadcrumbs.Current></Breadcrumbs>
    {:else if demo === 'BreadcrumbsWithClipboardDemo'}
      <Breadcrumbs>
        <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
        <Breadcrumbs.Clipboard text="#" />
      </Breadcrumbs>
    {:else if demo === 'BreadcrumbsWithIconsDemo'}
      <Breadcrumbs>
        <Breadcrumbs.Link href="#" icon={House}>Home</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Link href="#">Projects</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Current>Current Project</Breadcrumbs.Current>
      </Breadcrumbs>
    {:else}
      <Breadcrumbs>
        <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
      </Breadcrumbs>
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
  {:else if looksLike('Autocomplete')}
    {#if demo === 'AutocompleteControlledDemo'}
      <div class="flex w-80 flex-col gap-3">
        <Autocomplete bind:value={autocompleteValue} items={autocompleteFruits}>
          <Autocomplete.InputGroup placeholder="Type a fruit…" />
          <Autocomplete.Content>
            <Autocomplete.List>
              {#snippet children(item)}
                <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
              {/snippet}
            </Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
        {#if autocompleteValue}
          <p class="text-sm text-kumo-subtle">Value: <span class="font-medium text-kumo-default">{autocompleteValue}</span></p>
        {/if}
      </div>
    {:else if demo === 'AutocompleteWithFieldDemo'}
      <div class="w-80">
        <Autocomplete items={autocompleteCountries} label="Country" description="Start typing to filter countries">
          <Autocomplete.InputGroup placeholder="Search countries…" />
          <Autocomplete.Content>
            <Autocomplete.List>
              {#snippet children(item)}
                <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
              {/snippet}
            </Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
      </div>
    {:else if demo === 'AutocompleteErrorDemo'}
      <div class="w-80">
        <Autocomplete items={autocompleteCountries} label="Country" error={{ message: 'Please enter a valid country', match: true }}>
          <Autocomplete.InputGroup placeholder="Search countries…" />
          <Autocomplete.Content>
            <Autocomplete.List>
              {#snippet children(item)}
                <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
              {/snippet}
            </Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
      </div>
    {:else if demo === 'AutocompleteGroupedDemo'}
      <Autocomplete items={autocompleteServerGroups}>
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
      </Autocomplete>
    {:else if demo === 'AutocompleteSizesDemo'}
      <div class="flex flex-wrap items-center gap-4">
        <Autocomplete items={autocompleteFruits.slice(0, 10)}>
          <Autocomplete.InputGroup size="xs" placeholder="xs" />
          <Autocomplete.Content>
            <Autocomplete.List>{#snippet children(item)}<Autocomplete.Item value={item}>{item}</Autocomplete.Item>{/snippet}</Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
        <Autocomplete items={autocompleteFruits.slice(0, 10)}>
          <Autocomplete.InputGroup size="sm" placeholder="sm" />
          <Autocomplete.Content>
            <Autocomplete.List>{#snippet children(item)}<Autocomplete.Item value={item}>{item}</Autocomplete.Item>{/snippet}</Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
        <Autocomplete items={autocompleteFruits.slice(0, 10)}>
          <Autocomplete.InputGroup size="base" placeholder="base (default)" />
          <Autocomplete.Content>
            <Autocomplete.List>{#snippet children(item)}<Autocomplete.Item value={item}>{item}</Autocomplete.Item>{/snippet}</Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
        <Autocomplete items={autocompleteFruits.slice(0, 10)}>
          <Autocomplete.InputGroup size="lg" placeholder="lg" />
          <Autocomplete.Content>
            <Autocomplete.List>{#snippet children(item)}<Autocomplete.Item value={item}>{item}</Autocomplete.Item>{/snippet}</Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
      </div>
    {:else}
      <Autocomplete items={autocompleteFruits}>
        <Autocomplete.InputGroup placeholder="Search fruits…" />
        <Autocomplete.Content>
          <Autocomplete.List>
            {#snippet children(item)}
              <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
            {/snippet}
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
    {/if}
  {:else if looksLike('Combobox')}
    {#if demo === 'ComboboxSearchableInsideDemo'}
      <Combobox bind:value={comboboxLanguage} items={comboboxLanguages}>
        <Combobox.TriggerValue class="w-[200px]" />
        <Combobox.Content>
          <Combobox.Input placeholder="Search languages" />
          <Combobox.Empty />
          <Combobox.List>
            {#snippet children(item)}
              <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
            {/snippet}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    {:else if demo === 'ComboboxSearchableSelectDemo'}
      <Combobox bind:value={comboboxNullable} items={comboboxLanguages}>
        <Combobox.TriggerValue class="w-[200px]" placeholder="Select a language" />
        <Combobox.Content>
          <Combobox.Input placeholder="Search languages" />
          <Combobox.Empty />
          <Combobox.List>
            {#snippet children(item)}
              <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
            {/snippet}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    {:else if demo === 'ComboboxGroupedDemo'}
      <Combobox items={comboboxServers}>
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
      </Combobox>
    {:else if demo === 'ComboboxMultipleDemo'}
      <div class="flex gap-2">
        <Combobox bind:value={comboboxMultiple} items={comboboxBots} multiple>
          <Combobox.TriggerMultipleWithInput class="w-[400px]" placeholder="Select bots" inputSide="right">
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
      </div>
    {:else if demo === 'ComboboxWithFieldDemo'}
      <div class="w-80">
        <Combobox items={comboboxDatabases} bind:value={comboboxNullable} label="Database" description="Select your preferred database">
          <Combobox.TriggerInput placeholder="Select database" />
          <Combobox.Content>
            <Combobox.Empty />
            <Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item.label}</Combobox.Item>{/snippet}</Combobox.List>
          </Combobox.Content>
        </Combobox>
      </div>
    {:else if demo === 'ComboboxDisabledDemo'}
      <div class="flex flex-wrap items-start gap-4">
        <Combobox value="Apple" items={comboboxFruits} disabled>
          <Combobox.TriggerInput class="w-[200px]" placeholder="Select fruit" />
          <Combobox.Content><Combobox.Empty /><Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item}</Combobox.Item>{/snippet}</Combobox.List></Combobox.Content>
        </Combobox>
        <Combobox value={comboboxLanguages[0]} items={comboboxLanguages} disabled>
          <Combobox.TriggerValue class="w-[200px]" />
          <Combobox.Content><Combobox.Input placeholder="Search" /><Combobox.Empty /><Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>{/snippet}</Combobox.List></Combobox.Content>
        </Combobox>
      </div>
    {:else if demo === 'ComboboxDisabledItemsDemo'}
      <div class="w-80">
        <Combobox items={[...comboboxDatabases.slice(0, 2), { value: 'mariadb', label: 'MariaDB', disabled: true, reason: 'Beta' }, ...comboboxDatabases.slice(3, 5), { value: 'cassandra', label: 'Apache Cassandra', disabled: true, reason: 'Coming soon' }]}>
          <Combobox.TriggerInput placeholder="Select database" />
          <Combobox.Content>
            <Combobox.Empty />
            <Combobox.List>
              {#snippet children(item)}
                <Combobox.Item value={item} disabled={item.disabled}>
                  <span>{item.label}{#if item.reason}<Text variant="secondary" size="xs" as="span"> - {item.reason}</Text>{/if}</span>
                </Combobox.Item>
              {/snippet}
            </Combobox.List>
          </Combobox.Content>
        </Combobox>
      </div>
    {:else if demo === 'ComboboxErrorDemo'}
      <div class="w-80">
        <Combobox items={comboboxDatabases} label="Database" error={{ message: 'Please select a database', match: true }}>
          <Combobox.TriggerInput placeholder="Select database" />
          <Combobox.Content><Combobox.Empty /><Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item.label}</Combobox.Item>{/snippet}</Combobox.List></Combobox.Content>
        </Combobox>
      </div>
    {:else if demo === 'ComboboxSizesDemo'}
      <div class="flex flex-wrap items-center gap-4">
        <Combobox size="sm" items={comboboxFruits.slice(0, 8)}>
          <Combobox.TriggerInput placeholder="Small (sm)" />
          <Combobox.Content><Combobox.Empty /><Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item}</Combobox.Item>{/snippet}</Combobox.List></Combobox.Content>
        </Combobox>
        <Combobox size="base" items={comboboxFruits.slice(0, 8)}>
          <Combobox.TriggerInput placeholder="Base (default)" />
          <Combobox.Content><Combobox.Empty /><Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item}</Combobox.Item>{/snippet}</Combobox.List></Combobox.Content>
        </Combobox>
      </div>
    {:else if demo === 'ComboboxSizesSearchableInsideDemo'}
      <div class="flex flex-wrap items-center gap-4">
        <Combobox size="sm" value={comboboxLanguages[0]} items={comboboxLanguages}>
          <Combobox.TriggerValue class="w-[160px]" />
          <Combobox.Content><Combobox.Input placeholder="Search" /><Combobox.Empty /><Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>{/snippet}</Combobox.List></Combobox.Content>
        </Combobox>
        <Combobox size="base" value={comboboxLanguages[1]} items={comboboxLanguages}>
          <Combobox.TriggerValue class="w-[180px]" />
          <Combobox.Content><Combobox.Input placeholder="Search" /><Combobox.Empty /><Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>{/snippet}</Combobox.List></Combobox.Content>
        </Combobox>
      </div>
    {:else if demo === 'ComboboxCustomTriggerDemo'}
      <Combobox bind:value={comboboxLanguage} items={comboboxLanguages}>
        <Combobox.Trigger class="rounded-md px-2 py-1 text-sm hover:bg-kumo-fill-hover">
          <Combobox.Value><span class="truncate">{comboboxLanguage.emoji} {comboboxLanguage.label}</span></Combobox.Value>
          <Search class="size-3.5 shrink-0 text-kumo-subtle" />
        </Combobox.Trigger>
        <Combobox.Content>
          <Combobox.Input placeholder="Search languages" />
          <Combobox.Empty />
          <Combobox.List>{#snippet children(item)}<Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>{/snippet}</Combobox.List>
        </Combobox.Content>
      </Combobox>
    {:else}
      <Combobox bind:value={comboboxValue} items={comboboxFruits}>
        <Combobox.TriggerInput placeholder="Please select" />
        <Combobox.Content>
          <Combobox.Empty />
          <Combobox.List>
            {#snippet children(item)}
              <Combobox.Item value={item}>{item}</Combobox.Item>
            {/snippet}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    {/if}
  {:else if looksLike('CommandPalette')}
    <CommandPalette commands={[{ label: 'Open dashboard' }, { label: 'Deploy project' }, { label: 'View logs' }, { label: 'Manage domains' }]} />
  {:else if looksLike('DatePicker')}
    {#if demo === 'DatePickerMultipleDemo'}
      <div class="flex flex-col gap-4">
        <DatePicker mode="multiple" selected={datePickerDates} onChange={(next) => (datePickerDates = next as Date[] | undefined)} max={5} />
        <p class="text-sm text-kumo-subtle">Selected: {datePickerDates?.length ?? 0} date(s)</p>
      </div>
    {:else if demo === 'DatePickerRangeDemo'}
      <div class="flex flex-col gap-4">
        <DatePicker mode="range" selected={datePickerRange} onChange={(next) => (datePickerRange = next as DateRange | undefined)} numberOfMonths={2} />
        <p class="text-sm text-kumo-subtle">
          Range: {datePickerRange?.from ? `${datePickerRange.from.toLocaleDateString()} - ${datePickerRange.to?.toLocaleDateString() ?? '...'}` : 'None'}
        </p>
      </div>
    {:else if demo === 'DatePickerRangeMinMaxDemo'}
      {#snippet rangeMinMaxFooter()}
        <span class="text-xs text-kumo-subtle">Select 3-7 nights</span>
      {/snippet}
      <div class="flex flex-col gap-4">
        <DatePicker mode="range" selected={datePickerRange} onChange={(next) => (datePickerRange = next as DateRange | undefined)} min={3} max={7} footer={rangeMinMaxFooter} />
      </div>
    {:else if demo === 'DatePickerPopoverDemo'}
      <Popover class="p-3">
        {#snippet trigger(props)}
          <Button variant="outline" icon={CalendarDotsIcon} {...props}>{datePickerDate ? datePickerDate.toLocaleDateString() : 'Pick a date'}</Button>
        {/snippet}
        <DatePicker mode="single" selected={datePickerDate} onChange={(next) => (datePickerDate = next as Date | undefined)} />
      </Popover>
    {:else if demo === 'DatePickerRangePopoverDemo'}
      <Popover class="p-3">
        {#snippet trigger(props)}
          <Button variant="outline" icon={CalendarDotsIcon} {...props}>{formatDateRange(datePickerRange)}</Button>
        {/snippet}
        <DatePicker mode="range" selected={datePickerRange} onChange={(next) => (datePickerRange = next as DateRange | undefined)} numberOfMonths={2} />
      </Popover>
    {:else if demo === 'DatePickerRangeWithPresetsDemo'}
      <Popover class="p-0">
        {#snippet trigger(props)}
          <Button variant="outline" icon={CalendarDotsIcon} {...props}>{formatDateRange(datePickerPresetRange)}</Button>
        {/snippet}
        <div class="flex">
          <div class="flex flex-col gap-1 border-r border-kumo-hairline p-2 text-sm">
            {#each datePickerPresets as preset (preset.label)}
              <button
                type="button"
                onclick={() => handleDatePresetClick(preset)}
                class={isDatePresetActive(preset)
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
              selected={datePickerPresetRange}
              onChange={(next) => (datePickerPresetRange = next as DateRange | undefined)}
              bind:month={datePickerPresetMonth}
              numberOfMonths={2}
            />
          </div>
        </div>
      </Popover>
    {:else if demo === 'DatePickerDisabledWithFooterDemo'}
      {#snippet disabledFooter()}
        <p class="w-full pt-2 text-xs text-kumo-subtle">{datePickerDates?.length ?? 0}/5 days selected. Grayed dates are unavailable.</p>
      {/snippet}
      <DatePicker
        mode="multiple"
        selected={datePickerDates}
        onChange={(next) => (datePickerDates = next as Date[] | undefined)}
        max={5}
        disabled={datePickerUnavailableDates}
        fixedWeeks
        footer={disabledFooter}
      />
    {:else}
      <div class="flex flex-col gap-4">
        <DatePicker
          mode="single"
          selected={datePickerDate}
          onChange={(next) => {
            if (next instanceof Date) datePickerDate = next;
          }}
        />
        <p class="text-sm text-kumo-subtle">Selected: {datePickerDate ? datePickerDate.toLocaleDateString() : 'None'}</p>
      </div>
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
    </Grid>
  {:else if demo === 'GridVariantsDemo'}
    <div class="flex w-full flex-col gap-8">
      <div>
        <p class="mb-2 text-kumo-subtle">variant="2up"</p>
        <Grid variant="2up" gap="sm">
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></Grid.Item>
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></Grid.Item>
        </Grid>
      </div>
      <div>
        <p class="mb-2 text-kumo-subtle">variant="3up"</p>
        <Grid variant="3up" gap="sm">
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></Grid.Item>
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></Grid.Item>
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>3</Text></Surface></Grid.Item>
        </Grid>
      </div>
      <div>
        <p class="mb-2 text-kumo-subtle">variant="4up"</p>
        <Grid variant="4up" gap="sm">
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></Grid.Item>
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></Grid.Item>
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>3</Text></Surface></Grid.Item>
          <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>4</Text></Surface></Grid.Item>
        </Grid>
      </div>
    </div>
  {:else if demo === 'GridAsymmetricDemo'}
    <div class="flex w-full flex-col gap-8">
      <div>
        <p class="mb-2 text-kumo-subtle">variant="2-1" (66% / 33%)</p>
        <Grid variant="2-1" gap="sm">
          <Grid.Item><Surface class="rounded-lg p-4"><Text bold>Main Content</Text><div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div></Surface></Grid.Item>
          <Grid.Item><Surface class="rounded-lg p-4"><Text bold>Sidebar</Text><div class="mt-1"><Text variant="secondary">One-third width</Text></div></Surface></Grid.Item>
        </Grid>
      </div>
      <div>
        <p class="mb-2 text-kumo-subtle">variant="1-2" (33% / 66%)</p>
        <Grid variant="1-2" gap="sm">
          <Grid.Item><Surface class="rounded-lg p-4"><Text bold>Sidebar</Text><div class="mt-1"><Text variant="secondary">One-third width</Text></div></Surface></Grid.Item>
          <Grid.Item><Surface class="rounded-lg p-4"><Text bold>Main Content</Text><div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div></Surface></Grid.Item>
        </Grid>
      </div>
    </div>
  {:else if demo === 'GridGapDemo'}
    <div class="flex w-full flex-col gap-8">
      {#each gridGaps as gridGap}
        <div>
          <p class="mb-2 text-kumo-subtle">gap="{gridGap}"{gridGap === 'base' ? ' (default, responsive)' : ''}</p>
          <Grid variant="side-by-side" gap={gridGap}>
            <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface></Grid.Item>
            <Grid.Item><Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface></Grid.Item>
          </Grid>
        </div>
      {/each}
    </div>
  {:else if demo === 'GridMobileDividerDemo'}
    <Grid variant="4up" gap="base" mobileDivider class="w-full">
      {#each [1, 2, 3, 4] as item}
        <Grid.Item>
          <Surface class="rounded-lg p-4">
            <Text bold>Item {item}</Text>
            <div class="mt-1">
              <Text variant="secondary">Has divider on mobile</Text>
            </div>
          </Surface>
        </Grid.Item>
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
        <InputGroup class="w-full max-w-3xs"><InputGroup.Addon>@</InputGroup.Addon><InputGroup.Input placeholder="username" aria-label="Username" /></InputGroup>
        <InputGroup class="w-full max-w-3xs"><InputGroup.Input placeholder="email" aria-label="Email" /><InputGroup.Addon align="end">@example.com</InputGroup.Addon></InputGroup>
        <InputGroup class="w-full max-w-3xs"><InputGroup.Addon>/api/</InputGroup.Addon><InputGroup.Input placeholder="endpoint" aria-label="API path" /><InputGroup.Addon align="end">.json</InputGroup.Addon></InputGroup>
      </div>
    {:else if demo === 'InputGroupButtonsDemo'}
      <div class="flex flex-col gap-4">
        <InputGroup class="w-full max-w-3xs"><InputGroup.Input type="password" value="password" aria-label="Password" /><InputGroup.Addon align="end"><InputGroup.Button icon={Eye} class="text-kumo-subtle" aria-label="Show password" /></InputGroup.Addon></InputGroup>
        <InputGroup class="w-full max-w-3xs" focusMode="hybrid"><InputGroup.Addon><Search /></InputGroup.Addon><InputGroup.Input value="search" aria-label="Search" /><InputGroup.Addon align="end" class="pr-1"><InputGroup.Button aria-label="Clear search"><X /></InputGroup.Button></InputGroup.Addon><InputGroup.Button variant="secondary">Search</InputGroup.Button></InputGroup>
      </div>
    {:else if demo === 'InputGroupKbdDemo'}
      <InputGroup class="w-full max-w-3xs"><InputGroup.Addon><Search /></InputGroup.Addon><InputGroup.Input placeholder="Search..." aria-label="Search" /><InputGroup.Addon align="end"><kbd class="border-none! bg-none!">⌘K</kbd></InputGroup.Addon></InputGroup>
    {:else if demo === 'InputGroupLoadingDemo'}
      <InputGroup class="w-full max-w-3xs"><InputGroup.Input value="checking" aria-label="Domain" /><InputGroup.Suffix>.workers.dev</InputGroup.Suffix><InputGroup.Addon align="end"><Loader /></InputGroup.Addon></InputGroup>
    {:else if demo === 'InputGroupTooltipButtonDemo'}
      <InputGroup class="w-full max-w-2xs"><InputGroup.Addon><Search /></InputGroup.Addon><InputGroup.Input placeholder="Search with query language..." aria-label="Search" /><InputGroup.Addon align="end"><InputGroup.Button icon={HelpCircle} tooltip="Query language help" class="text-kumo-subtle" /></InputGroup.Addon></InputGroup>
    {:else if demo === 'InputGroupIconsDemo'}
      <InputGroup class="w-full max-w-3xs"><InputGroup.Addon><Link2 /></InputGroup.Addon><InputGroup.Input placeholder="Paste a link..." aria-label="Link" /></InputGroup>
    {:else}
      <InputGroup class="w-full max-w-2xs"><InputGroup.Input value="kumo" maxlength={20} /><InputGroup.Suffix>.workers.dev</InputGroup.Suffix><InputGroup.Addon align="end"><CheckCircle class="text-kumo-success" /></InputGroup.Addon></InputGroup>
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
    {#if demo === 'PaginationSimpleDemo'}
      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={10} totalCount={100} controls="simple" />
    {:else if demo === 'PaginationFullDemo'}
      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={10} totalCount={100} controls="full" />
    {:else if demo === 'PaginationMidPageDemo'}
      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={10} totalCount={100} />
    {:else if demo === 'PaginationLargeDatasetDemo'}
      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={25} totalCount={1250} />
    {:else if demo === 'PaginationCustomTextDemo'}
      <Pagination
        page={paginationPage} setPage={setPaginationPage}
        perPage={25}
        totalCount={100}
        text={({ perPage }) => `Page ${paginationPage} - showing ${perPage} per page`}
      />
    {:else if demo === 'PaginationPageSizeSelectorDemo' || demo === 'PaginationDropdownSelectorDemo'}
      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={paginationPerPage} totalCount={500}>
        <Pagination.Info />
        <Pagination.Separator />
        <Pagination.PageSize
          value={paginationPerPage}
          onChange={(size) => {
            setPaginationPerPage(size);
            setPaginationPage(1);
          }}
        />
        <Pagination.Controls pageSelector={demo === 'PaginationDropdownSelectorDemo' ? 'dropdown' : 'input'} />
      </Pagination>
    {:else if demo === 'PaginationCustomPageSizeOptionsDemo'}
      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={paginationPerPage} totalCount={200}>
        <Pagination.Info />
        <Pagination.Separator />
        <Pagination.PageSize
          value={paginationPerPage}
          options={[10, 20, 50]}
          onChange={(size) => {
            setPaginationPerPage(size);
            setPaginationPage(1);
          }}
        />
        <Pagination.Controls />
      </Pagination>
    {:else if demo === 'PaginationPageSizeRightDemo'}
      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={paginationPerPage} totalCount={500}>
        <Pagination.Info />
        <div class="flex items-center gap-2">
          <Pagination.Controls />
          <Pagination.Separator />
          <Pagination.PageSize
            value={paginationPerPage}
            onChange={(size) => {
              setPaginationPerPage(size);
              setPaginationPage(1);
            }}
          />
        </div>
      </Pagination>
    {:else}
      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={10} totalCount={100} />
    {/if}
  {:else if looksLike('PageHeader')}
    <div class="w-full">
      {#snippet pageHeaderBreadcrumbs()}
        <Breadcrumbs>
          {#if demo === 'PageHeaderHeroDemo'}
            <Breadcrumbs.Link icon={House} href="#">Workers & Pages</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Current>cloudflare-dev-platform</Breadcrumbs.Current>
          {:else if demo === 'PageHeaderBasicDemo'}
            <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Current>Dashboard</Breadcrumbs.Current>
          {:else if demo === 'PageHeaderWithIconsDemo'}
            <Breadcrumbs.Link icon={House} href="#">Home</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Current icon={Settings}>Settings</Breadcrumbs.Current>
          {:else if demo === 'PageHeaderWithTabsDemo'}
            <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Current>Settings</Breadcrumbs.Current>
          {:else if demo === 'PageHeaderWithActionsDemo'}
            <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Link href="#">Projects</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Current>My Project</Breadcrumbs.Current>
          {:else}
            <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Link href="#">Products</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Current>Page title</Breadcrumbs.Current>
          {/if}
        </Breadcrumbs>
      {/snippet}
      {#snippet pageHeaderActions()}
        {#if demo === 'PageHeaderHeroDemo'}
          <Button icon={Code2} class="h-8">Edit code</Button>
          <Button icon={Globe} variant="primary" class="h-8">Visit</Button>
        {:else if demo === 'PageHeaderWithActionsDemo'}
          <Button variant="primary" size="base">Deploy</Button>
        {:else if demo === 'PageHeaderCompleteDemo'}
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="primary" size="sm" icon={Plus}>New Item</Button>
        {/if}
      {/snippet}
      <PageHeader
        class="w-full"
        breadcrumbContent={pageHeaderBreadcrumbs}
        title={demo === 'PageHeaderWithTitleDemo' || demo === 'PageHeaderWithTitleDescriptionDemo' || demo === 'PageHeaderCompleteDemo' ? 'Page title' : undefined}
        description={demo === 'PageHeaderWithTitleDescriptionDemo'
          ? 'Action-led, value-oriented description of what this page does. Optional second sentence with use cases or prerequisites.'
          : demo === 'PageHeaderCompleteDemo'
            ? 'Action-led, value-oriented description of what this page does.'
            : undefined}
        tabs={demo === 'PageHeaderHeroDemo'
          ? [
              { label: 'Overview', value: 'overview' },
              { label: 'Metrics', value: 'metrics' },
              { label: 'Deployments', value: 'deployments' },
              { label: 'Bindings', value: 'bindings' },
              { label: 'Observability', value: 'observability' },
              { label: 'Settings', value: 'settings' }
            ]
          : demo === 'PageHeaderWithTabsDemo'
            ? [
                { label: 'General', value: 'general' },
                { label: 'Security', value: 'security' },
                { label: 'Notifications', value: 'notifications' }
              ]
            : demo === 'PageHeaderWithActionsDemo'
              ? [
                  { label: 'Overview', value: 'overview' },
                  { label: 'Settings', value: 'settings' }
                ]
              : demo === 'PageHeaderCompleteDemo'
                ? [
                    { label: 'Overview', value: 'overview' },
                    { label: 'Analytics', value: 'analytics' },
                    { label: 'Settings', value: 'settings' }
                  ]
                : []}
        bind:activeTab={pageHeaderTab}
        defaultTab={demo === 'PageHeaderWithTabsDemo' ? 'general' : 'overview'}
        actions={demo === 'PageHeaderHeroDemo' || demo === 'PageHeaderWithActionsDemo' || demo === 'PageHeaderCompleteDemo' ? pageHeaderActions : undefined}
      />
    </div>
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
    {#snippet resourceUsage()}
      <Surface class="p-4">
        <h3 class="mb-2 font-semibold">{demo === 'ResourceListWithUsageDemo' ? 'Quick Start' : 'Usage Example'}</h3>
        {#if demo === 'ResourceListWithUsageDemo'}
          <p class="mb-3 text-sm text-kumo-subtle">Generate an API key to authenticate your requests</p>
          <Code lang="bash" code={'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com'} />
        {:else}
          <Code
            lang="ts"
            code={`// Read from KV
const value = await KV.get('key');

// Write to KV
await KV.put('key', 'value');`}
          />
        {/if}
      </Surface>
    {/snippet}
    {#snippet resourceAdditionalContent()}
      <Surface class="p-4">
        <h3 class="mb-2 font-semibold">Learn More</h3>
        <p class="text-sm text-kumo-subtle">Check out our documentation to learn more about KV storage.</p>
      </Surface>
    {/snippet}
    <div class="w-full">
      <ResourceListPage
        class="min-h-[400px]"
        title={demo === 'ResourceListWithUsageDemo' ? 'API Keys' : demo === 'ResourceListCompleteDemo' ? 'KV Namespaces' : 'Databases'}
        description={demo === 'ResourceListWithUsageDemo'
          ? 'Create and manage API keys for your applications'
          : demo === 'ResourceListCompleteDemo'
            ? 'Store key-value data globally with low-latency access'
            : 'Manage your database instances and configurations'}
        icon={demo === 'ResourceListWithUsageDemo' ? undefined : Database}
        usage={demo === 'ResourceListWithUsageDemo' || demo === 'ResourceListCompleteDemo' ? resourceUsage : undefined}
        additionalContent={demo === 'ResourceListCompleteDemo' ? resourceAdditionalContent : undefined}
      >
        {#if demo === 'ResourceListCompleteDemo'}
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
        {:else}
          <Surface class="p-6">
            <p>{demo === 'ResourceListWithUsageDemo' ? 'API keys list would appear here' : 'Main content area - your resource list would go here'}</p>
          </Surface>
        {/if}
      </ResourceListPage>
    </div>
  {:else if looksLike('DeleteResource')}
    <Button variant="destructive" onclick={openDeleteResource}>
      {demo === 'DeleteResourceWorkerDemo' ? 'Delete Worker' : 'Delete Zone'}
    </Button>
    <DeleteResource
      bind:open={deleteResourceOpen}
      onOpenChange={(open) => (deleteResourceOpen = open)}
      resourceType={demo === 'DeleteResourceWorkerDemo' ? 'Worker' : 'Zone'}
      resourceName={demo === 'DeleteResourceWorkerDemo' ? 'api-gateway-worker' : 'example.com'}
      errorMessage={demo === 'DeleteResourceErrorDemo' ? deleteResourceErrorMessage : undefined}
      isDeleting={deleteResourceDeleting}
      onDelete={handleDeleteResource}
    />
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
    {#if demo === 'SensitiveInputSizesDemo'}
      <div class="flex flex-col gap-4">
        {#each sensitiveInputSizes as sensitiveSize (sensitiveSize)}
          <div class="flex items-center gap-2">
            <span class="w-12 text-sm text-kumo-subtle">{sensitiveSize}</span>
            <SensitiveInput
              label={`${sensitiveSize} size`}
              size={sensitiveSize}
              defaultValue="secret-api-key-123"
            />
          </div>
        {/each}
      </div>
    {:else if demo === 'SensitiveInputControlledDemo'}
      <div class="flex w-80 flex-col gap-4">
        <SensitiveInput label="Controlled Secret" value={sensitiveInputValue} onValueChange={(next) => (sensitiveInputValue = next)} />
        <div class="text-sm text-kumo-subtle">
          Current value: <code class="text-kumo-default">{sensitiveInputValue}</code>
        </div>
        <div class="flex gap-2">
          <Button onclick={() => (sensitiveInputValue = `new-secret-${Date.now()}`)} variant="primary" size="sm">Change value</Button>
          <Button onclick={() => (sensitiveInputValue = '')} variant="secondary" size="sm">Clear</Button>
        </div>
      </div>
    {:else if demo === 'SensitiveInputStatesDemo'}
      <div class="flex w-80 flex-col gap-4">
        <SensitiveInput label="Error State" variant="error" defaultValue="invalid-key" error="This API key is not valid" />
        <SensitiveInput label="Disabled" defaultValue="cannot-edit" disabled />
        <SensitiveInput label="Read-only" defaultValue="view-only-secret-key" readOnly />
        <SensitiveInput label="With Description" defaultValue="my-secret-value" description="Keep this value secure and don't share it" />
      </div>
    {:else}
      <div class="w-80">
        <SensitiveInput label="API Key" defaultValue="sk_live_abc123xyz789" />
      </div>
    {/if}
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
    <Switch.Group legend="Notification settings">
      <Switch.Item label="Email notifications" />
      <Switch.Item label="SMS notifications" />
      <Switch.Item label="Push notifications" />
    </Switch.Group>
  {:else if demo === 'SwitchLegendSrOnlyDemo'}
    <Switch.Group>
      <Switch.Legend class="sr-only">Notification settings</Switch.Legend>
      <Switch.Item label="Email notifications" />
      <Switch.Item label="SMS notifications" />
      <Switch.Item label="Push notifications" />
    </Switch.Group>
  {:else if demo === 'SwitchLegendCustomDemo'}
    <Switch.Group>
      <Switch.Legend class="text-sm font-normal text-kumo-subtle">Notification settings</Switch.Legend>
      <Switch.Item label="Email notifications" />
      <Switch.Item label="SMS notifications" />
      <Switch.Item label="Push notifications" />
    </Switch.Group>
  {:else if looksLike('Switch')}
    <Switch label="Switch" checked={demo.includes('On') || demo.includes('Basic')} />
  {:else if looksLike('TableOfContents')}
    <div class="min-w-48">
      {#if demo === 'TableOfContentsBasicDemo'}
        <TableOfContents>
          <TableOfContents.Title>On this page</TableOfContents.Title>
          <TableOfContents.List>
            {#each tableOfContentsHeadings as heading (heading)}
              <TableOfContents.Item active={heading === 'Usage'} class="cursor-pointer">
                {heading}
              </TableOfContents.Item>
            {/each}
          </TableOfContents.List>
        </TableOfContents>
      {:else if demo === 'TableOfContentsInteractiveDemo'}
        <TableOfContents>
          <TableOfContents.Title>On this page</TableOfContents.Title>
          <TableOfContents.List>
            {#each tableOfContentsHeadings as heading (heading)}
              <TableOfContents.Item
                active={heading === tableOfContentsActive}
                onclick={() => (tableOfContentsActive = heading)}
                class="cursor-pointer"
              >
                {heading}
              </TableOfContents.Item>
            {/each}
          </TableOfContents.List>
        </TableOfContents>
      {:else if demo === 'TableOfContentsNoActiveDemo'}
        <TableOfContents>
          <TableOfContents.Title>On this page</TableOfContents.Title>
          <TableOfContents.List>
            {#each tableOfContentsHeadings as heading (heading)}
              <TableOfContents.Item class="cursor-pointer">
                {heading}
              </TableOfContents.Item>
            {/each}
          </TableOfContents.List>
        </TableOfContents>
      {:else if demo === 'TableOfContentsGroupDemo'}
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
      {:else if demo === 'TableOfContentsWithoutTitleDemo'}
        <TableOfContents>
          <TableOfContents.List>
            {#each tableOfContentsHeadings.slice(0, 3) as heading (heading)}
              <TableOfContents.Item active={heading === 'Introduction'} class="cursor-pointer">
                {heading}
              </TableOfContents.Item>
            {/each}
          </TableOfContents.List>
        </TableOfContents>
      {:else if demo === 'TableOfContentsRenderPropDemo'}
        <div class="space-y-3">
          <TableOfContents>
            <TableOfContents.List>
              {#each ['Introduction', 'Installation', 'Usage'] as heading (heading)}
                <TableOfContents.Item
                  as="button"
                  type="button"
                  active={heading === 'Introduction'}
                  onclick={() => (tableOfContentsClicked = heading)}
                >
                  {heading}
                </TableOfContents.Item>
              {/each}
            </TableOfContents.List>
          </TableOfContents>
          {#if tableOfContentsClicked}
            <p class="text-xs text-kumo-subtle">Clicked: {tableOfContentsClicked}</p>
          {/if}
        </div>
      {:else}
        <TableOfContents>
          <TableOfContents.Title>On this page</TableOfContents.Title>
          <TableOfContents.List>
            {#each tableOfContentsHeadings.slice(0, 3) as heading (heading)}
              <TableOfContents.Item active={heading === 'Introduction'}>{heading}</TableOfContents.Item>
            {/each}
          </TableOfContents.List>
        </TableOfContents>
      {/if}
    </div>
  {:else if looksLike('Table')}
    <LayerCard class="w-full max-w-md overflow-x-auto p-0">
      <Table>
        <Table.Header variant={demo.includes('Compact') ? 'compact' : 'default'}>
          <Table.Row><Table.Head>Subject</Table.Head><Table.Head>From</Table.Head><Table.Head>Date</Table.Head></Table.Row>
        </Table.Header>
        <Table.Body>
          {#each emailRows as row, index (row.subject)}
            <Table.Row variant={demo.includes('Selected') && index === 1 ? 'selected' : 'default'}>
              <Table.Cell>{row.subject}</Table.Cell><Table.Cell>{row.from}</Table.Cell><Table.Cell>{row.date}</Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
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
