<script lang="ts">
  interface Props {
    code?: string;
    lang?: string;
  }

  let { code = '', lang = 'txt' }: Props = $props();
</script>

<pre class="not-prose my-4 overflow-x-auto rounded-lg border border-kumo-hairline bg-kumo-canvas p-4 text-sm"><code class={`language-${lang}`}>{code}</code></pre>
