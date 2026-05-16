<script lang="ts" module>
  export const KUMO_CODEBLOCK_STYLING = {
    baseTokens: ['bg-kumo-base', 'border-kumo-fill'],
    container: {
      minWidth: 'min-w-0',
      borderRadius: 'rounded-md',
      border: 'border border-kumo-fill',
      background: 'bg-kumo-base'
    },
    innerPadding: '[&>pre]:p-2.5',
    dimensions: {
      borderRadius: 6,
      padding: 10
    }
  } as const;
</script>

<script lang="ts">
  import Code, { type CodeLang } from './Code.svelte';

  interface Props {
    /** The code string to display. */
    code: string;
    /**
     * Language hint for the code content.
     * @default "ts"
     */
    lang?: CodeLang;
  }

  let { code, lang = 'ts' }: Props = $props();
</script>

<div class="min-w-0 rounded-md border border-kumo-fill bg-kumo-base [&>pre]:p-2.5!">
  <Code {code} {lang} />
</div>
