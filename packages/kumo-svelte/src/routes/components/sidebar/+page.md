---
title: "Sidebar"
description: "Responsive navigation sidebar component."
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';

  const sidebarUsage = `<script lang="ts">
  import { Sidebar } from 'kumo-svelte';
<\/script>

<Sidebar>
  <a href="/dashboard">Dashboard</a>
  <a href="/workers">Workers</a>
  <a href="/settings">Settings</a>
</Sidebar>`;
</script>

<ComponentSection title="Overview">

Sidebar provides a persistent navigation surface for documentation and application shells. It is used by the Kumo docs layout for the desktop rail, expanded navigation panel, and mobile drawer.

</ComponentSection>

<ComponentSection title="Example">

<ComponentExample title="Basic sidebar">
  <div class="w-72 rounded-lg border border-kumo-hairline bg-kumo-canvas p-3 text-sm">
    <button class="mb-3 flex w-full items-center gap-2 rounded-lg bg-kumo-control px-3 py-2 text-kumo-subtle ring-1 ring-kumo-line">
      Search...
    </button>
    <nav class="space-y-px">
      <a class="block rounded-lg bg-kumo-tint p-2 font-semibold text-kumo-default" href="/installation">Installation</a>
      <a class="block rounded-lg p-2 text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default" href="/components/button">Button</a>
      <a class="block rounded-lg p-2 text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default" href="/components/input">Input</a>
      <a class="block rounded-lg p-2 text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default" href="/components/select">Select</a>
    </nav>
  </div>
</ComponentExample>

</ComponentSection>

<ComponentSection title="Usage">

<CodeBlock lang="svelte" code={sidebarUsage} />

</ComponentSection>

<ComponentSection title="API Reference">

<PropsTable component="Sidebar" />

</ComponentSection>
