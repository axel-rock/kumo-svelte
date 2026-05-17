<script lang="ts">
  import type { Snippet } from 'svelte';
  import CollapsibleRoot from './CollapsibleRoot.svelte';
  import CollapsibleDefaultTrigger from './CollapsibleDefaultTrigger.svelte';
  import CollapsibleDefaultPanel from './CollapsibleDefaultPanel.svelte';

  interface Props {
    trigger?: Snippet;
    children?: Snippet;
    class?: string;
    open?: boolean;
    defaultOpen?: boolean;
    title?: string;
    disabled?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
  }

  let {
    trigger,
    children,
    class: className,
    defaultOpen = false,
    open = $bindable(defaultOpen),
    title,
    disabled = false,
    onOpenChange,
    onOpenChangeComplete
  }: Props = $props();
</script>

<CollapsibleRoot bind:open class={className} {disabled} {onOpenChange} {onOpenChangeComplete}>
  {#if trigger}
    <CollapsibleDefaultTrigger>{@render trigger()}</CollapsibleDefaultTrigger>
  {:else if title}
    <CollapsibleDefaultTrigger>{title}</CollapsibleDefaultTrigger>
  {/if}
  <CollapsibleDefaultPanel>
    {@render children?.()}
  </CollapsibleDefaultPanel>
</CollapsibleRoot>
