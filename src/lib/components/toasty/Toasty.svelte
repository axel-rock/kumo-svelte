<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Toaster } from 'svelte-sonner';
  import type { ToasterProps } from 'svelte-sonner';
  import { cn } from '$lib/utils/cn';
  import {
    createKumoToastManager,
    setKumoToastManager,
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
    position?: ToasterProps['position'];
    duration?: ToasterProps['duration'];
    visibleToasts?: ToasterProps['visibleToasts'];
    expand?: ToasterProps['expand'];
    hotkey?: ToasterProps['hotkey'];
    gap?: ToasterProps['gap'];
    offset?: ToasterProps['offset'];
    mobileOffset?: ToasterProps['mobileOffset'];
    pauseWhenPageIsHidden?: ToasterProps['pauseWhenPageIsHidden'];
    [key: string]: unknown;
  }

  const fallbackToastManager = createKumoToastManager();
  const { children, class: className, toastManager = fallbackToastManager, ...rest }: Props = $props();

  setKumoToastManager(() => toastManager);
</script>

{@render children?.(toastManager)}

<Toaster
  class={cn('kumo-toasty', className)}
  position="bottom-right"
  duration={5000}
  visibleToasts={3}
  expand={false}
  offset="32px"
  mobileOffset="16px"
  closeButton={false}
  {...rest}
/>

<style>
  :global(.kumo-toasty [data-sonner-toast]) {
    width: var(--width);
  }
</style>
