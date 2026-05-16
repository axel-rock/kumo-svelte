---
title: "CodeHighlighted"
description: "Shiki-powered syntax highlighting with VS Code-quality highlighting, theming, and lazy loading."
sourceFile: "code"
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
  
    <p class="text-sm text-kumo-strong">
      <strong>New in v1.10:</strong> Shiki-powered syntax highlighting with lazy
      loading. Import from `@cloudflare/kumo/code` to use.

<ComponentExample demo="CodeHighlightedBasicDemo" />

</ComponentSection>

<!-- Overview -->

<ComponentSection>

## Overview

  
    A Shiki-powered syntax highlighter. Supports 200+ languages with TextMate
    grammars, dual light/dark themes, and lazy loading. Exported from a separate
    entry point ( `@cloudflare/kumo/code` ) to avoid bundling Shiki for apps
    that don't need it.

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

  
    CodeHighlighted is exported from a separate entry point to avoid bundling Shiki for apps that don't need it.
  

```tsx
```

  
    <p class="text-sm text-kumo-strong">
      <strong>Important:</strong> Do NOT import from the main `@cloudflare/kumo` entry.
      That would pull Shiki into your bundle even if you don't use it.

</ComponentSection>

<!-- Basic Usage -->

<ComponentSection>

## Basic Usage

  
    Wrap your app with `ShikiProvider` to configure Shiki once.
    All `CodeHighlighted` components inside share the same Shiki instance.
  

```tsx

export function App() {
  return (
    <ShikiProvider
      engine="javascript"
      languages={["tsx", "typescript", "bash", "json"]}
    >
      {/* All CodeHighlighted components share the same Shiki instance */}
      <CodeHighlighted code="const x = 1;" lang="typescript" />
    </ShikiProvider>
  );
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Languages

  CodeHighlighted supports 200+ languages through Shiki. Only load the languages
  you need.

#### TypeScript

<ComponentExample demo="CodeHighlightedTypeScriptDemo" />

#### React / TSX

<ComponentExample demo="CodeHighlightedReactDemo" />

#### Bash / Shell

<ComponentExample demo="CodeHighlightedBashDemo" />

#### JSON

<ComponentExample demo="CodeHighlightedJsonDemo" />

#### CSS

<ComponentExample demo="CodeHighlightedCssDemo" />

### Highlight Lines

Emphasize specific lines with `highlightLines` (1-indexed).

<ComponentExample demo="CodeHighlightedHighlightLinesDemo" />

### Custom Highlight Color

  Customize the highlight color with the `--kumo-code-highlight-bg` CSS
  variable.

<p class="text-sm text-kumo-subtle">CodeHighlightedCustomHighlightDemo</p>

### Line Numbers

Display line numbers with `showLineNumbers` .

<ComponentExample demo="CodeHighlightedLineNumbersDemo" />

### Copy Button

Add a copy-to-clipboard button with `showCopyButton` .

<ComponentExample demo="CodeHighlightedCopyButtonDemo" />

### Full Featured

Combine all features for a complete code display experience.

<ComponentExample demo="CodeHighlightedFullFeaturedDemo" />

### Shared Provider

  
    Multiple code blocks can share a single `ShikiProvider`.
    Shiki loads once and is reused for all blocks.

<ComponentExample demo="CodeHighlightedSharedProviderDemo" />

</ComponentSection>

<!-- Themes -->

<ComponentSection>

## Themes

  
    CodeHighlighted uses hardcoded themes for consistent styling across all Kumo
    applications:
  
  <ul class="mb-4 list-disc pl-6">
    <li>
      <strong>Light mode:</strong>
      `github-light`
    </li>
    <li>
      <strong>Dark mode:</strong>
      `vesper`
    </li>
  </ul>
  <p class="text-sm text-kumo-subtle">
    Theme customization is not supported. This ensures visual consistency across
    all code blocks in your application.

</ComponentSection>

<!-- Server-Side Usage -->

<ComponentSection>

## Server-Side Usage

  
    For SSR frameworks (Next.js RSC, Astro, Remix), use the server utilities to highlight at build time.
  

#### One-off highlighting

```tsx
// Next.js RSC or Astro

export default async function Page() {
  const html = await highlightCode(`const x = 1;`, "typescript");

  return <pre dangerouslySetInnerHTML={{ __html: html }} />;
}
```

#### Reusable highlighter

```tsx
// For multiple highlights, reuse the highlighter

const highlighter = await createServerHighlighter({
  languages: ["tsx", "bash", "json"],
});

