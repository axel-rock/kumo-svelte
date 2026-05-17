---
title: "Popover"
description: "An accessible popup anchored to a trigger element, used for displaying rich content like menus, forms, or additional information."
sourceFile: "components/popover"
baseUIComponent: "popover"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="PopoverHeroDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```svelte
import { Popover } from "kumo-svelte";
```

### Granular

```svelte
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose
} from "kumo-svelte/components/popover";
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script>
  import { Button } from "kumo-svelte";
  import {
    PopoverRoot,
    PopoverTrigger,
    PopoverContent,
    PopoverTitle,
    PopoverDescription
  } from "kumo-svelte/components/popover";
</script>

<PopoverRoot>
  <PopoverTrigger>
    {#snippet child({ props })}
      <Button {...props}>Open</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Popover Title</PopoverTitle>
    <PopoverDescription>Popover content goes here.</PopoverDescription>
  </PopoverContent>
</PopoverRoot>
```

</ComponentSection>

<!-- Popover vs Tooltip -->

<ComponentSection>

## Popover vs Tooltip

  
While popovers can be triggered on hover (using `openOnHover`), they serve a
    different purpose than tooltips. Understanding when to use each is important
    for accessibility and user experience.

  <div class="overflow-hidden rounded-lg border border-kumo-hairline">
    <table class="w-full text-sm">
      <thead class="bg-kumo-elevated">
        <tr>
          <th class="px-4 py-3 text-left font-semibold"></th>
          <th class="px-4 py-3 text-left font-semibold">Tooltip</th>
          <th class="px-4 py-3 text-left font-semibold">Popover</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-kumo-hairline">
        <tr>
          <td class="px-4 py-3 font-medium">Purpose</td>
          <td class="px-4 py-3 text-kumo-subtle">
            Short, non-interactive text labels for identification
          </td>
          <td class="px-4 py-3 text-kumo-subtle">
            Rich, interactive content containers
          </td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-medium">Content</td>
          <td class="px-4 py-3 text-kumo-subtle">Plain text only</td>
          <td class="px-4 py-3 text-kumo-subtle">
            Any content: links, buttons, forms, images
          </td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-medium">Trigger</td>
          <td class="px-4 py-3 text-kumo-subtle">Hover or focus</td>
          <td class="px-4 py-3 text-kumo-subtle">Click (default) or hover</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-medium">ARIA Role</td>
          <td class="px-4 py-3">
            <code class="rounded bg-kumo-elevated px-1.5 py-0.5 font-mono text-xs">
              role="tooltip"
            </code>
          </td>
          <td class="px-4 py-3">
            <code class="rounded bg-kumo-elevated px-1.5 py-0.5 font-mono text-xs">
              aria-haspopup
            </code>
          </td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-medium">Keyboard</td>
          <td class="px-4 py-3 text-kumo-subtle">Not focusable</td>
          <td class="px-4 py-3 text-kumo-subtle">
            Focus moves inside, traps when open
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
**Use a Tooltip** when you need to label an icon button or
    provide a brief explanation. **Use a Popover** when users need
    to interact with the content inside, such as clicking links, filling out
    forms, or dismissing with a button.

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic Popover

<ComponentExample demo="PopoverBasicDemo" />

### With Close Button

<ComponentExample demo="PopoverWithCloseDemo" />

### Positioning


Use the `side` prop to control where the popover appears relative to the
  trigger.

<ComponentExample demo="PopoverPositionDemo" />

### Custom Content


Popovers can contain any content, including custom layouts with avatars,
  buttons, and more.

<ComponentExample demo="PopoverCustomContentDemo" />

### Open on Hover


  Use `openOnHover` on the trigger to open the popover when the user hovers over
  it. You can also specify `openDelay` and `closeDelay` in milliseconds.

<ComponentExample demo="PopoverOpenOnHoverDemo" />

### Virtual Anchor


Use the `customAnchor` prop on `PopoverContent` to position the popover against an
  element other than the trigger, or against a virtual point (e.g., a `DOMRect`
  from `getBoundingClientRect()`). This is useful when the trigger and the
  desired anchor are in different component trees.

<ComponentExample demo="PopoverVirtualAnchorDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Popover


Compatibility component that can either wrap compound Popover children or render
the common trigger/title/description pattern.

<PropsTable component="Popover" />

### PopoverRoot

The root component that manages the popover's open state.

<PropsTable component="PopoverRoot" />

### PopoverTrigger

A button that opens the popover when clicked. Use a `child` snippet to render
your own element.

<PropsTable component="PopoverTrigger" />

### PopoverContent


The container for popover content. Controls positioning via `side`, `align`,
  `sideOffset`, and `alignOffset` props. Use the `customAnchor` prop to position
  against a custom element or virtual point instead of the trigger. Use
  `positionMethod="fixed"` when the popover needs to escape stacking contexts,
  such as when inside sticky headers.

<PropsTable component="PopoverContent" />

### PopoverTitle


A heading that labels the popover for accessibility.

<PropsTable component="PopoverTitle" />

### PopoverDescription


A paragraph providing additional context about the popover content.

<PropsTable component="PopoverDescription" />

### PopoverClose


A button that closes the popover when clicked. Use a `child` snippet to render
your own element.

<PropsTable component="PopoverClose" />

</ComponentSection>
