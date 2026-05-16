<script lang="ts">
  import { Check, ChevronDown, Copy, ExternalLink, FileText, Link } from '@lucide/svelte';
  import { Button } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';

  interface Props {
    align?: 'start' | 'center' | 'end';
  }

  let { align = 'end' }: Props = $props();
  let copied = $state(false);
  let open = $state(false);

  function getMarkdownUrl() {
    const url = new URL(window.location.href);
    let path = url.pathname.replace(/\/+$/, '');
    path = path.replace(/^\/changelog\/.*/, '/changelog');
    return `${url.origin}${path}.md`;
  }

  function onCopySuccess() {
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  async function handleCopyMarkdown() {
    onCopySuccess();

    try {
      const response = await fetch(getMarkdownUrl());
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await navigator.clipboard.writeText(await response.text());
    } catch (error) {
      console.error('Failed to copy page as Markdown:', error);
    }
  }

  async function handleCopyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      onCopySuccess();
    } catch (error) {
      console.error('Failed to copy page link:', error);
    }
  }

  function handleViewMarkdown() {
    window.open(getMarkdownUrl(), '_blank');
    open = false;
  }

  function getAIPromptUrl(baseUrl: string) {
    const prompt = encodeURIComponent(
      `Read through this Kumo documentation: ${getMarkdownUrl()}. I'll need your help to understand it, so be prepared to explain concepts, share examples, and assist with debugging.`
    );
    return `${baseUrl}?q=${prompt}`;
  }

  const menuClass = $derived(
    cn(
      'absolute top-full z-50 mt-1 min-w-52 rounded-lg border border-kumo-hairline bg-kumo-elevated p-1 text-sm shadow-lg',
      align === 'start' && 'left-0',
      align === 'center' && 'left-1/2 -translate-x-1/2',
      align === 'end' && 'right-0'
    )
  );
</script>

<div class="relative flex items-center" data-copy-ignore>
  <Button
    class="gap-1.5 rounded-r-none border-r-0"
    size="sm"
    variant="secondary"
    onclick={handleCopyMarkdown}
  >
    {#if copied}
      <Check size={16} />
    {:else}
      <Copy size={16} />
    {/if}
    <span>Copy page</span>
  </Button>
  <Button
    variant="secondary"
    size="sm"
    shape="square"
    aria-label="Copy page options"
    aria-expanded={open}
    class="rounded-l-none"
    onclick={() => {
      open = !open;
    }}
  >
    <ChevronDown size={12} />
  </Button>

  {#if open}
    <div class={menuClass}>
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-kumo-default hover:bg-kumo-tint"
        onclick={handleCopyPageLink}
      >
        <Link size={16} /> Copy page link
      </button>
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-kumo-default hover:bg-kumo-tint"
        onclick={handleViewMarkdown}
      >
        <FileText size={16} /> View Page as Markdown
      </button>
      <div class="my-1 border-t border-kumo-hairline"></div>
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-kumo-default hover:bg-kumo-tint"
        onclick={() => window.open(getAIPromptUrl('https://claude.ai/new'), '_blank')}
      >
        <ExternalLink size={16} /> Open in Claude
      </button>
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-kumo-default hover:bg-kumo-tint"
        onclick={() => window.open(getAIPromptUrl('https://chatgpt.com'), '_blank')}
      >
        <ExternalLink size={16} /> Open in ChatGPT
      </button>
    </div>
  {/if}
</div>