const html1 = highlighter.highlight(code1, "tsx");
const html2 = highlighter.highlight(code2, "bash");

highlighter.dispose(); // Clean up when done
```

</ComponentSection>

<!-- Custom Hook -->

<ComponentSection>

## Custom Hook

  
    Use `useShikiHighlighter` for custom implementations.
  

```tsx

function CustomCodeBlock({ code, lang }) {
  const { highlight, isLoading, isReady, error } = useShikiHighlighter();

  if (error) {
    return <div className="text-red-500">Failed to load highlighter</div>;
  }

  if (isLoading) {
    return (
      <pre className="animate-pulse">
        <code>{code}</code>
      </pre>
    );
  }

  const html = highlight(code, lang);

  // null means highlighting failed — render plain text
  if (html === null) {
    return (
      <pre>
        <code>{code}</code>
      </pre>
    );
  }

  return <pre dangerouslySetInnerHTML={{ __html: html }} />;
}
```

</ComponentSection>

<!-- Internationalization -->

<ComponentSection>

## Internationalization

  
    Customize button labels at the provider level for all code blocks, or override per-component.
  

```tsx
// Set labels at the provider level for all code blocks
<ShikiProvider
  engine="javascript"
  languages={["tsx", "bash"]}
  labels={{ copy: "Copier", copied: "Copié!" }}
>
  <App />
</ShikiProvider>

// Or override at the component level
<CodeHighlighted
code={code}
lang="tsx"
  showCopyButton
  labels={{ copy: "Copy code", copied: "Done!" }}
/>
```

</ComponentSection>

<!-- Framework Integration -->

<ComponentSection>

## Framework Integration

### Next.js App Router

```tsx
// app/providers.tsx
"use client";

export function Providers({ children }) {
  return (
    <ShikiProvider engine="javascript" languages={["tsx", "bash", "json"]}>
      {children}
    </ShikiProvider>
  );
}

// app/layout.tsx

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Astro (Static)

  For static sites, use server-side highlighting for zero client-side
  JavaScript.

```tsx
---
// src/components/CodeBlock.astro

const { code, lang } = Astro.props;
const html = await highlightCode(code, lang);
---

<div class="code-block" set:html={html} />
```

</ComponentSection>

<!-- Bundle Size -->

<ComponentSection>

## Bundle Size

  
    Shiki is lazy-loaded on first render. The size depends on your
    configuration:
  
  
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-kumo-hairline">
          <th class="py-2 pr-4 text-left font-medium">Scenario</th>
          <th class="py-2 pr-4 text-left font-medium">Languages</th>
          <th class="py-2 pr-4 text-left font-medium">Engine</th>
          <th class="py-2 text-left font-medium">Lazy Load Size</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-kumo-hairline/50">
          <td class="py-2 pr-4">Minimal</td>
          <td class="py-2 pr-4">tsx, json</td>
          <td class="py-2 pr-4">JS</td>
          <td class="py-2">~75 KB</td>
        </tr>
        <tr class="border-b border-kumo-hairline/50">
          <td class="py-2 pr-4">Standard</td>
          <td class="py-2 pr-4">tsx, ts, bash, json, css, yaml</td>
          <td class="py-2 pr-4">JS</td>
          <td class="py-2">~95 KB</td>
        </tr>
        <tr>
          <td class="py-2 pr-4">Full</td>
          <td class="py-2 pr-4">15+ languages</td>
          <td class="py-2 pr-4">WASM</td>
          <td class="py-2">~250 KB</td>
        </tr>
      </tbody>
    </table>
  
  <p class="mt-4 text-sm text-kumo-subtle">
    Teams that don't import from `@cloudflare/kumo/code` pay 0 KB.

</ComponentSection>

<!-- Migration -->

<ComponentSection>

## Migration from Code/CodeBlock

  
    The legacy `Code` and `CodeBlock` components are deprecated.
    They will be removed in v2.0.
  

