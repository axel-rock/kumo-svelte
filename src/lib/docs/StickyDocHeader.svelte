<script lang="ts">
  import { onMount } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import ThemeToggle from './ThemeToggle.svelte';
  import BaseUIIcon from './BaseUIIcon.svelte';
  import GitHubIcon from './GitHubIcon.svelte';

  interface Props {
    title: string;
    githubSourceUrl?: string | null;
    baseUIUrl?: string | null;
  }

  let { title, githubSourceUrl = null, baseUIUrl = null }: Props = $props();
  let showStickyTitle = $state(false);
  let sidebarOpen = $state(true);
  let headerRef: HTMLElement;

  onMount(() => {
    const sidebar = document.querySelector('aside[data-sidebar-open]');
    const checkSidebarState = () => {
      if (sidebar) sidebarOpen = sidebar.getAttribute('data-sidebar-open') === 'true';
    };

    checkSidebarState();
    const sidebarObserver = sidebar ? new MutationObserver(checkSidebarState) : null;
    sidebarObserver?.observe(sidebar!, {
      attributes: true,
      attributeFilter: ['data-sidebar-open']
    });

    const pageHeader = document.getElementById('page-header');
    const margin = headerRef ? Math.round(headerRef.getBoundingClientRect().bottom) : 48;
    const headerObserver =
      pageHeader &&
      new IntersectionObserver(
        ([entry]) => {
          showStickyTitle = !entry.isIntersecting;
        },
        { rootMargin: `-${margin}px 0px 0px 0px` }
      );

    if (pageHeader && headerObserver) headerObserver.observe(pageHeader);

    return () => {
      sidebarObserver?.disconnect();
      headerObserver?.disconnect();
    };
  });
</script>

{#if !sidebarOpen}
  <div
    class={cn(
      'pointer-events-none fixed top-0 left-12 z-50 flex h-12 items-center font-medium transition-opacity duration-200 select-none',
      showStickyTitle ? 'opacity-100' : 'opacity-0'
    )}
    style="padding-left: 4.25rem"
  >
    <span class="pointer-events-auto flex items-center gap-2 text-base">
      <span class="text-kumo-subtle">/ </span>
      <span class="font-semibold tracking-tight">{title}</span>
      {#if githubSourceUrl}
        <a
          href={githubSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-kumo-subtle transition-colors hover:text-kumo-default"
          title="View source on GitHub"
          aria-label="View source on GitHub"
          tabindex={showStickyTitle ? 0 : -1}
        >
          <GitHubIcon size={18} />
        </a>
      {/if}
      {#if baseUIUrl}
        <a
          href={baseUIUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-kumo-subtle transition-colors hover:text-kumo-default"
          title="View Base UI documentation"
          aria-label="View Base UI documentation"
          tabindex={showStickyTitle ? 0 : -1}
        >
          <BaseUIIcon size={18} />
        </a>
      {/if}
    </span>
  </div>
{/if}

<header
  bind:this={headerRef}
  class="sticky top-12 z-10 flex h-12 border-b border-kumo-hairline bg-kumo-elevated md:top-0"
>
  <div class="flex min-w-0 flex-1 items-center justify-between px-4 md:border-r md:border-kumo-hairline">
    <div
      class={cn(
        'flex items-center gap-2 transition-opacity duration-200',
        showStickyTitle && sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <span class="text-lg font-semibold tracking-tight text-kumo-default">{title}</span>
      {#if githubSourceUrl}
        <a
          href={githubSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-kumo-subtle transition-colors hover:text-kumo-default"
          title="View source on GitHub"
          aria-label="View source on GitHub"
          tabindex={showStickyTitle && sidebarOpen ? 0 : -1}
        >
          <GitHubIcon size={20} />
        </a>
      {/if}
      {#if baseUIUrl}
        <a
          href={baseUIUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-kumo-subtle transition-colors hover:text-kumo-default"
          title="View Base UI documentation"
          aria-label="View Base UI documentation"
          tabindex={showStickyTitle && sidebarOpen ? 0 : -1}
        >
          <BaseUIIcon size={20} />
        </a>
      {/if}
    </div>
    <a
      href="https://github.com/maxffarrell/kumo-svelte"
      target="_blank"
      rel="noopener noreferrer"
      class="font-mono text-sm text-kumo-subtle transition-colors hover:text-kumo-default"
    >
      kumo-svelte
    </a>
  </div>
  <div class="hidden w-12 shrink-0 items-center justify-center md:flex">
    <ThemeToggle />
  </div>
</header>
