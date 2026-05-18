<script lang="ts">
  import DemoRenderer from './DemoRenderer.svelte';

  interface Props {
    title: string;
    description: string;
    href: string;
    demo?: string;
    children?: import('svelte').Snippet;
  }

  let { title, description, href, demo, children }: Props = $props();
</script>

<div class="rounded-lg border border-kumo-hairline bg-kumo-elevated">
  <div class="p-4">
    <div class="text-kumo-default">{title}</div>
    <div class="mt-1 text-sm text-kumo-secondary">{description}</div>

    <div class="mt-4">
      <a {href} class="inline-flex items-center justify-center rounded-md border border-kumo-hairline bg-kumo-control px-3 py-1.5 text-sm font-medium text-kumo-default transition-colors hover:bg-kumo-recessed hover:underline">
        Learn more
      </a>
    </div>
  </div>

  <div class="border-t border-kumo-hairline bg-kumo-base p-2">
    {#if demo}
      <DemoRenderer {demo} />
    {:else if children}
      {@render children()}
    {/if}
  </div>
</div>
