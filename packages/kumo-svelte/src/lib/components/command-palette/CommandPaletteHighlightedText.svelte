<script lang="ts">
  /** Upstream React uses key="text-end" for trailing segments; parity token only. */
  export const KUMO_COMMAND_PALETTE_TEXT_END = 'text-end';

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

  let {
    text,
    highlights = [],
    class: className,
    markClass = 'rounded-sm bg-kumo-warning/50 text-kumo-default'
  }: Props = $props();

  const segments = $derived.by<Segment[]>(() => {
    if (highlights.length === 0) return [{ text, highlighted: false }];

    const sorted: Highlight[] = highlights
      .map(([start, end]) => ({ start: Math.max(0, start), end: Math.min(text.length - 1, end) }))
      .filter(({ start, end }) => end >= start)
      .sort((a, b) => a.start - b.start);

    const merged: Highlight[] = [];
    for (const highlight of sorted) {
      const previous = merged[merged.length - 1];
      if (previous && highlight.start <= previous.end + 1) {
        previous.end = Math.max(previous.end, highlight.end);
      } else {
        merged.push({ ...highlight });
      }
    }

    const nextSegments: Segment[] = [];
    let cursor = 0;

    for (const highlight of merged) {
      if (highlight.start > cursor) {
        nextSegments.push({ text: text.slice(cursor, highlight.start), highlighted: false });
      }
      nextSegments.push({ text: text.slice(highlight.start, highlight.end + 1), highlighted: true });
      cursor = highlight.end + 1;
    }

    if (cursor < text.length) {
      nextSegments.push({ text: text.slice(cursor), highlighted: false });
    }

    return nextSegments;
  });
</script>

<span class={className}>
  {#each segments as segment, index (`${index}-${segment.text}-${segment.highlighted}`)}
    {#if segment.highlighted}<mark class={markClass}>{segment.text}</mark>{:else}{segment.text}{/if}
  {/each}
</span>
