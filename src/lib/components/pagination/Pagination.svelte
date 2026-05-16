<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; page?: number; pages?: number; [key: string]: unknown; }
  let { class: className, page = $bindable(1), pages = 1, ...rest }: Props = $props();
</script>

<nav class={cn('flex items-center gap-1', className)} aria-label="Pagination" {...rest}>
  <button class="h-8 rounded-md px-2 text-sm ring ring-kumo-line disabled:opacity-50" disabled={page <= 1} onclick={() => page -= 1}>Previous</button>
  {#each Array(pages) as _, i}
    <button class={cn('size-8 rounded-md text-sm ring ring-kumo-line', page === i + 1 && 'bg-kumo-brand text-white')} aria-current={page === i + 1 ? 'page' : undefined} onclick={() => page = i + 1}>{i + 1}</button>
  {/each}
  <button class="h-8 rounded-md px-2 text-sm ring ring-kumo-line disabled:opacity-50" disabled={page >= pages} onclick={() => page += 1}>Next</button>
</nav>
