<script lang="ts">
  import {
    Warning,
    TextB,
    CheckCircle,
    TextItalic,
    Globe,
    WarningOctagon,
    Plus,
    MagnifyingGlass
  } from 'phosphor-svelte';
  import {
    Badge,
    Banner,
    Button,
    Checkbox,
    ClipboardText,
    CodeBlock,
    Collapsible,
    Combobox,
    Autocomplete,
    CommandPalette,
    DatePicker,
    Dialog,
    DropdownMenu,
    Empty,
    Flow,
    Grid,
    GridItem,
    Input,
    InputArea,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupSuffix,
    Label,
    LayerCard,
    Link,
    Loader,
    MenuBar,
    Meter,
    Pagination,
    PaginationControls,
    PopoverContent,
    PopoverDescription,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
    Radio,
    Select,
    SensitiveInput,
    SkeletonLine,
    Switch,
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
    createKumoToastManager,
    Tooltip
  } from '$lib';
  import Header from '$lib/docs/Header.svelte';

  const options = [
    { label: 'All deployed versions', value: 'all' },
    { label: 'Active versions', value: 'active' },
    { label: 'Specific versions', value: 'specific' }
  ];

  const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange'];

  const commands = [
    { label: 'Open dashboard' },
    { label: 'Create worker' },
    { label: 'Deploy project' }
  ];

  const tabs = [
    { value: 'home', label: 'Home' },
    { value: 'about', label: 'About' },
    { value: 'contact', label: 'Contact' }
  ];

  let switchToggled = $state(true);
  let checked = $state(true);
  let page = $state(1);
  let activeTab = $state('home');
  let activeMenuOption = $state<number | undefined>(0);
  let collapsibleOpen = $state(false);
  const toastManager = createKumoToastManager();
</script>

