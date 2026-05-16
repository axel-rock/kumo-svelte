---
title: "Installation"
description: "Get started with Kumo by installing the package and importing components."
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>


## NPM Registry

The `@cloudflare/kumo` package is published to the public npm registry. No special configuration is required for installation.

## Install Package

Install Kumo using your preferred package manager. The current version is <code>vlatest</code>.

#### npm

```bash
npm install @cloudflare/kumo
```

#### pnpm

```bash
pnpm add @cloudflare/kumo
```

#### yarn

```bash
yarn add @cloudflare/kumo
```

#### Peer Dependencies

Kumo requires the following peer dependencies. Most React projects will already have these installed:

```bash
# Required peer dependencies
pnpm add react react-dom @phosphor-icons/react
```

## Import Components

Import components from the main package or use granular imports for better tree-shaking:

#### Main Package Import

```tsx
```

#### Granular Import (Recommended)

```tsx
```

## Base UI Primitives

Kumo is built on top of [Base UI](https://base-ui.com), a library of unstyled, accessible React components. For advanced use cases where you need access to the underlying primitives, Kumo re-exports all 37 Base UI components with both barrel and granular imports:

#### Barrel Import (Convenient)

```tsx
// Import multiple primitives at once
```

#### Granular Imports (Recommended for Performance)

```tsx
// Import individual primitives for better tree-shaking
```

Granular imports result in smaller bundle sizes by only including the primitives you actually use.

<Callout type="info">
  **Available Primitives (37 total):** Layout · Accordion, Collapsible,
  Separator, ScrollArea, Toolbar — Overlays · AlertDialog, Dialog, Popover,
  PreviewCard, Tooltip, Toast — Menus · Menu, Menubar, ContextMenu,
  NavigationMenu — Form Controls · Autocomplete, Button, Checkbox,
  CheckboxGroup, Combobox, Input, NumberField, Radio, RadioGroup, Select,
  Slider, Switch, Toggle, ToggleGroup — Form Structure · Field, Fieldset, Form —
  Display · Avatar, Meter, Progress, Tabs

</Callout>

<Callout type="warning">
  **Note:** Prefer using styled Kumo components when available. Primitives are
  intended for building custom components that aren't yet available in Kumo, or
  for cases requiring fine-grained control over styling and behavior.

</Callout>

## Import Styles

Kumo provides two CSS distribution options depending on your setup:

### For Tailwind CSS Users (Recommended)

If your application uses Tailwind CSS, add Kumo's source files to your content configuration and import the styles. **Import order matters** — Kumo styles must come before `@import "tailwindcss"` so that Kumo's theme tokens are registered first:

<Callout type="warning">
  **Important:** Tailwind CSS v4 does not scan `node_modules/` by default. You
  must add a `@source` directive so Tailwind can discover the utility classes
  used by Kumo components. Without this, components may render with missing
  styles (e.g. Dialogs not centered).

</Callout>

```css
/* app.css or main.css */
@source "../node_modules/@cloudflare/kumo/dist/**/*.{js,jsx,ts,tsx}";
@import "@cloudflare/kumo/styles/tailwind";
@import "tailwindcss";

/* Your custom styles */
```

<Callout type="info">
  The `@source` path is relative to your CSS file. Adjust it based on your
  project structure — e.g. if your CSS is in `src/styles/`, you may need
  `../../node_modules/@cloudflare/kumo/dist/**/*.&#123;"&#123;"&#125;js,jsx,ts,tsx&#123;"&#125;"&#125;`.

</Callout>

Note: You can also use the default export `@cloudflare/kumo/styles` which is equivalent to `styles/tailwind`.

### For Non-Tailwind Users (Standalone)

If your application doesn't use Tailwind CSS, use the standalone build which includes all compiled styles:

```tsx
// In your app entry point (e.g., main.tsx, index.tsx)
```

The standalone build includes all Tailwind utilities and Kumo component styles pre-compiled. No Tailwind configuration needed!

## Usage Example

Here's a complete example of using Kumo components with Tailwind CSS:

#### CSS File (app.css)

```css
@source "../node_modules/@cloudflare/kumo/dist/**/*.{js,jsx,ts,tsx}";
@import "@cloudflare/kumo/styles/tailwind";
@import "tailwindcss";
```

Note: The `@source` path is relative to your CSS file. Adjust it based on your project structure.

#### Component File (App.tsx)

```tsx

export default function App() {
  return (
    <LayerCard className="rounded-lg p-6">
      <h1 className="mb-4 text-2xl font-bold">Welcome to Kumo</h1>
      <Input placeholder="Enter your name..." className="mb-4" />
      <Button variant="primary">Submit</Button>
    </LayerCard>
  );
}
```

## Blocks vs Components

Kumo provides two types of building blocks for your application:

### Components (NPM Exports)

Components are published as NPM exports and can be imported directly from the package. These are the core UI primitives like `Button`, `Input`, and `Dialog`.

```tsx
```

Use components when you need consistent, pre-styled UI primitives that integrate seamlessly with your application. Components are versioned, tree-shakeable, and receive automatic updates.

### Blocks (CLI Installation)

Blocks are higher-level compositions (like `PageHeader` and `ResourceListPage`) that are installed via the Kumo CLI. Blocks give you full ownership of the code, allowing you to customize them to your specific needs.

```bash

# Initialize Kumo configuration

npx @cloudflare/kumo init

# List available blocks

npx @cloudflare/kumo blocks

# Install a block

npx @cloudflare/kumo add PageHeader
```

After installation, blocks live in your project (e.g., `src/components/kumo/`) and can be customized as needed. The CLI automatically transforms imports from relative paths to `@cloudflare/kumo` for seamless integration.

```tsx
```

<Callout type="info">
  <strong>When to use blocks:</strong>
  <ul class="mt-2 space-y-1 text-sm">
    <li>You need to customize the component beyond props</li>
    <li>You want full control over the implementation</li>
    <li>You're building application-specific layouts</li>
    <li>You prefer copy-paste over package dependencies for certain code</li>
  </ul>

</Callout>

## Utilities

Kumo also exports utility functions for common tasks:

```tsx

// Merge class names with Tailwind
const className = cn("base-class", condition && "conditional-class");

// Generate safe random IDs
const id = safeRandomId();

// Configure link component for your framework (maps href to your router)
<LinkProvider component={YourAppLink}>{/* Your app */}</LinkProvider>;
```
