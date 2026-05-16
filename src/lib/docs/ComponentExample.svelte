<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    demo?: string;
    vrSection?: string;
    vrTitle?: string;
  }

  let { children, demo, vrTitle }: Props = $props();
</script>

<div class="not-prose my-4 rounded-lg border border-kumo-hairline bg-kumo-canvas p-6">
  {#if children}
    {@render children()}
  {:else}
    <p class="text-sm text-kumo-subtle">{vrTitle ?? demo ?? 'Example'}</p>
  {/if}
</div>