<div class="flex flex-col">
  <Header />
  <main class="flex grow flex-col md:pr-12">
    <span id="introduction" class="sr-only">Introduction</span>
    <span id="installation" class="sr-only">Installation</span>
    <span id="usage" class="sr-only">Usage</span>
    <div class="mx-auto w-full grow md:border-r md:border-kumo-hairline">
      <ul class="grid auto-rows-min grid-cols-1 gap-px bg-kumo-hairline md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="button" href="/components/button" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Button</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="grid gap-3">
            <Button icon={Plus}>Create Worker</Button>
            <Button variant="primary" icon={Plus}>Create Worker</Button>
            <Button loading>Create Worker</Button>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="input" href="/components/input" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Input</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="grid gap-3">
            <Input placeholder="Type something..." />
            <Input value="Invalid!" variant="error" />
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="select" href="/components/select" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Select</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Select class="w-[200px]" placeholder="Select version" {options} />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="autocomplete" href="/components/autocomplete" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Autocomplete</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Autocomplete class="w-[200px]" items={fruits}>
            <Autocomplete.InputGroup placeholder="Search fruits..." />
            <Autocomplete.Content>
              <Autocomplete.List>
                {#snippet children(item)}
                  <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
                {/snippet}
              </Autocomplete.List>
            </Autocomplete.Content>
          </Autocomplete>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="combobox" href="/components/combobox" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Combobox</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Combobox
            options={[
              { label: 'bug', value: 'bug' },
              { label: 'documentation', value: 'documentation' },
              { label: 'enhancement', value: 'enhancement' },
              { label: 'help wanted', value: 'help-wanted' },
              { label: 'good first issue', value: 'good-first-issue' }
            ]}
            placeholder="Select an issue..."
          />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="switch" href="/components/switch" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Switch</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Switch bind:checked={switchToggled} />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="input" href="/components/input" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Input (with validation)</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="grid w-[220px] gap-1.5">
            <Label for="home-email">Email</Label>
            <Input id="home-email" placeholder="name@example.com" type="email" value="Invalid!" invalid />
            <p class="text-xs text-kumo-danger">Please enter a valid email.</p>
            <p class="text-xs text-kumo-subtle">The email to send notifications to.</p>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="dialog" href="/components/dialog" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Dialog</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          {#snippet dialogTrigger(props: Record<string, unknown>)}
            <Button {...props}>Click me!</Button>
          {/snippet}
          <Dialog trigger={dialogTrigger} title="Hello!" description="I'm a dialog." />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="tooltip" href="/components/tooltip" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Tooltip</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex gap-2">
            {#snippet addTooltipTrigger(props: Record<string, unknown>)}
              <Button {...props} shape="square" icon={Plus} aria-label="Add" />
            {/snippet}
            <Tooltip trigger={addTooltipTrigger} open>Add</Tooltip>
            {#snippet languageTooltipTrigger(props: Record<string, unknown>)}
              <Button {...props} shape="square" icon={Globe} aria-label="Change language" />
            {/snippet}
            <Tooltip trigger={languageTooltipTrigger}>Change language</Tooltip>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="dropdown" href="/components/dropdown" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Dropdown</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <Button icon={Plus}>Add</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Worker</DropdownMenu.Item>
              <DropdownMenu.Item>Pages</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="collapsible" href="/components/collapsible" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Collapsible</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Collapsible bind:open={collapsibleOpen} title="What is Kumo?">Kumo is Cloudflare's component library.</Collapsible>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="checkbox" href="/components/checkbox" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Checkbox</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Checkbox bind:checked={checked}>Max bandwidth</Checkbox>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="layer-card" href="/components/layer-card" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">LayerCard</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <LayerCard class="w-[200px]">
            <LayerCard.Secondary>Next Steps</LayerCard.Secondary>
            <LayerCard.Primary>Hello</LayerCard.Primary>
          </LayerCard>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="loader" href="/components/loader" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Loader</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><Loader /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="skeleton-line" href="/components/skeleton-line" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">SkeletonLine</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex w-[200px] flex-col gap-2">
            <SkeletonLine minWidth={50} maxWidth={100} />
            <SkeletonLine minWidth={100} />
            <SkeletonLine minWidth={50} maxWidth={150} />
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="code-highlighted" href="/components/code-highlighted" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">CodeHighlighted</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <CodeBlock
            lang="ts"
            code={`const sum = (a: number, b: number) => {
  return a + b;
};`}
          />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="banner" href="/components/banner" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Banner</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-2">
            <Banner text="This is a default banner." />
            <Banner text="This is an alert banner." variant="alert" icon={Warning} />
            <Banner text="This is an error banner." variant="error" icon={WarningOctagon} />
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="tabs" href="/components/tabs" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Tabs</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><Tabs items={tabs} bind:value={activeTab} /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="badge" href="/components/badge" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Badge</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-2">
            <Badge variant="blue">Blue</Badge>
            <Badge variant="green">Green</Badge>
            <Badge variant="orange">Orange</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="red">Red</Badge>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="toast" href="/components/toast" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Toast</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Toasty {toastManager}>
            <Button
              onclick={() =>
                toastManager.add({
                  title: 'Toast created',
                  description: 'This is a toast notification.',
                  variant: 'warning'
                })}
            >
              Give me a toast
            </Button>
          </Toasty>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="pagination" href="/components/pagination" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Pagination</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Pagination bind:page perPage={10} totalCount={100} class="w-auto">
            <PaginationControls />
          </Pagination>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="input-area" href="/components/input-area" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">InputArea</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><InputArea placeholder="Enter your name" /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="input-group" href="/components/input-group" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">InputGroup</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="w-full max-w-2xs">
            <InputGroup>
              <InputGroupInput value="kumo" maxlength={20} aria-label="Subdomain" />
              <InputGroupSuffix>.workers.dev</InputGroupSuffix>
              <InputGroupAddon align="end">
                <CheckCircle weight="duotone" class="text-kumo-success" />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="meter" href="/components/meter" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Meter</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Meter value={75} label="My meter" customValue="100 / 5,000" />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="menu-bar" href="/components/menu-bar" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">MenuBar</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <MenuBar
            isActive={activeMenuOption}
            options={[
              {
                icon: TextB,
                tooltip: 'Bold',
                onClick: () => (activeMenuOption = activeMenuOption === 0 ? undefined : 0)
              },
              {
                icon: TextItalic,
                tooltip: 'Italic',
                onClick: () => (activeMenuOption = activeMenuOption === 1 ? undefined : 1)
              }
            ]}
          />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="date-picker" href="/components/date-picker" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">DatePicker</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="-m-4 scale-85"><DatePicker /></div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="breadcrumbs" href="/components/breadcrumbs" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Breadcrumbs</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex items-center gap-1 text-sm">
            <span class="text-kumo-subtle">Home</span>
            <span class="text-kumo-inactive">/</span>
            <span class="text-kumo-subtle">Docs</span>
            <span class="text-kumo-inactive">/</span>
            <span class="font-medium">Page</span>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="clipboard-text" href="/components/clipboard-text" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">ClipboardText</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><ClipboardText text="npx kumo add button" /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="command-palette" href="/components/command-palette" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">CommandPalette</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Button icon={MagnifyingGlass}>Open Command Palette</Button>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="flow" href="/components/flow" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Flow</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Flow canvas={false}>
            <Flow.Node>Step 1</Flow.Node>
            <Flow.Node>Step 2</Flow.Node>
          </Flow>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="link" href="/components/link" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Link</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-2 text-sm">
            <Link href="#">Default link</Link>
            <Link href="#" variant="current">Current color link</Link>
            <Link href="#" variant="plain">Plain link</Link>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="empty" href="/components/empty" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Empty</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col items-center gap-1 text-center">
            <span class="text-sm font-medium">No results</span>
            <span class="text-xs text-kumo-subtle">Try a different search</span>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="grid" href="/components/grid" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Grid</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Grid variant="side-by-side" gap="sm" class="w-[140px]">
            {#each [1, 2, 3, 4] as item (item)}
              <GridItem class="rounded bg-kumo-control p-3 text-center text-xs">{item}</GridItem>
            {/each}
          </Grid>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="label" href="/components/label" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Label</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-2">
            <Label>Default Label</Label>
            <Label showOptional>Optional Field</Label>
            <Label tooltip="More info">With Tooltip</Label>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="popover" href="/components/popover" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Popover</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <PopoverRoot>
            <PopoverTrigger>
              Open Popover
            </PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>Popover Title</PopoverTitle>
              <PopoverDescription>This is a popover.</PopoverDescription>
            </PopoverContent>
          </PopoverRoot>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="radio" href="/components/radio" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Radio</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Radio.Group legend="Select option" defaultValue="option1">
            <Radio.Item value="option1" label="Option 1" />
            <Radio.Item value="option2" label="Option 2" />
          </Radio.Group>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="sensitive-input" href="/components/sensitive-input" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">SensitiveInput</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><SensitiveInput value="super-secret-api-key" readonly /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="table" href="/components/table" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Table</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Table class="w-[200px] text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Worker 1</TableCell><TableCell>Active</TableCell></TableRow>
              <TableRow><TableCell>Worker 2</TableCell><TableCell>Paused</TableCell></TableRow>
              <TableRow><TableCell>Worker 3</TableCell><TableCell>Active</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="table-of-contents" href="/components/table-of-contents" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">TableOfContents</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <TableOfContents>
            <TableOfContents.Title>On this page</TableOfContents.Title>
            <TableOfContents.List>
              <TableOfContents.Item active>Introduction</TableOfContents.Item>
              <TableOfContents.Item>Installation</TableOfContents.Item>
              <TableOfContents.Item>Usage</TableOfContents.Item>
            </TableOfContents.List>
          </TableOfContents>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="text" href="/components/text" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Text</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-1">
            <Text size="lg" bold>Large Bold Text</Text>
            <Text size="base">Regular text content</Text>
            <Text size="sm" color="subtle">Small subtle text</Text>
          </div>
        </div>
      </li>
      </ul>
    </div>
  </main>
</div>
