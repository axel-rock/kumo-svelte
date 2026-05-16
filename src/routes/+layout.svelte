<script lang="ts">
  import '../lib/styles.css';
  import SidebarNav from '$lib/docs/SidebarNav.svelte';
  import { TooltipProvider } from '$lib/components/tooltip';
</script>

<svelte:head>
  <title>Kumo</title>
  <meta name="description" content="Kumo - a modern component library" />
  <meta name="color-scheme" content="light dark" />
  <script>
    (function () {
      const stored = localStorage.getItem('theme');
      if (stored) {
        document.documentElement.setAttribute('data-mode', stored);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-mode', 'dark');
      }
    })();
  </script>
</svelte:head>

<TooltipProvider>
  <div class="isolate min-h-screen bg-kumo-canvas text-kumo-default">
    <SidebarNav />
    <div id="main-content" class="main-content mt-12 md:mt-0 md:ml-12 transition-[margin] duration-300">
      <slot />
    </div>
  </div>
</TooltipProvider>

<style>
  @media (min-width: 768px) {
    :global(body:has(aside[data-sidebar-open='true']) .main-content) {
      margin-left: 304px;
    }

    :global(body:has(aside[data-sidebar-open='false']) .main-content) {
      margin-left: 48px;
    }
  }
</style>
