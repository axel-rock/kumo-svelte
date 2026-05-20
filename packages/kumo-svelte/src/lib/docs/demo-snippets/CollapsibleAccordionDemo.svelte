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
  import { DeleteResource } from '../../../blocks/delete-resource';
  import { PageHeader } from '../../../blocks/page-header';
  import { ResourceListPage } from '../../../blocks/resource-list';

  const demo: string = 'CollapsibleAccordionDemo';

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
<Collapsible open={demo.includes('Hero') || demo.includes('Basic')}>
      {#snippet trigger()}Build details{/snippet}
      <p class="text-sm text-kumo-subtle">Dependencies installed, routes generated, and static assets uploaded.</p>
    </Collapsible>
</div>
