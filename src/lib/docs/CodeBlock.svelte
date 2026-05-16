<script lang="ts">
  import { Check, Copy } from '@lucide/svelte';

  interface Props {
    code?: string;
    lang?: string;
  }

  let { code = '', lang = 'txt' }: Props = $props();
  let copied = $state(false);

  const escapedCode = $derived(
    code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(\b(?:import|from|export|function|return|const|let|var|if|else|for|of|type|interface|as)\b)|(\b[A-Z][A-Za-z0-9_]*\b)|(\b\d+(?:\.\d+)?\b)/g,
        (match) => {
          if (/^["'`]/.test(match)) return `<span style="--shiki-light:#0A3069;--shiki-dark:#A5D6FF">${match}</span>`;
          if (/^(import|from|export|function|return|const|let|var|if|else|for|of|type|interface|as)$/.test(match)) return `<span style="--shiki-light:#CF222E;--shiki-dark:#FF7B72">${match}</span>`;
          if (/^\d/.test(match)) return `<span style="--shiki-light:#0550AE;--shiki-dark:#79C0FF">${match}</span>`;
          return `<span style="--shiki-light:#953800;--shiki-dark:#FFA657">${match}</span>`;
        }
      )
  );

  async function copyCode() {
    await navigator.clipboard?.writeText(code);
    copied = true;
    setTimeout(() => (copied = false), 1200);
  }
</script>

<div class="not-prose code-block relative">
  <pre class="astro-code"><code class={`language-${lang}`}>{@html escapedCode}</code></pre>
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
</div>
