<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { trigger?: Snippet; children?: Snippet; title?: string; description?: string; class?: string; open?: boolean; [key: string]: unknown; }
  let { trigger, children, title, description, class: className, open = $bindable(false), ...rest }: Props = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
  {#if trigger}
    <DialogPrimitive.Trigger>
      {@render trigger()}
    </DialogPrimitive.Trigger>
  {/if}
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out" />
    <DialogPrimitive.Content class={cn('fixed left-1/2 top-1/2 z-50 w-[min(calc(100vw-2rem),32rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-kumo-base p-6 text-kumo-default shadow-xl ring ring-kumo-hairline outline-none', className)}>
      {#if title}<DialogPrimitive.Title class="text-lg font-semibold">{title}</DialogPrimitive.Title>{/if}
      {#if description}<DialogPrimitive.Description class="mt-1 text-sm text-kumo-muted">{description}</DialogPrimitive.Description>{/if}
      <div class="mt-4">{@render children?.()}</div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
</DialogPrimitive.Root>
