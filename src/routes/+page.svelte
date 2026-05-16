<script lang="ts">
  import {
    Badge,
    Banner,
    Button,
    Checkbox,
    ClipboardText,
    Code,
    Collapsible,
    Combobox,
    Autocomplete,
    CommandPalette,
    DatePicker,
    Dialog,
    DropdownMenu,
    Empty,
    Grid,
    Input,
    InputArea,
    InputGroup,
    Label,
    LayerCard,
    Link,
    Loader,
    MenuBar,
    Meter,
    Pagination,
    Popover,
    Radio,
    Select,
    SensitiveInput,
    Switch,
    Table,
    TableOfContents,
    Tabs,
    Text,
    Toasty,
    Tooltip
  } from '$lib';
  import Header from '$lib/docs/Header.svelte';

  const options = [
    { label: 'All deployed versions', value: 'all' },
    { label: 'Active versions', value: 'active' },
    { label: 'Specific versions', value: 'specific' }
  ];

  const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange'].map((value) => ({
    label: value,
    value: value.toLowerCase()
  }));

  const commands = [
    { label: 'Open dashboard' },
    { label: 'Create worker' },
    { label: 'Deploy project' }
  ];

  const toc = [
    { title: 'Introduction', href: '#introduction' },
    { title: 'Installation', href: '#installation' },
    { title: 'Usage', href: '#usage' }
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
        <a id="button" href="#button" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Button</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="grid gap-3">
            <Button>Create Worker</Button>
            <Button variant="primary">Create Worker</Button>
            <Button loading>Create Worker</Button>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="input" href="#input" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Input</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="grid gap-3">
            <Input placeholder="Type something..." />
            <Input value="Invalid!" variant="error" />
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="select" href="#select" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Select</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Select class="w-[200px]" placeholder="Select version" {options} />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="autocomplete" href="/components/autocomplete" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Autocomplete</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Autocomplete class="w-[200px]" options={fruits} placeholder="Search fruits..." />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="combobox" href="#combobox" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Combobox</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Combobox options={fruits} placeholder="Search fruits..." />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="switch" href="#switch" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Switch</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Switch bind:checked={switchToggled} />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="input-validation" href="/components/input" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Input (with validation)</a>
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
        <a id="dialog" href="#dialog" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Dialog</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          {#snippet dialogTrigger()}Click me!{/snippet}
          <Dialog trigger={dialogTrigger} title="Hello!" description="I'm a dialog.">
            <Text>Ported with bits-ui dialog primitives.</Text>
          </Dialog>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="tooltip" href="#tooltip" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Tooltip</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          {#snippet tooltipTrigger()}+{/snippet}
          {#snippet tooltipContent()}Add{/snippet}
          <Tooltip trigger={tooltipTrigger}>{@render tooltipContent()}</Tooltip>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="dropdown" href="#dropdown" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Dropdown</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <DropdownMenu items={[{ label: 'Worker' }, { label: 'Pages' }]}>
            Add
          </DropdownMenu>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="collapsible" href="#collapsible" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Collapsible</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Collapsible title="What is Kumo?">Kumo is Cloudflare's component library.</Collapsible>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="checkbox" href="#checkbox" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Checkbox</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Checkbox bind:checked={checked}>Max bandwidth</Checkbox>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="layer-card" href="#layer-card" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">LayerCard</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <LayerCard class="w-[200px]">
            <Text size="sm" variant="muted">Next Steps</Text>
            <Text bold>Hello</Text>
          </LayerCard>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="loader" href="#loader" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Loader</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><Loader /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="skeleton-line" href="/components/skeleton-line" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">SkeletonLine</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex w-[200px] flex-col gap-2">
            <div class="h-2 w-1/2 animate-pulse rounded bg-kumo-control"></div>
            <div class="h-2 w-full animate-pulse rounded bg-kumo-control"></div>
            <div class="h-2 w-3/4 animate-pulse rounded bg-kumo-control"></div>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="code-highlighted" href="/components/code-highlighted" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">CodeHighlighted</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Code>const sum = (a, b) =&gt; a + b;</Code>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="banner" href="#banner" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Banner</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-2">
            <Banner text="This is a default banner." />
            <Banner text="This is an alert banner." variant="alert" />
            <Banner text="This is an error banner." variant="error" />
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="tabs" href="#tabs" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Tabs</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><Tabs items={tabs} bind:value={activeTab} /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="badge" href="#badge" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Badge</a>
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
        <a id="toast" href="#toast" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Toast</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Toasty title="Toast created" description="This is a toast notification." />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="pagination" href="#pagination" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Pagination</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Pagination bind:page pages={10} class="w-auto" />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="input-area" href="#input-area" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">InputArea</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><InputArea placeholder="Enter your name" /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="input-group" href="#input-group" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">InputGroup</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <InputGroup prefix="https://" suffix=".workers.dev"><Input placeholder="site" /></InputGroup>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="meter" href="#meter" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Meter</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Meter value={75} label="My meter" customValue="100 / 5,000" />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="menu-bar" href="#menu-bar" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">MenuBar</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <MenuBar options={[{ label: 'B' }, { label: 'I' }]} />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="date-picker" href="#date-picker" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">DatePicker</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="-m-4 scale-85"><DatePicker /></div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="breadcrumbs" href="#breadcrumbs" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Breadcrumbs</a>
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
        <a id="clipboard-text" href="#clipboard-text" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">ClipboardText</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><ClipboardText value="npx kumo add button" /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="command-palette" href="/components/command-palette" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">CommandPalette</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="w-[220px]">
            <CommandPalette commands={commands} placeholder="Search..." />
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="flow" href="/components/flow" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Flow</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex items-center gap-2 text-sm">
            <div class="rounded-lg border border-kumo-hairline bg-kumo-base px-3 py-2">Step 1</div>
            <div class="h-px w-8 bg-kumo-hairline"></div>
            <div class="rounded-lg border border-kumo-hairline bg-kumo-base px-3 py-2">Step 2</div>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="link" href="#link" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Link</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-2 text-sm">
            <Link href="#">Default link</Link>
            <Link href="#" variant="current">Current color link</Link>
            <Link href="#" variant="plain">Plain link</Link>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="empty" href="#empty" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Empty</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Empty title="No results" description="Try a different search" />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="grid" href="#grid" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Grid</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Grid variant="side-by-side" gap="sm" class="w-[140px]">
            {#each [1, 2, 3, 4] as item}
              <div class="rounded bg-kumo-control p-3 text-center text-xs">{item}</div>
            {/each}
          </Grid>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="label" href="#label" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Label</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-2">
            <Label>Default Label</Label>
            <Label optional>Optional Field</Label>
            <Label tooltip="More info">With Tooltip</Label>
          </div>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="popover" href="#popover" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Popover</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          {#snippet popoverTrigger()}Open Popover{/snippet}
          <Popover trigger={popoverTrigger} title="Popover Title" description="This is a popover." />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="radio" href="#radio" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Radio</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Radio options={[{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }]} value="option1" />
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="sensitive-input" href="#sensitive-input" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">SensitiveInput</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><SensitiveInput value="super-secret-api-key" /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="table" href="#table" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Table</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <Table class="w-[200px] text-sm">
            <thead><tr><th>Name</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Worker 1</td><td>Active</td></tr>
              <tr><td>Worker 2</td><td>Paused</td></tr>
              <tr><td>Worker 3</td><td>Active</td></tr>
            </tbody>
          </Table>
        </div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="table-of-contents" href="#table-of-contents" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">TableOfContents</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal"><TableOfContents items={toc} /></div>
      </li>

      <li class="relative flex aspect-square items-center justify-center bg-kumo-canvas">
        <a id="text" href="#text" class="absolute top-4 left-4 text-base font-medium text-kumo-subtle hover:text-kumo-default">Text</a>
        <div class="flex w-full items-center justify-center p-8 tracking-normal leading-normal">
          <div class="flex flex-col gap-1">
            <Text size="lg" bold>Large Bold Text</Text>
            <Text size="base">Regular text content</Text>
            <Text size="sm" variant="muted">Small subtle text</Text>
          </div>
        </div>
      </li>
      </ul>
    </div>
  </main>
</div>
