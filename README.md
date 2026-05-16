# kumo-svelte

A Svelte port of Cloudflare's Kumo UI library. The port keeps Kumo's Tailwind class vocabulary and semantic `kumo-*` design tokens while adapting React/Base UI patterns to Svelte 5 and `bits-ui` primitives.

## Install

```sh
npm install kumo-svelte bits-ui svelte
```

Import the global CSS once in your app:

```ts
import 'kumo-svelte/styles.css';
```

## Usage

```svelte
<script lang="ts">
  import { Button, Badge, KumoLogo } from 'kumo-svelte';
</script>

<KumoLogo />
<Button variant="primary">Deploy</Button>
<Badge variant="beta">Beta</Badge>
```

## Website

This repo includes a SvelteKit parity website that renders the Svelte-branded Kumo design system and exercises the exported components.

```sh
npm run dev
npm run build
```

## Component parity

The public Svelte surface now covers the Kumo registry exports: `Autocomplete`, `Badge`, `Banner`, `Breadcrumbs`, `Button`, `Checkbox`, `ClipboardText`, `CloudflareLogo`, `Code`, `Collapsible`, `Combobox`, `CommandPalette`, `DatePicker`, `DateRangePicker`, `Dialog`, `DropdownMenu`, `Empty`, `Field`, `Grid`, `Input`, `InputArea`, `InputGroup`, `Label`, `LayerCard`, `Link`, `Loader`, `MenuBar`, `Meter`, `Pagination`, `Popover`, `Radio`, `Select`, `SensitiveInput`, `Sidebar`, `Surface`, `Switch`, `Table`, `TableOfContents`, `Tabs`, `Text`, `Toasty`, and `Tooltip`.

## Design tokens

The Cloudflare logo color has been intentionally adapted for Svelte branding. `styles.css` defines `--kumo-svelte-orange` and maps `--kumo-brand` to it, so all primary controls and the logo use Svelte orange by default.

## Status

This repository contains the Svelte package and parity website. Components preserve Kumo's Tailwind token/class language where the Svelte primitive model maps directly; divergences are limited to Svelte snippets/bindings, native Svelte form bindings, and Svelte-orange branding.
