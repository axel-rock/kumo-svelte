<script lang="ts" module>
  export const KUMO_CODE_HIGHLIGHTED_STYLING = {
    themes: {
      light: 'github-light',
      dark: 'vesper'
    },
    baseTokens: ['bg-kumo-code', 'border-kumo-hairline'],
    container: {
      borderRadius: 'rounded-lg',
      overflow: 'overflow-hidden'
    }
  } as const;

  export type CodeHighlightedLang =
    | 'bash'
    | 'css'
    | 'html'
    | 'javascript'
    | 'json'
    | 'jsonc'
    | 'svelte'
    | 'ts'
    | 'typescript'
    | 'tsx';
</script>

<script lang="ts">
  import { Check, Copy } from 'phosphor-svelte';
  import { codeToHtml } from 'shiki';
  import { cn } from '$lib/utils/cn';

  interface Props {
    code: string;
    lang?: CodeHighlightedLang;
    showCopyButton?: boolean;
    class?: string;
    style?: string;
    [key: string]: unknown;
  }

  let {
    code,
    class: className,
    lang = 'typescript',
    showCopyButton = false,
    style,
    ...rest
  }: Props = $props();

  const languageAliases: Record<string, string> = {
    js: 'javascript',
    sh: 'bash',
    shell: 'bash',
    ts: 'typescript',
    zsh: 'bash'
  };

  let copied = $state(false);
  const highlightedCode = $derived(
    codeToHtml(code, {
      lang: languageAliases[lang] ?? lang,
      themes: KUMO_CODE_HIGHLIGHTED_STYLING.themes,
      defaultColor: false
    }).then((html) => html.replace(/\s+tabindex="0"/g, ''))
  );

  async function copyCode() {
    await navigator.clipboard?.writeText(code);
    copied = true;
    setTimeout(() => (copied = false), 1200);
  }
</script>

<div class={cn('not-prose code-block relative', className)} {style} {...rest}>
  {#await highlightedCode}
    <pre class="shiki shiki-themes github-light vesper"><code>{code}</code></pre>
  {:then html}
    {@html html}
  {/await}
  {#if showCopyButton}
    <button
      type="button"
      class="code-block-copy-btn"
      class:copied
      data-copied={copied ? '' : undefined}
      aria-label="Copy code to clipboard"
      onclick={copyCode}
    >
      <span class="code-block-copy-btn__icons">
        <span class="code-block-copy-btn__icon code-block-copy-btn__icon--check" aria-hidden="true">
          <Check size={16} />
        </span>
        <span class="code-block-copy-btn__icon code-block-copy-btn__icon--copy" aria-hidden="true">
          <Copy size={16} />
        </span>
      </span>
    </button>
  {/if}
</div>
