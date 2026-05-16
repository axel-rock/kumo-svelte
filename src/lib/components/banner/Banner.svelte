<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  type Variant = 'default' | 'alert' | 'error';

  const variants: Record<Variant, string> = {
    default: 'bg-kumo-info-tint/30 border-kumo-info/50 text-kumo-info',
    alert: 'bg-kumo-warning-tint/15 border-kumo-warning/50 text-kumo-warning',
    error: 'bg-kumo-danger-tint/15 border-kumo-danger/50 text-kumo-danger'
  };

  interface Props {
    children?: Snippet;
    action?: Snippet;
    class?: string;
    variant?: Variant;
    title?: string;
    description?: string;
    text?: string;
    [key: string]: unknown;
  }

  let {
    children,
    action,
    class: className,
    variant = 'default',
    title,
    description,
    text,
    ...rest
  }: Props = $props();
</script>

<div class={cn('flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-base', variants[variant], className)} role={variant === 'error' ? 'alert' : 'status'} {...rest}>
  {#if title || description}
    <div class="flex min-w-0 flex-1 items-center justify-between gap-3">
      <div class="flex flex-col gap-0.5">
        {#if title}<p class="font-medium leading-snug">{title}</p>{/if}
        {#if description}<div class="text-sm leading-snug"><p>{description}</p></div>{/if}
      </div>
      {#if action}<div class="flex shrink-0 items-center gap-2">{@render action()}</div>{/if}
    </div>
  {:else}
    <p>{text}</p>
    {@render children?.()}
  {/if}
</div>
