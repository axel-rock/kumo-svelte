<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="sticky top-0 z-10 hidden h-12 border-b border-kumo-hairline bg-kumo-canvas md:flex">
  <div class="flex min-w-0 flex-1 items-center justify-end border-r border-kumo-hairline px-4">
    <a
      href="https://github.com/maxffarrell/kumo-svelte"
      target="_blank"
      rel="noopener noreferrer"
      class="font-mono text-sm text-kumo-subtle transition-colors hover:text-kumo-default"
    >
      kumo-svelte
      <span class="ml-1 rounded bg-kumo-control px-1.5 py-0.5 text-xs">v2.2.1</span>
    </a>
  </div>

  <div class="flex w-12 shrink-0 items-center justify-center">
    <ThemeToggle />
  </div>
</header>
