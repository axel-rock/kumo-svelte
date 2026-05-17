<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import { Button } from '$lib/components/button';
  import { Dialog } from '$lib/components/dialog';
  import { Input } from '$lib/components/input';
  import { cn } from '$lib/utils/cn';

  interface Props {
    resourceType: string;
    resourceName: string;
    open?: boolean;
    triggerLabel?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    errorMessage?: string;
    onDelete?: () => void | Promise<void>;
    class?: string;
  }

  let {
    resourceType,
    resourceName,
    open = $bindable(false),
    triggerLabel,
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    errorMessage,
    onDelete,
    class: className
  }: Props = $props();

  let confirmation = $state('');
  let isDeleting = $state(false);
  const canDelete = $derived(confirmation === resourceName && !isDeleting);

  async function handleDelete() {
    if (!canDelete) return;
    isDeleting = true;
    try {
      await onDelete?.();
      open = false;
      confirmation = '';
    } finally {
      isDeleting = false;
    }
  }
</script>

<Dialog bind:open role="alertdialog" title={`Delete ${resourceType}`} description="This action cannot be undone.">
  {#snippet trigger(props)}
    <Button {...props} variant="destructive" class={className}>
      {triggerLabel ?? `Delete ${resourceType}`}
    </Button>
  {/snippet}

  <div class="space-y-4">
    {#if errorMessage}
      <Banner variant="error" title="Delete failed" description={errorMessage} />
    {/if}

    <p class="text-sm leading-6 text-kumo-subtle">
      Type <strong class="font-mono text-kumo-default">{resourceName}</strong> to confirm deletion.
    </p>

    <Input bind:value={confirmation} aria-label={`Type ${resourceName} to confirm`} />

    <div class="flex justify-end gap-2">
      <Button variant="secondary" onclick={() => (open = false)}>{cancelLabel}</Button>
      <Button
        variant="destructive"
        disabled={!canDelete}
        class={cn(isDeleting && 'opacity-70')}
        onclick={handleDelete}
      >
        {isDeleting ? 'Deleting...' : confirmLabel}
      </Button>
    </div>
  </div>
</Dialog>
