<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { LayerCard } from '$lib/components/layer-card';
  import { cn } from '$lib/utils/cn';

  interface Props {
    title: string;
    description?: string;
    icon?: Component;
    usage?: Snippet;
    additionalContent?: Snippet;
    children?: Snippet;
    class?: string;
  }

  let {
    title,
    description,
    icon: Icon,
    usage,
    additionalContent,
    children,
    class: className
  }: Props = $props();
</script>

<div class={cn('grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]', className)}>
  <main class="min-w-0 space-y-6">
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        {#if Icon}
          <span class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-kumo-tint text-kumo-default">
            <Icon />
          </span>
        {/if}
        <h1 class="text-2xl font-semibold tracking-normal text-kumo-default">{title}</h1>
      </div>
      {#if description}
        <p class="max-w-3xl text-sm leading-6 text-kumo-subtle">{description}</p>
      {/if}
    </div>

    {@render children?.()}
  </main>

  {#if usage || additionalContent}
    <aside class="space-y-4">
      {#if usage}
        <LayerCard class="p-4">{@render usage()}</LayerCard>
      {/if}
      {#if additionalContent}
        <LayerCard class="p-4">{@render additionalContent()}</LayerCard>
      {/if}
    </aside>
  {/if}
</div>
