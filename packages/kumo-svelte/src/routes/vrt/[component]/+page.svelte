<script lang="ts">
  import { page } from '$app/state';
  import { loadGallery } from '$lib/vrt/registry';
  import type { Component } from 'svelte';

  let Gallery = $state<Component | null>(null);
  let loaded = $state(false);

  $effect(() => {
    const slug = page.params.component;
    loaded = false;
    loadGallery(slug).then((g) => {
      Gallery = g;
      loaded = true;
    });
  });
</script>

<main class="vr-page" data-vr-page={page.params.component} data-vr-ready={loaded}>
  {#if Gallery}
    <Gallery />
  {:else if loaded}
    <p>No VRT gallery for "{page.params.component}".</p>
  {/if}
</main>

<style>
  .vr-page {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem;
  }
</style>
