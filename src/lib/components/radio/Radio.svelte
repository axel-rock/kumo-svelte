<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Option { label: string; value: string; disabled?: boolean; }
  interface Props { class?: string; options?: Option[]; value?: string; name?: string; [key: string]: unknown; }
  let { class: className, options = [], value = $bindable(''), name = crypto.randomUUID(), ...rest }: Props = $props();
</script>

<div class={cn('grid gap-2', className)} role="radiogroup" {...rest}>
  {#each options as option}
    <label class="inline-flex items-center gap-2 text-sm text-kumo-default has-[:disabled]:opacity-50">
      <input class="size-4 accent-kumo-brand" type="radio" bind:group={value} {name} value={option.value} disabled={option.disabled} />
      {option.label}
    </label>
  {/each}
</div>
