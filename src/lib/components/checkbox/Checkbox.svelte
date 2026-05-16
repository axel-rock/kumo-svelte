<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import { Check } from '@lucide/svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';
  interface Props { children?: Snippet; class?: string; checked?: boolean; disabled?: boolean; [key: string]: unknown; }
  let { children, class: className, checked = $bindable(false), disabled = false, ...rest }: Props = $props();
</script>

<label class="inline-flex items-center gap-2 text-sm text-kumo-default">
  <CheckboxPrimitive.Root bind:checked {disabled} class={cn('flex size-4 items-center justify-center rounded-sm bg-kumo-base ring ring-kumo-line transition data-[state=checked]:bg-kumo-brand data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-kumo-brand/40 disabled:cursor-not-allowed disabled:opacity-50', className)} {...rest}>
    {#if checked === true}
      <Check class="size-3" aria-hidden="true" />
    {/if}
  </CheckboxPrimitive.Root>
  {@render children?.()}
</label>
