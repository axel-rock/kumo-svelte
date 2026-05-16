---
title: "Delete Resource"
description: "A confirmation dialog for safely deleting resources, requiring users to type the resource name to confirm."
sourceFile: "blocks/delete-resource"
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

<ComponentExample demo="DeleteResourceBasicDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

  
    DeleteResource is a <strong>block</strong> - a CLI-installed component that
    you own and can customize. Unlike regular components, blocks are copied into
    your project so you have full control over the code.
  
  
    
      **1. Initialize Kumo config (first time only)**

```bash
npx kumo-svelte init
```

**2. Install the block**

```bash
npx kumo-svelte add DeleteResource
```

**3. Import from your local path**

```svelte
<script lang="ts">
  import { Button, Dialog } from 'kumo-svelte';

  let open = $state(false);
</script>

<Button variant="destructive" onclick={() => (open = true)}>Delete Zone</Button>
<Dialog bind:open title="Delete Zone" description="This action cannot be undone.">
  <Button variant="destructive">Delete</Button>
</Dialog>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Worker Deletion

  Works with any resource type - just change the resourceType and resourceName
  props.

<ComponentExample demo="DeleteResourceWorkerDemo" />

### Error State

  
    Use the errorMessage prop to show an error message.

<ComponentExample demo="DeleteResourceErrorDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="DeleteResource"  />

</ComponentSection>
