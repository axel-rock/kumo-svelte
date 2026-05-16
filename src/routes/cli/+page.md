---
title: "CLI"
description: "Access component documentation and install blocks from your terminal."
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>


## Installation

The Kumo CLI is available via npx. No installation required.

```bash
npx kumo-svelte help
```

## Commands

### Blocks

Install copy-paste blocks into your project for full customization.

```bash
# Initialize kumo.json configuration
npx kumo-svelte init

# List all available blocks
npx kumo-svelte blocks

# Install a block to your project
npx kumo-svelte add PageHeader
```

### Component Registry

Access component documentation directly from your terminal.

```bash
# List all Kumo components with categories
npx kumo-svelte ls

# Get detailed documentation for a component
npx kumo-svelte doc Button

# Get documentation for all components
npx kumo-svelte docs
```

## Try it out

Type commands in the interactive terminal below to explore the CLI.

<p class="not-prose my-4 rounded-lg border border-kumo-hairline bg-kumo-canvas p-4 text-sm text-kumo-subtle">CLITerminal</p>