```tsx
// Before (deprecated)
<CodeBlock code={code} lang="tsx" />

// After

// Once at app root
<ShikiProvider engine="javascript" languages={["tsx"]}>
  <App />
</ShikiProvider>

// In components
<CodeHighlighted code="const x = 1;" lang="tsx" />
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### ShikiProvider Props

  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="py-2 pr-4 text-left font-medium">Prop</th>
        <th class="py-2 pr-4 text-left font-medium">Type</th>
        <th class="py-2 pr-4 text-left font-medium">Required</th>
        <th class="py-2 text-left font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>engine</code>
        </td>
        <td class="py-2 pr-4">
          <code>"javascript" | "wasm"</code>
        </td>
        <td class="py-2 pr-4">Yes</td>
        <td class="py-2">
          JS is smaller (~50KB), WASM is more accurate (~180KB)
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>languages</code>
        </td>
        <td class="py-2 pr-4">
          <code>string[]</code>
        </td>
        <td class="py-2 pr-4">Yes</td>
        <td class="py-2">Languages to support (e.g., ["tsx", "bash"])</td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>labels</code>
        </td>
        <td class="py-2 pr-4">
          <code>{"{ copy?: string, copied?: string }"}</code>
        </td>
        <td class="py-2 pr-4">No</td>
        <td class="py-2">Localized labels for copy button</td>
      </tr>
      <tr>
        <td class="py-2 pr-4">
          <code>children</code>
        </td>
        <td class="py-2 pr-4">
          <code>ReactNode</code>
        </td>
        <td class="py-2 pr-4">Yes</td>
        <td class="py-2">App content</td>
      </tr>
    </tbody>
  </table>

### CodeHighlighted Props

  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="py-2 pr-4 text-left font-medium">Prop</th>
        <th class="py-2 pr-4 text-left font-medium">Type</th>
        <th class="py-2 pr-4 text-left font-medium">Required</th>
        <th class="py-2 text-left font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>code</code>
        </td>
        <td class="py-2 pr-4">
          <code>string</code>
        </td>
        <td class="py-2 pr-4">Yes</td>
        <td class="py-2">Source code to display</td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>lang</code>
        </td>
        <td class="py-2 pr-4">
          <code>string</code>
        </td>
        <td class="py-2 pr-4">Yes</td>
        <td class="py-2">
          Language identifier (must be in provider's languages)
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>showLineNumbers</code>
        </td>
        <td class="py-2 pr-4">
          <code>boolean</code>
        </td>
        <td class="py-2 pr-4">No</td>
        <td class="py-2">Display line numbers</td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>highlightLines</code>
        </td>
        <td class="py-2 pr-4">
          <code>number[]</code>
        </td>
        <td class="py-2 pr-4">No</td>
        <td class="py-2">Lines to emphasize (1-indexed)</td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>showCopyButton</code>
        </td>
        <td class="py-2 pr-4">
          <code>boolean</code>
        </td>
        <td class="py-2 pr-4">No</td>
        <td class="py-2">Show copy-to-clipboard button</td>
      </tr>
      <tr class="border-b border-kumo-hairline/50">
        <td class="py-2 pr-4">
          <code>labels</code>
        </td>
        <td class="py-2 pr-4">
          <code>{"{ copy?: string, copied?: string }"}</code>
        </td>
        <td class="py-2 pr-4">No</td>
        <td class="py-2">Override provider labels for this instance</td>
      </tr>
      <tr>
        <td class="py-2 pr-4">
          <code>className</code>
        </td>
        <td class="py-2 pr-4">
          <code>string</code>
        </td>
        <td class="py-2 pr-4">No</td>
        <td class="py-2">Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

### useShikiHighlighter Return Value

  
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-kumo-hairline">
          <th class="py-2 pr-4 text-left font-medium">Property</th>
          <th class="py-2 pr-4 text-left font-medium">Type</th>
          <th class="py-2 text-left font-medium">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-kumo-hairline/50">
          <td class="py-2 pr-4"><code>highlight</code></td>
          <td class="py-2 pr-4"><code>(code, lang, options?) =&gt; string | null</code></td>
          <td class="py-2">Returns highlighted HTML, or null if not ready</td>
        </tr>
        <tr class="border-b border-kumo-hairline/50">
          <td class="py-2 pr-4"><code>isLoading</code></td>
          <td class="py-2 pr-4"><code>boolean</code></td>
          <td class="py-2">True while Shiki is loading</td>
        </tr>
        <tr class="border-b border-kumo-hairline/50">
          <td class="py-2 pr-4"><code>isReady</code></td>
          <td class="py-2 pr-4"><code>boolean</code></td>
          <td class="py-2">True when highlight() is safe to call</td>
        </tr>
        <tr>
          <td class="py-2 pr-4"><code>error</code></td>
          <td class="py-2 pr-4"><code>Error | null</code></td>
          <td class="py-2">Error if Shiki initialization failed</td>
        </tr>
      </tbody>
    </table>

</ComponentSection>
