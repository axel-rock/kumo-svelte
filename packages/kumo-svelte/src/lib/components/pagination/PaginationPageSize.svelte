<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getPaginationContext } from './context';

  const DEFAULT_PAGE_SIZE_OPTIONS = [25, 50, 100, 250] as const;

  interface Props {
    value: number;
    onChange: (size: number) => void;
    options?: number[];
    label?: string | Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    value = $bindable(),
    onChange,
    options = [...DEFAULT_PAGE_SIZE_OPTIONS],
    label = 'Per page:',
    class: className,
    ...rest
  }: Props = $props();

  const context = getPaginationContext();
  const selectOptions = $derived(options.map((size) => ({ label: String(size), value: String(size) })));

  function handleChange(nextValue: string) {
    const nextSize = Number(nextValue);
    value = nextSize;
    onChange(nextSize);
  }
</script>

<div data-slot="pagination-page-size" class={cn('flex items-center gap-2', className)} {...rest}>
  {#if label}
    <span class="text-sm text-kumo-subtle">
      {#if typeof label === 'function'}
        {@render label()}
      {:else}
        {label}
      {/if}
    </span>
  {/if}
  <select
    aria-label={context.labels.pageSize}
    class="h-9 rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line focus:ring-2 focus:ring-kumo-focus/50"
    {value}
    onchange={(event) => handleChange(event.currentTarget.value)}
  >
    {#each selectOptions as option (option.value)}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>
