<script lang="ts">
  import type { Component } from 'svelte';

  interface Props {
    demo: string;
  }

  let { demo }: Props = $props();

  const demoModules = import.meta.glob('./demo-snippets/*.svelte', {
    eager: true,
    import: 'default'
  }) as Record<string, Component>;

  const demos = new Map(
    Object.entries(demoModules).map(([path, component]) => {
      const name = path.split('/').pop()?.replace(/\.svelte$/, '') ?? '';
      return [name, component] as const;
    })
  );

  const DemoComponent = $derived(demos.get(demo));
</script>

{#if DemoComponent}
  <DemoComponent />
{:else}
  <p class="text-sm text-kumo-subtle">Demo not available: {demo}</p>
{/if}
