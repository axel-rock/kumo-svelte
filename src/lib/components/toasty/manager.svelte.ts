import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';

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
  #timers = new Map<string, ReturnType<typeof setTimeout>>();

  add(options: KumoToastOptions = {}) {
    const id = options.id ?? crypto.randomUUID();

    if (options.id) {
      const existingToast = this.toasts.find((toast) => toast.id === options.id);
      if (existingToast && existingToast.transitionStatus !== 'ending') {
        this.update(id, { bump: false });
        requestAnimationFrame(() => {
          this.update(id, {
            bump: true,
            ...(options.timeout !== undefined && { timeout: options.timeout })
          });
        });
        return id;
      }

      if (existingToast?.transitionStatus === 'ending') {
        return id;
      }
    }

    const toast: KumoToastObject = {
      variant: 'default',
      timeout: 5000,
      ...options,
      id,
      transitionStatus: 'starting'
    };

    this.toasts = [toast, ...this.toasts].slice(0, 6);
    requestAnimationFrame(() => this.update(id, { transitionStatus: undefined }));
    this.#schedule(toast);
    return id;
  }

  update(id: string, options: Partial<KumoToastOptions & Pick<KumoToastObject, 'transitionStatus'>>) {
    this.toasts = this.toasts.map((toast) => (toast.id === id ? { ...toast, ...options } : toast));
    const toast = this.toasts.find((item) => item.id === id);
    if (toast && options.timeout !== undefined) {
      this.#schedule(toast);
    }
  }

  remove(id: string) {
    this.#clearTimer(id);
    this.update(id, { transitionStatus: 'ending' });
    setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    }, 180);
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
        this.#schedule(this.toasts.find((toast) => toast.id === id));
      },
      (error: Error) => {
        const failed = typeof options.error === 'function' ? options.error(error) : options.error;
        this.update(id, { timeout: 5000, variant: 'error', ...failed });
        this.#schedule(this.toasts.find((toast) => toast.id === id));
      }
    );

    return id;
  }

  #schedule(toast: KumoToastObject | undefined) {
    if (!toast) return;
    this.#clearTimer(toast.id);
    if (!toast.timeout) return;

    this.#timers.set(
      toast.id,
      setTimeout(() => this.remove(toast.id), toast.timeout)
    );
  }

  #clearTimer(id: string) {
    const timer = this.#timers.get(id);
    if (timer) clearTimeout(timer);
    this.#timers.delete(id);
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
