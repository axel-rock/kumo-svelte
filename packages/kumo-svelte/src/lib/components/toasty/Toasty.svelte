<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import KumoToastContent from './KumoToastContent.svelte';
  import {
    createKumoToastManager,
    setKumoToastManager,
    toastRootClass,
    type KumoToastManager,
    type KumoToastVariant
  } from './manager.svelte';

  export const KUMO_TOAST_VARIANTS = {
    variant: {
      default: {
        classes: 'border-kumo-fill bg-kumo-base',
        description: 'Default toast style'
      },
      success: {
        classes:
          'ring-[0.3px] ring-kumo-success bg-kumo-base [&_[data-toast-icon]]:text-kumo-success [&_[data-toast-title]]:text-kumo-success',
        description: 'Success toast for confirmations and positive outcomes'
      },
      error: {
        classes:
          'ring-[0.3px] ring-kumo-danger bg-kumo-base [&_[data-toast-icon]]:text-kumo-danger [&_[data-toast-title]]:text-kumo-danger',
        description: 'Error toast for critical issues'
      },
      warning: {
        classes:
          'ring-[0.3px] ring-kumo-warning bg-kumo-base [&_[data-toast-icon]]:text-kumo-warning [&_[data-toast-title]]:text-kumo-warning',
        description: 'Warning toast for cautionary messages'
      },
      info: {
        classes:
          'ring-[0.3px] ring-kumo-info bg-kumo-control [&_[data-toast-icon]]:text-kumo-info [&_[data-toast-title]]:text-kumo-info',
        description: 'Info toast for neutral informational messages'
      }
    }
  } as const;

  export const KUMO_TOAST_DEFAULT_VARIANTS = {
    variant: 'default'
  } as const;

  export function toastVariants({
    variant = KUMO_TOAST_DEFAULT_VARIANTS.variant
  }: {
    variant?: KumoToastVariant;
  } = {}) {
    return cn(
      'rounded-xl ring ring-kumo-line bg-clip-padding p-4 shadow-lg',
      KUMO_TOAST_VARIANTS.variant[variant].classes
    );
  }

  interface Props {
    children?: Snippet<[KumoToastManager]>;
    class?: string;
    toastManager?: KumoToastManager;
    visibleToasts?: number;
    [key: string]: unknown;
  }

  const fallbackToastManager = createKumoToastManager();
  const {
    children,
    class: className,
    toastManager = fallbackToastManager,
    visibleToasts = 3
  }: Props = $props();

  const visibleToastItems = $derived(toastManager.toasts.slice(0, visibleToasts));

  setKumoToastManager(() => toastManager);
</script>

{@render children?.(toastManager)}

{#if visibleToastItems.length}
  <div
    class={cn(
      'fixed right-4 bottom-4 z-[1000] flex w-[calc(100%-2rem)] flex-col-reverse items-end gap-3 sm:right-8 sm:bottom-8 sm:w-[340px]',
      className
    )}
    aria-label="Notifications"
    aria-live="polite"
    aria-relevant="additions text"
    aria-atomic="false"
  >
    {#each visibleToastItems as toast (toast.id)}
      <div class={toastRootClass(toast.variant)}>
        <KumoToastContent {toast} onClose={() => toastManager.remove(toast.id)} />
      </div>
    {/each}
  </div>
{/if}
