<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Option { label: string; value: string; }
  interface Props { class?: string; options?: Option[]; value?: string; placeholder?: string; [key: string]: unknown; }
  let { class: className, options = [], value = $bindable(''), placeholder = 'Search…', ...rest }: Props = $props();
  let query = $state('');
  let filtered = $derived(options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())));
</script>

<div class={cn('relative w-full', className)} {...rest}>
  <input class="h-9 w-full rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line focus:ring-2 focus:ring-kumo-brand/40" bind:value={query} {placeholder} />
  {#if query}
    <div class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-kumo-base p-1 shadow-lg ring ring-kumo-hairline">
      {#each filtered as option}
        <button class="block w-full rounded-md px-2 py-1.5 text-left text-sm text-kumo-default hover:bg-kumo-tint" onclick={() => { value = option.value; query = option.label; }}>{option.label}</button>
      {/each}
    </div>
  {/if}
</div>
