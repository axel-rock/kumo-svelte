<script lang="ts">
  import {
    Badge, Banner, Breadcrumbs, Button, Checkbox, ClipboardText, Code, Combobox,
    CommandPalette, DatePicker, DateRangePicker, Empty, Field, Grid, Input, InputArea,
    InputGroup, Label, LayerCard, Link, Loader, Meter, Pagination, Radio, Select,
    SensitiveInput, Surface, Switch, Table, TableOfContents, Tabs, Text, Toasty
  } from '$lib';

  const options = [{ label: 'Workers', value: 'workers' }, { label: 'Pages', value: 'pages' }, { label: 'R2', value: 'r2' }];
  const toc = [{ title: 'Overview', href: '#overview' }, { title: 'Components', href: '#components' }, { title: 'Tokens', href: '#tokens' }];
  const tabItems = [{ value: 'one', label: 'Preview' }, { value: 'two', label: 'Code' }];
  let checked = $state(true);
  let enabled = $state(true);
</script>

<main class="mx-auto max-w-6xl px-6 py-10">
  <section id="overview" class="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
    <div class="space-y-5">
      <Badge variant="beta">Svelte port</Badge>
      <h1 class="text-4xl font-bold tracking-tight text-kumo-strong md:text-6xl">Cloudflare Kumo, rebuilt for Svelte.</h1>
      <Text variant="muted" size="lg">A parity-focused component library preserving Kumo Tailwind classes, adapted to Svelte 5 snippets, bindings, and bits-ui primitives.</Text>
      <div class="flex gap-3"><Button variant="primary">Get started</Button><Button variant="secondary">View components</Button></div>
    </div>
    <Surface class="p-4">
      <CommandPalette commands={[{ label: 'Create Worker' }, { label: 'Deploy Pages' }, { label: 'Open R2 bucket' }]} />
    </Surface>
  </section>

  <section id="components" class="mt-16 space-y-6">
    <div class="flex items-end justify-between"><div><h2 class="text-2xl font-semibold">Component parity board</h2><Text variant="muted">Every Kumo export has a Svelte counterpart in the package surface.</Text></div><Loader /></div>
    <Grid cols={3}>
      <LayerCard><Label>Buttons</Label><div class="mt-3 flex flex-wrap gap-2"><Button variant="primary">Primary</Button><Button>Secondary</Button><Button variant="ghost">Ghost</Button></div></LayerCard>
      <LayerCard><Label>Badges</Label><div class="mt-3 flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="success">Success</Badge><Badge variant="warning">Warning</Badge><Badge variant="error">Error</Badge></div></LayerCard>
      <LayerCard><Label>Inputs</Label><div class="mt-3 grid gap-2"><Input placeholder="Project name" /><InputGroup prefix="https://" suffix=".workers.dev"><Input class="border-0 shadow-none ring-0 focus:ring-0" placeholder="site" /></InputGroup><SensitiveInput value="secret" /></div></LayerCard>
      <LayerCard><Label>Selection</Label><div class="mt-3 grid gap-3"><Checkbox bind:checked>Enable cache</Checkbox><Switch bind:checked={enabled} /><Radio options={options} value="workers" /><Select options={options} /></div></LayerCard>
      <LayerCard><Label>Discovery</Label><div class="mt-3 grid gap-3"><Combobox options={options} /><Breadcrumbs items={[{ label: 'Account', href: '#' }, { label: 'Workers' }]} /><TableOfContents items={toc} /></div></LayerCard>
      <LayerCard><Label>Feedback</Label><div class="mt-3 grid gap-3"><Banner title="Heads up">This is a faithful Svelte-branded port.</Banner><Meter value={68} label="Parity" /><Toasty title="Deployment ready">Components are packageable.</Toasty></div></LayerCard>
      <LayerCard><Label>Dates</Label><div class="mt-3 grid gap-3"><DatePicker /><DateRangePicker /></div></LayerCard>
      <LayerCard><Label>Content</Label><div class="mt-3 grid gap-3"><ClipboardText value="npm install kumo-svelte" /><Code inline>bg-kumo-brand</Code><InputArea placeholder="Notes" /></div></LayerCard>
      <LayerCard><Label>Empty/Table</Label><div class="mt-3 grid gap-3"><Empty title="No deployments" description="Deploy to see activity." /><Table><tbody><tr><td class="p-2">Workers</td><td class="p-2">Active</td></tr></tbody></Table><Pagination pages={3} /></div></LayerCard>
    </Grid>
  </section>

  <section id="tokens" class="mt-16">
    <Surface class="p-6"><h2 class="text-2xl font-semibold">Svelte orange brand token</h2><Text variant="muted">The global <Code inline>--kumo-svelte-orange</Code> variable powers <Code inline>--kumo-brand</Code>, preserving Kumo's class names while switching branding.</Text><div class="mt-4 h-16 rounded-xl bg-kumo-brand"></div></Surface>
  </section>
</main>
