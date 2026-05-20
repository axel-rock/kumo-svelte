<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    trigger?: Snippet<[Record<string, unknown>]>;
    class?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onBackdropClick?: (event: MouseEvent) => void;
    container?: HTMLElement | string;
    [key: string]: unknown;
  }

  let {
    children,
    trigger,
    class: className,
    open = $bindable(false),
    onOpenChange,
    onBackdropClick,
    container,
    ...rest
  }: Props = $props();

  function handleBackdropClick(event: MouseEvent) {
    if (onBackdropClick) {
      onBackdropClick(event);
    } else {
      open = false;
      onOpenChange?.(false);
    }
  }
</script>

<DialogPrimitive.Root bind:open {onOpenChange}>
  {#if trigger}
    <DialogPrimitive.Trigger>
      {#snippet child({ props })}
        {@render trigger(props)}
      {/snippet}
    </DialogPrimitive.Trigger>
  {/if}
  <DialogPrimitive.Portal to={container}>
    <DialogPrimitive.Overlay
      class="fixed inset-0 bg-kumo-recessed opacity-80 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0"
      onclick={handleBackdropClick}
    />
    <DialogPrimitive.Content
      class={cn(
        'fixed top-1/2 left-1/2 w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-kumo-base text-kumo-default shadow-lg ring ring-kumo-hairline outline-none sm:max-w-xl',
        className
      )}
      {...rest}
    >
      {@render children?.()}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
</DialogPrimitive.Root>
