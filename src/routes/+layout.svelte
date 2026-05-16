<script lang="ts">
  import '../lib/styles.css';
  import { KumoLogo } from '$lib';
</script>

<svelte:head>
  <title>Kumo Svelte</title>
  <meta name="description" content="Svelte port of Cloudflare Kumo UI" />
</svelte:head>

<div class="min-h-screen bg-kumo-surface text-kumo-default">
  <header class="sticky top-0 z-40 border-b border-kumo-line bg-kumo-base/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <KumoLogo />
      <nav class="flex items-center gap-4 text-sm text-kumo-muted">
        <a class="hover:text-kumo-default" href="#components">Components</a>
        <a class="hover:text-kumo-default" href="#tokens">Tokens</a>
      </nav>
    </div>
  </header>
  <slot />
</div>
