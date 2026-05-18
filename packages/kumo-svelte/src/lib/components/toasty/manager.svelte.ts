import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils/cn';

const TOAST_CONTEXT = 'kumo-toast-manager';

export type KumoToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface KumoToastAction {
  children: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline';
  onClick?: () => void;
}

export interface KumoToastOptions<Data extends object = Record<string, unknown>> {
  id?: string;
  title?: string;
  description?: string;
  variant?: KumoToastVariant;
  content?: Snippet;
  actions?: KumoToastAction[];
  timeout?: number;
  bump?: boolean;
  data?: Data;
}

export interface KumoToastObject<Data extends object = Record<string, unknown>>
  extends KumoToastOptions<Data> {
  id: string;
  transitionStatus?: 'starting' | 'ending';
}

export class KumoToastManager {
  toasts = $state<KumoToastObject[]>([]);
  #timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  add(options: KumoToastOptions = {}) {
    const id = options.id ?? this.#createId();

    if (options.id) {
      const existingToast = this.toasts.find((toast) => toast.id === options.id);
      if (existingToast) {
        this.update(id, { ...options, bump: true });
        return id;
      }
    }

    const toast: KumoToastObject = {
      variant: 'default',
      timeout: 5000,
      ...options,
      id
    };

    this.toasts = [toast, ...this.toasts].slice(0, 6);
    this.#scheduleRemoval(toast);
    return id;
  }

  update(id: string, options: Partial<KumoToastOptions & Pick<KumoToastObject, 'transitionStatus'>>) {
    this.toasts = this.toasts.map((toast) => (toast.id === id ? { ...toast, ...options } : toast));
    const toast = this.toasts.find((item) => item.id === id);
    if (toast) this.#scheduleRemoval(toast);
  }

  remove(id: string) {
    this.#clearRemoval(id);
    this.#deleteLocal(id);
  }

  promise<T>(
    promise: Promise<T>,
    options: {
      loading: KumoToastOptions;
      success: KumoToastOptions | ((data: T) => KumoToastOptions);
      error: KumoToastOptions | ((error: Error) => KumoToastOptions);
    }
  ) {
    const id = this.add({ timeout: 0, ...options.loading });

    promise.then(
      (data) => {
        const success = typeof options.success === 'function' ? options.success(data) : options.success;
        this.update(id, { timeout: 5000, variant: 'success', ...success });
      },
      (error: Error) => {
        const failed = typeof options.error === 'function' ? options.error(error) : options.error;
        this.update(id, { timeout: 5000, variant: 'error', ...failed });
      }
    );

    return id;
  }

  #scheduleRemoval(toast: KumoToastObject) {
    this.#clearRemoval(toast.id);
    if (toast.timeout === 0) return;

    this.#timeouts.set(
      toast.id,
      setTimeout(() => this.remove(toast.id), toast.timeout ?? 5000)
    );
  }

  #clearRemoval(id: string) {
    const timeout = this.#timeouts.get(id);
    if (timeout) clearTimeout(timeout);
    this.#timeouts.delete(id);
  }

  #deleteLocal(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  #createId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

const TOAST_VARIANT_CLASSES: Record<KumoToastVariant, string> = {
  default: 'border-kumo-hairline bg-kumo-base',
  success:
    'border-kumo-success bg-kumo-base [&_[data-toast-icon]]:text-kumo-success [&_[data-toast-title]]:text-kumo-success',
  error:
    'border-kumo-danger bg-kumo-base [&_[data-toast-icon]]:text-kumo-danger [&_[data-toast-title]]:text-kumo-danger',
  warning:
    'border-kumo-warning bg-kumo-base [&_[data-toast-icon]]:text-kumo-warning [&_[data-toast-title]]:text-kumo-warning',
  info:
    'border-kumo-info bg-kumo-control [&_[data-toast-icon]]:text-kumo-info [&_[data-toast-title]]:text-kumo-info'
};

export function toastRootClass(variant: KumoToastVariant = 'default') {
  return cn(
    'relative !w-[calc(100vw-2rem)] overflow-hidden rounded-xl border bg-clip-padding p-4 text-kumo-default shadow-[0_2px_8px_rgb(0_0_0_/_0.12)] sm:!w-[340px]',
    TOAST_VARIANT_CLASSES[variant]
  );
}

export function createKumoToastManager() {
  return new KumoToastManager();
}

export function setKumoToastManager(manager: () => KumoToastManager) {
  setContext(TOAST_CONTEXT, manager);
}

export function useKumoToastManager() {
  const manager = getContext<(() => KumoToastManager) | undefined>(TOAST_CONTEXT);
  if (!manager) {
    throw new Error('useKumoToastManager must be called inside a Toasty component.');
  }
  return manager();
}
