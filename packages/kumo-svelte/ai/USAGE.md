# Kumo Svelte AI Usage

Kumo Svelte is a Svelte 5 port of Cloudflare's Kumo component library.

Use package imports for reusable components:

```svelte
<script lang="ts">
  import { Button, Dialog, Input } from 'kumo-svelte';
  import 'kumo-svelte/styles.css';
</script>
```

Use block installs for copy-owned application patterns:

```bash
npx kumo-svelte init
npx kumo-svelte blocks
npx kumo-svelte add PageHeader
```

Blocks are copied into the configured `kumo.json` `blocksDir` and import shared
components from `kumo-svelte`.
