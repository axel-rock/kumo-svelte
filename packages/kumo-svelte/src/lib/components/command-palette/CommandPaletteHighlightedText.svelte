<script lang="ts">
  interface Highlight {
    start: number;
    end: number;
  }

  type HighlightTuple = [number, number];

  interface Segment {
    text: string;
    highlighted: boolean;
  }

  interface Props {
    text: string;
    highlights?: HighlightTuple[];
    class?: string;
    markClass?: string;
  }

  let { text, highlights = [], markClass = 'rounded bg-kumo-tint text-kumo-default' }: Props = $props();

  const segments = $derived.by<Segment[]>(() => {
    if (highlights.length === 0) return [{ text, highlighted: false }];

    const sorted: Highlight[] = highlights
      .map(([start, end]) => ({ start: Math.max(0, start), end: Math.min(text.length, end) }))
      .filter(({ start, end }) => end > start)
      .sort((a, b) => a.start - b.start);

    const nextSegments: Segment[] = [];
    let cursor = 0;

    for (const highlight of sorted) {
      if (highlight.start > cursor) {
        nextSegments.push({ text: text.slice(cursor, highlight.start), highlighted: false });
      }
      nextSegments.push({ text: text.slice(highlight.start, highlight.end), highlighted: true });
      cursor = highlight.end;
    }

    if (cursor < text.length) {
      nextSegments.push({ text: text.slice(cursor), highlighted: false });
    }

    return nextSegments;
  });
</script>

{#each segments as segment}
  {#if segment.highlighted}<mark class={markClass}>{segment.text}</mark>{:else}{segment.text}{/if}
{/each}
