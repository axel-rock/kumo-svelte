import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';
import { toast as sonnerToast } from 'svelte-sonner';
import KumoToastContent from './KumoToastContent.svelte';

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
    this.#render(toast);
    return id;
  }

  update(id: string, options: Partial<KumoToastOptions & Pick<KumoToastObject, 'transitionStatus'>>) {
    this.toasts = this.toasts.map((toast) => (toast.id === id ? { ...toast, ...options } : toast));
    const toast = this.toasts.find((item) => item.id === id);
    if (toast) this.#render(toast);
  }

  remove(id: string) {
    sonnerToast.dismiss(id);
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

  #render(toast: KumoToastObject) {
    sonnerToast.custom(KumoToastContent, {
      id: toast.id,
      class: 'w-[var(--width)]',
      duration: toast.timeout === 0 ? Number.POSITIVE_INFINITY : (toast.timeout ?? 5000),
      componentProps: {
        toast,
        onClose: () => this.remove(toast.id)
      },
      onAutoClose: () => this.#deleteLocal(toast.id),
      onDismiss: () => this.#deleteLocal(toast.id)
    });
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
