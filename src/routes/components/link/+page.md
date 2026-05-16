---
title: "Link"
description: "A styled anchor component for inline text links with multiple variants and composition support."
sourceFile: "components/link"
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

<ComponentExample demo="LinkBasicDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```tsx
```

### Granular

```tsx
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

### Basic Link

  
    The default Link component renders an underlined anchor with primary color styling.
  

```tsx

export default function Example() {
  return (
    <p>
      Read our <Link href="/docs">documentation</Link> for more details.
    </p>
  );
}
```

### External Links

  Use the `Link.ExternalIcon` subcomponent to indicate links that open in a new
  tab.

```tsx

export default function Example() {
  return (
    <Link
      href="https://cloudflare.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit Cloudflare <Link.ExternalIcon />
    </Link>
  );
}
```

### Framework Integration (LinkProvider)

  For app-wide router integration, configure a `LinkProvider` at your app root.
  Your wrapper component receives `href` and is responsible for bridging to your
  router's API. This lets engineers use `&lt;Link href="..."&gt;` everywhere without
  thinking about routing internals.

```tsx

// Your app's wrapper maps href to the router's navigation prop
// and handles external URLs with a plain <a>
const AppLink = forwardRef(({ href, to, ...rest }, ref) => {
  const destination = href ?? to;
  const isExternal =
    destination?.startsWith("http") &&
    new URL(destination).origin !== window.location.origin;

  if (isExternal) {
    return <a ref={ref} href={destination} {...rest} />;
  }
  return <RouterLink ref={ref} to={destination} {...rest} />;
});

// Wrap your app once
export function App() {
  return (
    <LinkProvider component={AppLink}>
      {/* All <Link href="..."> calls go through AppLink */}
      <YourApp />
    </LinkProvider>
  );
}
```

### Composition with render prop

  For exceptional cases where you need direct control over the rendered element,
  use the `render` prop. This bypasses the `LinkProvider` entirely — all other
  props (`href`, `target`, `className`, etc.) are merged onto the provided element
  automatically.

```tsx

export default function Example() {
  return (
    <>
      {/* Force a specific router link (bypasses LinkProvider) */}
      <Link render={<RouterLink to="/dashboard" />} variant="inline">
        Dashboard
      </Link>

      {/* Force a plain anchor (bypasses LinkProvider) */}
      <Link render={<a />} href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Site <Link.ExternalIcon />
      </Link>
    </>
  );
}
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Inline in Paragraph

Links flow naturally within paragraph text with proper underline offset.

<ComponentExample demo="LinkInParagraphDemo" />

### External Link with Icon

  Use `Link.ExternalIcon` to visually indicate links that navigate away from
  your site.

<ComponentExample demo="LinkExternalDemo" />

### Current Variant (Color Inheritance)

  The `current` variant inherits color from its parent, useful for links within
  colored contexts like alerts.

<ComponentExample demo="LinkCurrentVariantDemo" />

### Composition with render prop

  The `render` prop lets you compose Link styling onto any element, enabling
  integration with framework routing components.

<ComponentExample demo="LinkRenderDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Link Props

Extends all native anchor element attributes.

  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Default</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">variant</td>
        <td class="px-4 py-3 font-mono text-xs">
          "inline" | "current" | "plain"
        </td>
        <td class="px-4 py-3 font-mono text-xs">"inline"</td>
        <td class="px-4 py-3 text-xs">Visual style variant</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">render</td>
        <td class="px-4 py-3 font-mono text-xs">ReactElement</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">
          Element to render with Link props merged onto it
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">href</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">
          Link destination URL. Use this for all links — both internal and
          external. Configure a `LinkProvider` to bridge `href` to your
          router.
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">to</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">
          <strong>Deprecated.</strong> Use `href` instead. This prop will
          be removed in a future major version.
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">className</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Additional CSS classes</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">children</td>
        <td class="px-4 py-3 font-mono text-xs">ReactNode</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Link content</td>
      </tr>
    </tbody>
  </table>

### Variants

  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Variant</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
        <th class="px-4 py-3 text-left font-semibold">Use Case</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">inline</td>
        <td class="px-4 py-3 text-xs">Primary color with underline</td>
        <td class="px-4 py-3 text-xs">Default for inline text links</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">current</td>
        <td class="px-4 py-3 text-xs">
          Inherits parent text color with underline
        </td>
        <td class="px-4 py-3 text-xs">
          Links within colored contexts (alerts, errors)
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">plain</td>
        <td class="px-4 py-3 text-xs">Primary color without underline</td>
        <td class="px-4 py-3 text-xs">Navigation links, menus, footers</td>
      </tr>
    </tbody>
  </table>

### Link.ExternalIcon

  SVG icon component to indicate external links. Accepts all SVG element
  attributes.

```tsx
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site <Link.ExternalIcon />
</Link>
```

</ComponentSection>

<!-- Design Guidelines -->

<ComponentSection>

## Design Guidelines

  
    

      ### When to Use Each Variant

      <ul class="ml-4 list-disc space-y-1">
        <li>
          <strong>inline</strong>: Default choice for links within body text
        </li>
        <li>
          <strong>current</strong>: Links inside alerts, banners, or other
          colored containers
        </li>
        <li>
          <strong>plain</strong>: Navigation menus, footers, or where underlines
          are distracting
        </li>
      </ul>
    
    

      ### External Link Indicators

      <ul class="ml-4 list-disc space-y-1">
        <li>Always use `Link.ExternalIcon` for links that open in new tabs</li>
        <li>
          Set `target="_blank"` and `rel="noopener noreferrer"` for security
        </li>
        <li>
          The icon provides a visual cue that users will leave the current site
        </li>
      </ul>
    
    

      ### Framework Integration

      <ul class="ml-4 list-disc space-y-1">
        <li>
          Configure a `LinkProvider` at your app root to integrate with your
          client-side router
        </li>
        <li>
          Your wrapper receives `href` and maps it to your router's
          navigation prop (e.g. React Router's `to`)
        </li>
        <li>
          The wrapper should handle external URLs by rendering a plain
          `&lt;a&gt;` instead of routing them
        </li>
        <li>
          Use the `render` prop as an escape hatch for exceptional cases
          that need direct control over the rendered element
        </li>
        <li>
          The `to` prop is deprecated — use `href` for all link destinations
        </li>
      </ul>
    
    

      ### Accessibility

      <ul class="ml-4 list-disc space-y-1">
        <li>Links are keyboard focusable by default</li>
        <li>
          The external icon has `aria-hidden="true"` - add descriptive text for
          screen readers
        </li>
        <li>Ensure sufficient color contrast for all variants</li>
        <li>Use descriptive link text (avoid "click here")</li>
      </ul>

</ComponentSection>
