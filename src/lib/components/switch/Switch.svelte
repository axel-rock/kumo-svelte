<script lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; checked?: boolean; disabled?: boolean; [key: string]: unknown; }
  let { class: className, checked = $bindable(false), disabled = false, ...rest }: Props = $props();
</script>

<SwitchPrimitive.Root bind:checked {disabled} class={cn('relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-kumo-fill transition data-[state=checked]:bg-kumo-brand focus-visible:ring-2 focus-visible:ring-kumo-brand/40 disabled:cursor-not-allowed disabled:opacity-50', className)} {...rest}>
  <SwitchPrimitive.Thumb class="block size-4 translate-x-0.5 rounded-full bg-white shadow-sm transition data-[state=checked]:translate-x-4" />
</SwitchPrimitive.Root>
