---
title: "Installation"
description: "Get started with Kumo Svelte by installing the package and importing components."
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
</script>

## Install Package

Install Kumo Svelte with your preferred package manager.

#### npm

```bash
npm install kumo-svelte
```

#### pnpm

```bash
pnpm add kumo-svelte
```

#### yarn

```bash
yarn add kumo-svelte
```

#### Peer Dependencies

Kumo Svelte requires Svelte 5. Chart components also expect ECharts when you render charts.

```bash
pnpm add svelte echarts
```

## Import Components

Import styled components from the main package entry point.

```svelte
<script lang="ts">
  import { Button, Input, LayerCard } from 'kumo-svelte';
</script>
```

Granular imports are available for apps that prefer explicit component entry points.

```svelte
<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { Input } from 'kumo-svelte/components/input';
</script>
```

## Bits UI Primitives

The Svelte port uses [Bits UI](https://bits-ui.com) for accessible primitives. Prefer Kumo Svelte's styled components when they exist, and reach for Bits UI directly when you need a lower-level primitive that Kumo does not expose yet.

<Callout type="info">
  Kumo Svelte components keep the original Kumo visual language while using Svelte component APIs, snippets, and bindable state where appropriate.
</Callout>

## Import Styles

If your application uses Tailwind CSS, add Kumo Svelte's source files and import the package styles before Tailwind.

```css
/* app.css */
@source "../node_modules/kumo-svelte/dist/**/*.{js,svelte,ts}";
@import "kumo-svelte/styles.css";
@import "tailwindcss";
```

Adjust the `@source` path if your CSS file lives in a different directory.

## Usage Example

#### CSS File

```css
@source "../node_modules/kumo-svelte/dist/**/*.{js,svelte,ts}";
@import "kumo-svelte/styles.css";
@import "tailwindcss";
```

#### Component File

```svelte
<script lang="ts">
  import { Button, Input, LayerCard } from 'kumo-svelte';
</script>

<LayerCard class="rounded-lg p-6">
  <h1 class="mb-4 text-2xl font-bold">Welcome to Kumo</h1>
  <Input placeholder="Enter your name..." class="mb-4" />
  <Button variant="primary">Submit</Button>
</LayerCard>
```

## Blocks vs Components

Components are versioned package exports such as `Button`, `Input`, and `Dialog`. Blocks are larger compositions that you copy into your project and own.

```bash
npx kumo-svelte init
npx kumo-svelte blocks
npx kumo-svelte add PageHeader
```

After installation, blocks live in your project and can be customized directly.

## Utilities

```svelte
<script lang="ts">
  import { cn } from 'kumo-svelte';

  const classes = cn('base-class', true && 'conditional-class');
</script>
```
