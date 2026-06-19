<script lang="ts" module>
  import { cn } from '$lib/utils/cn';

  export const KUMO_CLIPBOARD_TEXT_VARIANTS = {
    size: {
      sm: {
        classes: 'text-xs',
        buttonSize: 'sm' as const,
        description: 'Small clipboard text for compact UIs'
      },
      base: {
        classes: 'text-sm',
        buttonSize: 'base' as const,
        description: 'Default clipboard text size'
      },
      lg: {
        classes: 'text-sm',
        buttonSize: 'lg' as const,
        description: 'Large clipboard text for prominent display'
      }
    }
  } as const;

  export const KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS = {
    size: 'lg'
  } as const;

  export type KumoClipboardTextSize = keyof typeof KUMO_CLIPBOARD_TEXT_VARIANTS.size;

  const INPUT_SIZE_CLASSES = {
    sm: 'h-6.5 gap-1 rounded-md px-2 text-xs',
    base: 'h-9 gap-1.5 rounded-lg px-3 text-base',
    lg: 'h-10 gap-2 rounded-lg px-4 text-base'
  } as const;

  export function inputVariants({
    size = 'base'
  }: {
    size?: keyof typeof INPUT_SIZE_CLASSES;
  } = {}) {
    return cn(
      'border-0 bg-kumo-control text-kumo-default ring ring-kumo-line outline-none focus:outline-none',
      'kumo-input-placeholder disabled:text-kumo-disabled',
      INPUT_SIZE_CLASSES[size]
    );
  }

  export function clipboardTextVariants({
    size = KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size
  }: { size?: KumoClipboardTextSize } = {}) {
    return cn(
      'flex items-center overflow-hidden bg-kumo-base px-0 font-mono',
      KUMO_CLIPBOARD_TEXT_VARIANTS.size[size]?.classes ??
        KUMO_CLIPBOARD_TEXT_VARIANTS.size[KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size].classes
    );
  }

  const clipboardTextAnimations = {
    slide: {
      initial:
        'pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 translate-y-full',
      animate: 'translate-y-0 opacity-100',
      end: 'pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 -translate-y-full'
    }
  } as const;

  const TOAST_VIEWPORT_CLASSES = 'pointer-events-none fixed inset-0 isolate';
  const TOAST_POPUP_CLASSES =
    'flex origin-[var(--transform-origin)] flex-col rounded-md bg-kumo-base px-3 py-1.5 text-xs text-kumo-default font-sans shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill';
  const TRIGGER_PRESS_REASON = 'trigger-press';
</script>

<script lang="ts">
  import { Check, Copy } from 'phosphor-svelte';
  import { Button } from '$lib/components/button';
  import { Tooltip } from '$lib/components/tooltip';

  type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

  interface Props {
    class?: string;
    text?: string;
    value?: string;
    textToCopy?: string;
    size?: KumoClipboardTextSize;
    onCopy?: () => void;
    tooltip?: {
      text?: string;
      copiedText?: string;
      side?: TooltipSide;
    };
    labels?: {
      copyAction?: string;
    };
    [key: string]: unknown;
  }

  let {
    class: className,
    text,
    value,
    textToCopy,
    size = KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size,
    onCopy,
    tooltip,
    labels = {},
    ...rest
  }: Props = $props();

  let copied = $state(false);
  let showAnchoredToast = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  const sizeConfig = $derived(
    KUMO_CLIPBOARD_TEXT_VARIANTS.size[size] ?? KUMO_CLIPBOARD_TEXT_VARIANTS.size.lg
  );
  const tooltipText = $derived(tooltip?.text ?? 'Copy');
  const copiedText = $derived(tooltip?.copiedText ?? 'Copied');
  const tooltipSide = $derived(tooltip?.side ?? 'top');
  const copyAction = $derived(labels.copyAction ?? 'Copy to clipboard');
  const displayText = $derived(text ?? value ?? '');

  function handleTooltipOpenChange(open: boolean, reason?: string) {
    if (reason === TRIGGER_PRESS_REASON) {
      return false;
    }
    return open;
  }

  async function writeClipboard(value: string) {
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      await navigator.clipboard.writeText(value);
      return;
    }

    if (typeof document === 'undefined') return;

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const previousRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
    textarea.select();

    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(textarea);
      if (previousRange) {
        selection?.removeAllRanges();
        selection?.addRange(previousRange);
      }
    }
  }

  async function copyToClipboard() {
    try {
      await writeClipboard(textToCopy ?? displayText);
      copied = true;
      onCopy?.();

      if (tooltip) {
        showAnchoredToast = true;
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          showAnchoredToast = false;
          copied = false;
        }, 1500);
      } else {
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          copied = false;
        }, 1500);
      }
    } catch (error) {
      console.warn('Clipboard copy failed', error);
    }
  }
</script>

{#snippet copyButton()}
  <Button
    size={sizeConfig.buttonSize}
    variant="ghost"
    class={cn(
      'rounded-l-none rounded-r-[inherit] border-l! border-kumo-line! px-3 relative isolate overflow-hidden transition-all duration-200',
      'focus:ring-inset focus:ring-kumo-focus/50',
      'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand'
    )}
    aria-label={copyAction}
    onclick={copyToClipboard}
  >
    <span
      class={cn(
        'flex items-center gap-1 transition-all duration-200',
        copied
          ? clipboardTextAnimations.slide.animate
          : clipboardTextAnimations.slide.initial
      )}
    >
      <Check />
    </span>
    <span
      class={cn(
        'flex items-center justify-center transition-all duration-200',
        copied ? clipboardTextAnimations.slide.end : clipboardTextAnimations.slide.animate
      )}
    >
      <Copy />
    </span>
  </Button>
{/snippet}

<div
  class={cn(inputVariants({ size: sizeConfig.buttonSize }), clipboardTextVariants({ size }), className)}
  data-kumo-component="ClipboardText"
  {...rest}
>
  <span class="grow truncate ps-4 pe-2">{displayText}</span>
  {#if tooltip}
    <div class={TOAST_VIEWPORT_CLASSES} aria-hidden="true">
      {#if showAnchoredToast}
        <div class={cn(TOAST_POPUP_CLASSES, 'absolute')}>{copiedText}</div>
      {/if}
    </div>
    <Tooltip
      side={tooltipSide}
      sideOffset={8}
      content={tooltipText}
      disabled={copied}
      onOpenChange={(open) => {
        handleTooltipOpenChange(open, open ? undefined : TRIGGER_PRESS_REASON);
      }}
      trigger={copyButton}
    />
  {:else}
    {@render copyButton()}
  {/if}
  <span class="sr-only" aria-live="polite">{copied ? copiedText : ''}</span>
</div>
