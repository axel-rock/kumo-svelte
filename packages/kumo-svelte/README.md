# `@axel-rock/kumo-svelte`

A **high-fidelity Svelte port** of [Cloudflare's Kumo](https://github.com/cloudflare/kumo) component library, built on [Bits UI](https://bits-ui.com/) (the Svelte-native equivalent of Base UI).

Kumo Svelte provides accessible, design-system-compliant UI components that aim for **pixel parity** with upstream Kumo. It handles keyboard navigation, focus management, and ARIA attributes so you can build accessible applications without thinking through every detail.

> This is an independent community project. It is **not** affiliated with, sponsored by, or endorsed by Cloudflare. See [NOTICE](https://github.com/axel-rock/kumo-svelte/blob/main/NOTICE) for full attribution.

<img width="2560" height="1456" alt="Kumo UI preview" src="https://github.com/user-attachments/assets/032f5a0e-b686-4440-b1ca-6182379479aa" />

## Lineage

```
cloudflare/kumo                 (React + Base UI + Tailwind v4)
  └─ maxffarrell/kumo-svelte    (initial Svelte port on Bits UI)
       └─ axel-rock/kumo-svelte (this package — fidelity + testing focus)
```

Huge thanks to [**@maxffarrell**](https://github.com/maxffarrell) for the original Svelte port, and to the Cloudflare Kumo and Bits UI teams for the libraries this builds on. The unscoped `kumo-svelte` name belongs to the original port; this fork ships under `@axel-rock/kumo-svelte`.

## Installation

```bash
pnpm add @axel-rock/kumo-svelte
```

### Peer dependencies

```bash
pnpm add svelte bits-ui
```

## Usage

```svelte
<script lang="ts">
  import { Button, Input, Dialog } from '@axel-rock/kumo-svelte';
  import '@axel-rock/kumo-svelte/styles.css';
  // Optional: repaint brand surfaces in Svelte orange instead of the
  // Cloudflare-faithful default.
  // import '@axel-rock/kumo-svelte/theme-svelte.css';
</script>
```

### Granular imports (tree-shaking)

```svelte
<script lang="ts">
  import { Button } from '@axel-rock/kumo-svelte/components/button';
</script>
```

### Bits UI primitives

Kumo Svelte re-exports primitives for advanced use cases:

```svelte
<script lang="ts">
  import { Popover } from '@axel-rock/kumo-svelte/primitives';
</script>
```

## CLI

Kumo Svelte includes the ported Kumo CLI for component discovery, block installation, migration helpers, and AI usage docs.

```bash
npx @axel-rock/kumo-svelte help
npx @axel-rock/kumo-svelte init
npx @axel-rock/kumo-svelte blocks
npx @axel-rock/kumo-svelte add PageHeader
npx @axel-rock/kumo-svelte ls
npx @axel-rock/kumo-svelte doc Button
npx @axel-rock/kumo-svelte migrate --classes
npx @axel-rock/kumo-svelte ai
```

## Documentation

- **Upstream live docs**: [kumo-ui.com](https://kumo-ui.com)
- **Upstream source**: [cloudflare/kumo](https://github.com/cloudflare/kumo)
- **Repository & development docs**: [axel-rock/kumo-svelte](https://github.com/axel-rock/kumo-svelte)

## License

[MIT](https://github.com/axel-rock/kumo-svelte/blob/main/packages/kumo-svelte/LICENSE). Derived from Cloudflare Kumo (MIT) and maxffarrell/kumo-svelte (MIT); see [NOTICE](https://github.com/axel-rock/kumo-svelte/blob/main/NOTICE).
