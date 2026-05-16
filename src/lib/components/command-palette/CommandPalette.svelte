<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Command { label: string; value?: string; action?: () => void; }
  interface Props { class?: string; commands?: Command[]; placeholder?: string; [key: string]: unknown; }
  let { class: className, commands = [], placeholder = 'Type a command…', ...rest }: Props = $props();
  let query = $state('');
  let filtered = $derived(commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())));
</script>

<div class={cn('overflow-hidden rounded-xl bg-kumo-base shadow-lg ring ring-kumo-hairline', className)} {...rest}>
  <input class="h-11 w-full border-b border-kumo-line bg-transparent px-3 text-base text-kumo-default outline-none placeholder:text-kumo-muted" bind:value={query} {placeholder} />
  <div class="max-h-72 overflow-auto p-1">
    {#each filtered as command}
      <button class="block w-full rounded-md px-2 py-1.5 text-left text-sm text-kumo-default hover:bg-kumo-tint" onclick={command.action}>{command.label}</button>
    {/each}
  </div>
</div>
