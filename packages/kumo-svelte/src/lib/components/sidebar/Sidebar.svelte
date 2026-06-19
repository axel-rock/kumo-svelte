<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { TooltipProvider } from '$lib/components/tooltip';
  import { getSidebarContext } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    contentClass?: string;
    [key: string]: unknown;
  }

  let { children, class: className, contentClass, ...rest }: Props = $props();
  const sidebar = getSidebarContext('Sidebar');
  let mobileNode: HTMLElement | null = $state(null);
  let mobileTrigger: HTMLElement | null = null;
  let shouldRestoreFocus = false;
  const isAlwaysExpanded = $derived(sidebar.collapsible === 'none');
  const expandedWidth = $derived(sidebar.resizable ? `${sidebar.width}px` : 'var(--sidebar-width)');
  const collapsedWidth = $derived(sidebar.collapsible === 'icon' ? 'var(--sidebar-width-icon)' : '0px');
  const railWidth = $derived(isAlwaysExpanded || sidebar.open ? expandedWidth : collapsedWidth);
  const contentWidth = $derived(
    isAlwaysExpanded || sidebar.open || sidebar.isPeeking ? expandedWidth : collapsedWidth
  );
  const borderClasses = $derived(
    sidebar.variant === 'sidebar'
      ? sidebar.side === 'left'
        ? 'border-r border-kumo-line'
        : 'border-l border-kumo-line'
      : sidebar.variant === 'floating'
        ? 'border border-kumo-line'
        : ''
  );
  const contentClasses = $derived(
    cn(
      'flex h-full min-w-0 flex-col overflow-hidden whitespace-nowrap bg-(--sidebar-bg) text-kumo-default',
      borderClasses,
      'transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none',
      sidebar.isResizing && 'transition-none!',
      !sidebar.open &&
        cn(
          sidebar.contained ? 'absolute' : 'fixed',
          'inset-y-0 z-40',
          sidebar.side === 'left' && 'left-0',
          sidebar.side === 'right' && 'right-0'
        ),
      sidebar.open && 'relative',
      contentClass
    )
  );

  function handlePeekBlur(event: FocusEvent) {
    if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) {
      sidebar.stopPeek();
    }
  }

  function closeMobile(restoreFocus: boolean) {
    shouldRestoreFocus = restoreFocus;
    sidebar.setOpenMobile(false);
  }

  function handleMobileKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') closeMobile(true);
  }

  function handleMobileFocusout(event: FocusEvent) {
    if (mobileNode && !mobileNode.contains(event.relatedTarget as Node | null)) {
      closeMobile(false);
    }
  }

  $effect(() => {
    if (!sidebar.isMobile || !sidebar.openMobile) return;

    mobileTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    shouldRestoreFocus = false;

    requestAnimationFrame(() => {
      const firstFocusable = mobileNode?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      (firstFocusable ?? mobileNode)?.focus();
    });
  });

  $effect(() => {
    if (sidebar.openMobile || !shouldRestoreFocus || !mobileTrigger) return;
    mobileTrigger.focus();
    mobileTrigger = null;
    shouldRestoreFocus = false;
  });
</script>

{#snippet sidebarContent()}
  <TooltipProvider>
    {@render children?.()}
  </TooltipProvider>
{/snippet}

{#if sidebar.isMobile}
  <div
    data-sidebar-backdrop
    data-kumo-component="Sidebar"
    data-kumo-part="mobile-backdrop"
    class={cn(
      sidebar.contained ? 'absolute inset-0 z-40 bg-kumo-recessed' : 'fixed inset-0 z-40 bg-kumo-recessed',
      'transition-opacity duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none',
      sidebar.openMobile ? 'opacity-80' : 'pointer-events-none opacity-0'
    )}
    onclick={() => closeMobile(true)}
    aria-hidden="true"
  ></div>

  <nav
    bind:this={mobileNode}
    tabindex="-1"
    aria-label="Navigation"
    aria-hidden={sidebar.openMobile ? undefined : 'true'}
    inert={sidebar.openMobile ? undefined : true}
    data-state={sidebar.openMobile ? 'expanded' : 'collapsed'}
    data-side={sidebar.side}
    data-variant={sidebar.variant}
    data-collapsible={sidebar.collapsible}
    data-mobile="true"
    data-sidebar="sidebar"
    class={cn(
      sidebar.contained
        ? 'group/sidebar absolute inset-y-0 z-50 flex w-(--sidebar-width) flex-col overflow-hidden'
        : 'group/sidebar fixed inset-y-0 z-50 flex w-(--sidebar-width) flex-col overflow-hidden',
      'border-r border-kumo-line bg-(--sidebar-bg) text-kumo-default transition-transform duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none',
      sidebar.side === 'left' && 'left-0',
      sidebar.side === 'right' && 'right-0',
      sidebar.side === 'left' && (sidebar.openMobile ? 'translate-x-0' : '-translate-x-full'),
      sidebar.side === 'right' && (sidebar.openMobile ? 'translate-x-0' : 'translate-x-full'),
      className
    )}
    onkeydown={handleMobileKeydown}
    onfocusout={handleMobileFocusout}
    {...rest}
  >
    {@render sidebarContent()}
  </nav>
{:else if isAlwaysExpanded}
  <aside
    data-state="expanded"
    data-side={sidebar.side}
    data-variant={sidebar.variant}
    data-sidebar="sidebar"
    style:width="var(--sidebar-width)"
    style:min-width="var(--sidebar-width)"
    style:max-width="var(--sidebar-width)"
    class={cn(
      'relative flex h-full shrink-0 grow-0 flex-col overflow-hidden bg-(--sidebar-bg) text-kumo-default',
      sidebar.variant === 'sidebar' &&
        (sidebar.side === 'left' ? 'border-r border-kumo-line' : 'border-l border-kumo-line'),
      sidebar.variant === 'floating' && 'm-2 rounded-lg border border-kumo-line shadow-lg',
      className
    )}
    {...rest}
  >
    {@render sidebarContent()}
  </aside>
{:else}
  <aside
    data-state={sidebar.state}
    data-side={sidebar.side}
    data-variant={sidebar.variant}
    data-collapsible={sidebar.collapsible}
    data-sidebar="sidebar"
    style:width={railWidth}
    class={cn(
      'group/sidebar relative h-full shrink-0 grow-0 overflow-visible transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none',
      sidebar.isResizing && 'transition-none!',
      sidebar.variant === 'floating' && 'm-2 rounded-lg shadow-lg',
      className
    )}
    {...rest}
  >
    <div
      data-sidebar="content-container"
      style:width={contentWidth}
      class={contentClasses}
    >
      <div
        data-sidebar="peek-zone"
        class="flex min-h-0 flex-1 flex-col"
        onmouseenter={sidebar.startPeek}
        onmouseleave={sidebar.stopPeek}
        onfocus={sidebar.startPeek}
        onblur={handlePeekBlur}
      >
        {@render sidebarContent()}
      </div>
    </div>
  </aside>
{/if}
