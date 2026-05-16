---
title: "Code"
description: "Legacy code and code block components styled with Kumo colors and typography."
sourceFile: "components/code"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
</script>

<ComponentSection>
  <ComponentExample demo="CodeBasicDemo" />
</ComponentSection>

<ComponentSection>

## Overview

Use Code for simple, unhighlighted code strings in a monospace font. Use CodeBlock when the same code should sit inside the upstream Kumo bordered container.

</ComponentSection>

<ComponentSection>

## Installation

### Barrel

```svelte
<script lang="ts">
  import { Code, CodeBlock } from 'kumo-svelte';
</script>
```

### Granular

```svelte
<script lang="ts">
  import { Code, CodeBlock } from 'kumo-svelte/components/code';
</script>
```

</ComponentSection>

<ComponentSection>

## Examples

### Code

```svelte
<script lang="ts">
  import { Code } from 'kumo-svelte';
</script>

<Code code="const x = 1;" lang="ts" />
```

### CodeBlock

```svelte
<script lang="ts">
  import { CodeBlock } from 'kumo-svelte';
</script>

<CodeBlock code={`const greeting = "Hello!";`} lang="tsx" />
```

### Custom Styling

```svelte
<script lang="ts">
  import { Code } from 'kumo-svelte';
</script>

<Code code="const status = 'ready';" class="text-kumo-default" />
```

</ComponentSection>

<ComponentSection>

## API Reference

### Code Props

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="py-2 pr-4 text-left font-medium">Prop</th>
        <th class="py-2 pr-4 text-left font-medium">Type</th>
        <th class="py-2 pr-4 text-left font-medium">Default</th>
        <th class="py-2 text-left font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4"><code>code</code></td>
        <td class="py-2 pr-4"><code>string</code></td>
        <td class="py-2 pr-4"><code>""</code></td>
        <td class="py-2">The code string to display.</td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4"><code>lang</code></td>
        <td class="py-2 pr-4"><code>"ts" | "tsx" | "jsonc" | "bash" | "css"</code></td>
        <td class="py-2 pr-4"><code>"ts"</code></td>
        <td class="py-2">Language hint for the code content.</td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4"><code>class</code></td>
        <td class="py-2 pr-4"><code>string</code></td>
        <td class="py-2 pr-4">-</td>
        <td class="py-2">Additional CSS classes.</td>
      </tr>
      <tr>
        <td class="py-2 pr-4"><code>style</code></td>
        <td class="py-2 pr-4"><code>string</code></td>
        <td class="py-2 pr-4">-</td>
        <td class="py-2">Inline styles.</td>
      </tr>
    </tbody>
  </table>
</div>

### CodeBlock Props

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="py-2 pr-4 text-left font-medium">Prop</th>
        <th class="py-2 pr-4 text-left font-medium">Type</th>
        <th class="py-2 pr-4 text-left font-medium">Default</th>
        <th class="py-2 text-left font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4"><code>code</code></td>
        <td class="py-2 pr-4"><code>string</code></td>
        <td class="py-2 pr-4">-</td>
        <td class="py-2">The code string to display.</td>
      </tr>
      <tr>
        <td class="py-2 pr-4"><code>lang</code></td>
        <td class="py-2 pr-4"><code>"ts" | "tsx" | "jsonc" | "bash" | "css"</code></td>
        <td class="py-2 pr-4"><code>"ts"</code></td>
        <td class="py-2">Language hint for the code content.</td>
      </tr>
    </tbody>
  </table>
</div>

</ComponentSection>
