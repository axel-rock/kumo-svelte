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
npx @cloudflare/kumo init
```

**2. Install the block**

```bash
npx @cloudflare/kumo add ResourceListPage
```

**3. Import from your local path**

```tsx
// The path depends on your kumo.json blocksDir setting
// Default: src/components/kumo/
```

<Callout type="info">
    <strong>Why blocks?</strong> Blocks give you full ownership of the code,
    allowing you to customize layouts to fit your specific needs. They're ideal
    for page-level patterns that often need project-specific modifications.

</Callout>

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```tsx

export default function DatabasesPage() {
  return (
    <ResourceListPage
title="Databases"
description="Manage your database instances and configurations"
      icon={<DatabaseIcon size={32} className="text-kumo-strong" />}
    >
      <Surface className="p-6">{/* Your resource list content */}</Surface>
    </ResourceListPage>
  );
}
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
          <td class="px-4 py-3 font-mono text-xs">ReactNode</td>
          <td class="px-4 py-3">Icon displayed next to the title</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">usage</td>
          <td class="px-4 py-3 font-mono text-xs">ReactNode</td>
          <td class="px-4 py-3">
            Sidebar content for usage examples or quick start guides
          </td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">additionalContent</td>
          <td class="px-4 py-3 font-mono text-xs">ReactNode</td>
          <td class="px-4 py-3">
            Additional sidebar content (e.g., resources, links)
          </td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">children</td>
          <td class="px-4 py-3 font-mono text-xs">ReactNode</td>
          <td class="px-4 py-3">Main content area for the resource list</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">className</td>
          <td class="px-4 py-3 font-mono text-xs">string</td>
          <td class="px-4 py-3">Additional CSS classes</td>
        </tr>
      </tbody>
    </table>

</ComponentSection>
