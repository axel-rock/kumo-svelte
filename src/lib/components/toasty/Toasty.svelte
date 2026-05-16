<script lang="ts">
  import type { Snippet } from 'svelte';
  import { CheckCircle, Info, TriangleAlert, X, OctagonAlert } from '@lucide/svelte';
  import { Button } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';
  import {
    createKumoToastManager,
    setKumoToastManager,
    type KumoToastManager,
    type KumoToastObject,
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
    [key: string]: unknown;
  }

  const fallbackToastManager = createKumoToastManager();
  const { children, class: className, toastManager = fallbackToastManager, ...rest }: Props = $props();

  setKumoToastManager(() => toastManager);

  const backgroundClasses: Partial<Record<KumoToastVariant, string>> = {
    success: 'bg-kumo-success/5',
    error: 'bg-kumo-danger/5',
    warning: 'bg-kumo-warning/5',
    info: 'bg-kumo-info/5'
  };

  function iconForVariant(variant: KumoToastVariant = 'default') {
    if (variant === 'success') return CheckCircle;
    if (variant === 'error') return OctagonAlert;
    if (variant === 'warning') return TriangleAlert;
    if (variant === 'info') return Info;
    return undefined;
  }

  function toastStyle(toast: KumoToastObject, index: number) {
    const scale = Math.max(0, 1 - index * 0.1);
    const y = index * -12 - (1 - scale) * 80;
    return `z-index: ${1000 - index}; transform: translateY(${y}px) scale(${scale}); opacity: ${index > 2 ? 0 : 1};`;
  }
</script>

{@render children?.(toastManager)}

<div
  class={cn(
    'fixed top-auto right-4 bottom-4 z-1 mx-auto flex w-[calc(100%-2rem)] sm:right-8 sm:bottom-8 sm:w-[340px]',
    className
  )}
  {...rest}
>
  {#each toastManager.toasts as toast, index (toast.id)}
    {@const Icon = iconForVariant(toast.variant)}
    <div
      class={cn(
        'absolute right-0 bottom-0 left-auto mr-0 h-auto w-full origin-bottom select-none transition-[transform,opacity] duration-500 ease-out',
        toastVariants({ variant: toast.variant }),
        toast.transitionStatus === 'starting' && 'translate-y-[150%]',
        toast.transitionStatus === 'ending' && 'translate-y-[150%] opacity-0'
      )}
      style={toastStyle(toast, index)}
      role="status"
      aria-live="polite"
    >
      <div class={cn('absolute inset-0 rounded-[11px] bg-kumo-base/90', toast.variant && backgroundClasses[toast.variant])}></div>
      <div class="isolate flex flex-col gap-1 transition-opacity">
        {#if toast.content}
          {@render toast.content()}
        {:else}
          <div class="flex items-start gap-2">
            {#if Icon}
              <Icon data-toast-icon class="mt-0.5 h-4 w-4 shrink-0" />
            {/if}
            <div class="flex flex-col gap-1 overflow-hidden">
              {#if toast.title}
                <div data-toast-title class="text-[0.975rem] leading-5 font-medium text-kumo-default">
                  {toast.title}
                </div>
              {/if}
              {#if toast.description}
                <div class="text-[0.925rem] leading-5 text-kumo-subtle">{toast.description}</div>
              {/if}
              {#if toast.actions}
                <div class="mt-2 flex min-w-0 flex-nowrap gap-2 overflow-x-auto p-px">
                  {#each toast.actions as action, actionIndex (actionIndex)}
                    <Button size="sm" variant={action.variant ?? 'secondary'} onclick={action.onClick}>{action.children}</Button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/if}
        <button
          class="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded border-none bg-transparent text-current/50 hover:bg-kumo-contrast/10 hover:text-current"
          aria-label="Close"
          type="button"
          onclick={() => toastManager.remove(toast.id)}
        >
          <X class="h-3 w-3" />
        </button>
      </div>
    </div>
  {/each}
</div>
