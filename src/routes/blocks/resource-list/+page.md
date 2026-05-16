---
title: "Resource List"
description: "A layout component for resource list pages with optional sidebar content."
sourceFile: "blocks/resource-list"
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>


<!-- Hero Demo -->

<ComponentSection>

<ComponentExample demo="ResourceListCompleteDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

  
    ResourceListPage is a <strong>block</strong> - a CLI-installed component
    that you own and can customize. Unlike regular components, blocks are copied
    into your project so you have full control over the code.
  
  
    
      **1. Initialize Kumo config (first time only)**

```bash
npx kumo-svelte init
```

**2. Install the block**

```bash
npx kumo-svelte add ResourceListPage
```

**3. Import from your local path**

```svelte
<script lang="ts">
  import { Badge, LayerCard } from 'kumo-svelte';
</script>

<LayerCard class="space-y-3">
  <h2 class="text-lg font-semibold">Databases</h2>
  <div class="flex items-center justify-between">
    <span>main-db</span>
    <Badge variant="success">Active</Badge>
  </div>
</LayerCard>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic

A minimal resource list page with title, description, and icon.

<ComponentExample demo="ResourceListBasicDemo" />

### With Usage Sidebar

  Include a sidebar with usage examples or quick start guides.

<ComponentExample demo="ResourceListWithUsageDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-kumo-hairline">
          <th class="px-4 py-3 text-left font-semibold">Property</th>
          <th class="px-4 py-3 text-left font-semibold">Type</th>
          <th class="px-4 py-3 text-left font-semibold">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">title</td>
          <td class="px-4 py-3 font-mono text-xs">string</td>
          <td class="px-4 py-3">Page title displayed at the top</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">description</td>
          <td class="px-4 py-3 font-mono text-xs">string</td>
          <td class="px-4 py-3">Page description below the title</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">icon</td>
          <td class="px-4 py-3 font-mono text-xs">Snippet</td>
          <td class="px-4 py-3">Icon displayed next to the title</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">usage</td>
          <td class="px-4 py-3 font-mono text-xs">Snippet</td>
          <td class="px-4 py-3">
            Sidebar content for usage examples or quick start guides
          </td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">additionalContent</td>
          <td class="px-4 py-3 font-mono text-xs">Snippet</td>
          <td class="px-4 py-3">
            Additional sidebar content (e.g., resources, links)
          </td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">children</td>
          <td class="px-4 py-3 font-mono text-xs">Snippet</td>
          <td class="px-4 py-3">Main content area for the resource list</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">class</td>
          <td class="px-4 py-3 font-mono text-xs">string</td>
          <td class="px-4 py-3">Additional CSS classes</td>
        </tr>
      </tbody>
    </table>

</ComponentSection>
