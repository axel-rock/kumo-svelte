<script lang="ts">
  import type { Snippet } from 'svelte';
  import DemoRenderer from './DemoRenderer.svelte';
  import CodeBlock from './CodeBlock.svelte';
  import { getSvelteDemoSnippet } from './svelteDemoSnippets';

  interface Props {
    children?: Snippet;
    code?: string;
    demo?: string;
    lang?: string;
    vrSection?: string;
    vrTitle?: string;
  }

  let { children, code: codeProp, demo, lang = 'svelte', vrTitle }: Props = $props();
  const code = $derived((codeProp ?? (demo ? getSvelteDemoSnippet(demo) : '') ?? '').replace(/^\n+|\n+$/g, ''));
</script>

<div class="not-prose overflow-hidden rounded-lg">
  <div class="flex min-h-[120px] items-center justify-center rounded-t-lg border border-kumo-hairline bg-kumo-canvas p-6">
    {#if demo}
      <DemoRenderer {demo} />
    {:else if children}
      {@render children()}
    {:else}
      <p class="text-sm text-kumo-subtle">{vrTitle ?? demo ?? 'Example'}</p>
    {/if}
  </div>
  {#if code}
    <div class="component-example-code">
      <CodeBlock {code} {lang} />
    </div>
  {/if}
</div>

<style>
  .component-example-code :global(pre.shiki) {
    border-top: 0;
    border-radius: 0;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    margin: 0;
  }
</style>
