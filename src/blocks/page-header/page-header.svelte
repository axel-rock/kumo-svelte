<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { Breadcrumbs, type BreadcrumbsItem } from '$lib/components/breadcrumbs';
  import { Tabs, type TabsItem } from '$lib/components/tabs';
  import { cn } from '$lib/utils/cn';

  interface Props {
    breadcrumbs?: BreadcrumbsItem[];
    title?: string;
    description?: string;
    icon?: Component;
    tabs?: TabsItem[];
    activeTab?: string;
    onTabChange?: (value: string) => void;
    actions?: Snippet;
    children?: Snippet;
    class?: string;
  }

  let {
    breadcrumbs = [],
    title,
    description,
    icon: Icon,
    tabs = [],
    activeTab = $bindable(),
    onTabChange,
    actions,
    children,
    class: className
  }: Props = $props();
</script>

<header class={cn('space-y-4', className)}>
  {#if breadcrumbs.length > 0}
    <Breadcrumbs items={breadcrumbs} />
  {/if}

  <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div class="min-w-0 space-y-2">
      {#if title}
        <div class="flex min-w-0 items-center gap-3">
          {#if Icon}
            <span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-kumo-tint text-kumo-default">
              <Icon />
            </span>
          {/if}
          <h1 class="truncate text-2xl font-semibold tracking-normal text-kumo-default">{title}</h1>
        </div>
      {/if}

      {#if description}
        <p class="max-w-3xl text-sm leading-6 text-kumo-subtle">{description}</p>
      {/if}

      {@render children?.()}
    </div>

    {#if actions}
      <div class="flex shrink-0 items-center gap-2">{@render actions()}</div>
    {/if}
  </div>

  {#if tabs.length > 0}
    <Tabs bind:value={activeTab} items={tabs} onValueChange={onTabChange} />
  {/if}
</header>
