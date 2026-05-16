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
npx @cloudflare/kumo init
```

**2. Install the block**

```bash
npx @cloudflare/kumo add DeleteResource
```

**3. Import from your local path**

```tsx
// The path depends on your kumo.json blocksDir setting
// Default: src/components/kumo/
```

<Callout type="info">
    <strong>Why blocks?</strong> Blocks give you full ownership of the code,
    allowing you to customize deletion flows to fit your specific needs. They're
    ideal for critical actions that often need project-specific modifications.

</Callout>

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```tsx

export default function Example() {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteZone("example.com");
      setOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Zone
      </Button>
      <DeleteResource
        open={open}
        onOpenChange={setOpen}
        resourceType="Zone"
        resourceName="example.com"
        onDelete={handleDelete}
        isDeleting={isDeleting}
/>
    </>
  );
}
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
