<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager)}
    <Button
      variant="secondary"
      onclick={() =>
        toastManager.add({
          title: "Toast created",
          description: "This is a toast notification.",
          variant: "default"
        })}
    >
      Show toast
    </Button>
  {/snippet}
</Toasty>
