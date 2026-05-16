<script module>
  export {};
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import BaseUIIcon from './BaseUIIcon.svelte';
  import CopyPageButton from './CopyPageButton.svelte';
  import GitHubIcon from './GitHubIcon.svelte';
  import StickyDocHeader from './StickyDocHeader.svelte';
  import TableOfContents from './TableOfContents.svelte';

  interface Props {
    metadata?: Record<string, unknown>;
    children?: Snippet;
  }

  let { metadata = {}, children }: Props = $props();

  const title = $derived(typeof metadata.title === 'string' ? metadata.title : undefined);
  const description = $derived(
    typeof metadata.description === 'string' ? metadata.description : undefined
  );
  const sourceFile = $derived(
    typeof metadata.sourceFile === 'string' ? metadata.sourceFile : undefined
  );
  const bitsUIComponent = $derived(
    typeof metadata.bitsUIComponent === 'string'
      ? metadata.bitsUIComponent
      : typeof metadata.baseUIComponent === 'string'
        ? metadata.baseUIComponent
        : undefined
  );
  const pageTitle = $derived(title ?? 'Kumo');
  const pageDescription = $derived(description ?? 'Kumo - a modern component library');
  const bitsUIUrl = $derived(
    bitsUIComponent ? `https://bits-ui.com/docs/components/${bitsUIComponent}` : null
  );
  const githubSourceUrl = $derived(
    sourceFile
      ? (() => {
          const base = 'https://github.com/maxffarrell/kumo-svelte/blob/main/src/lib/';
          if (/\.\w+$/.test(sourceFile)) return `${base}${sourceFile}`;
          const componentName = sourceFile.split('/').pop();
          return `${base}${sourceFile}/${componentName}.svelte`;
        })()
      : null
  );
</script>

<svelte:head>
  <title>{pageTitle} - Kumo</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="flex flex-col">
  <StickyDocHeader title={pageTitle} {githubSourceUrl} {bitsUIUrl} />

  <div id="page-header" class="border-b border-kumo-hairline md:pr-12">
    <div class="mx-auto md:border-r md:border-kumo-hairline">
      <div class="mx-auto max-w-7xl p-12">
        <div class="mb-3 md:hidden">
          <CopyPageButton align="center" />
        </div>
        <div class="mb-3 flex items-center gap-3">
          <h1 class="text-4xl font-bold tracking-tight text-kumo-default">{pageTitle}</h1>
          {#if githubSourceUrl}
            <a
              href={githubSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-kumo-subtle transition-colors hover:text-kumo-strong"
              title="View source on GitHub"
              aria-label="View source on GitHub"
            >
              <GitHubIcon size={28} />
            </a>
          {/if}
          {#if bitsUIUrl}
            <a
              href={bitsUIUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-kumo-subtle transition-colors hover:text-kumo-strong"
              title="View Bits UI documentation"
              aria-label="View Bits UI documentation"
            >
              <BaseUIIcon size={28} />
            </a>
          {/if}
          <div class="hidden md:ml-auto md:block">
            <CopyPageButton />
          </div>
        </div>
        <p class="text-lg text-kumo-strong">{pageDescription}</p>
      </div>
    </div>
  </div>

  <main class="flex grow flex-col md:pr-12">
    <div class="mx-auto w-full grow md:border-r md:border-kumo-hairline">
      <div class="sticky top-24 z-1 border-b border-kumo-hairline bg-kumo-canvas xl:hidden md:top-12">
        <div class="mx-auto max-w-7xl px-2 py-3 md:px-3">
          <TableOfContents layout="select" />
        </div>
      </div>

      <div class="mx-auto max-w-7xl p-12 pr-10">
        <div class="grid grid-cols-1 gap-16 xl:grid-cols-[3fr_1fr]">
          <div class="kumo-prose prose min-w-0 max-w-none">
            {@render children?.()}
          </div>
          <aside class="hidden min-w-0 xl:block">
            <div class="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </div>
  </main>
</div>
