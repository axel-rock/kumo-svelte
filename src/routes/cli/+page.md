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
npx @cloudflare/kumo help
```

## Commands

### Blocks

Install copy-paste blocks into your project for full customization.

```bash
# Initialize kumo.json configuration
npx @cloudflare/kumo init

# List all available blocks
npx @cloudflare/kumo blocks

# Install a block to your project
npx @cloudflare/kumo add PageHeader
```

### Component Registry

Access component documentation directly from your terminal.

```bash
# List all Kumo components with categories
npx @cloudflare/kumo ls

# Get detailed documentation for a component
npx @cloudflare/kumo doc Button

# Get documentation for all components
npx @cloudflare/kumo docs
```

## Try it out

Type commands in the interactive terminal below to explore the CLI.

<p class="not-prose my-4 rounded-lg border border-kumo-hairline bg-kumo-canvas p-4 text-sm text-kumo-subtle">CLITerminal</p>
