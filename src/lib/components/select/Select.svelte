<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Option { label: string; value: string; disabled?: boolean; }
  interface Props { class?: string; options?: Option[]; value?: string; placeholder?: string; [key: string]: unknown; }
  let { class: className, options = [], value = $bindable(''), placeholder = 'Select…', ...rest }: Props = $props();
</script>

<select bind:value class={cn('h-9 w-full rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line focus:ring-2 focus:ring-kumo-brand/40 disabled:opacity-50', className)} {...rest}>
  <option value="" disabled>{placeholder}</option>
  {#each options as option}<option value={option.value} disabled={option.disabled}>{option.label}</option>{/each}
</select>
