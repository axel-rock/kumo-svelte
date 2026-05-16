<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export const KUMO_BADGE_BASE_STYLES = 'inline-flex w-fit flex-none shrink-0 items-center justify-self-start rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap';
  export const KUMO_BADGE_VARIANTS = {
    primary: 'bg-kumo-badge-inverted text-kumo-base',
    secondary: 'bg-kumo-fill text-kumo-badge-neutral-subtle',
    error: 'bg-kumo-danger-tint/60 text-kumo-danger',
    warning: 'bg-kumo-warning-tint/70 text-kumo-warning',
    success: 'bg-kumo-success-tint/70 text-kumo-success',
    destructive: 'bg-kumo-danger text-white',
    info: 'bg-kumo-info-tint/70 text-kumo-info',
    beta: 'border border-dashed border-kumo-brand bg-transparent text-kumo-link',
    outline: 'border border-kumo-fill bg-transparent text-kumo-default',
    red: 'bg-kumo-badge-red text-white',
    green: 'bg-kumo-badge-green text-white',
    neutral: 'bg-kumo-badge-neutral text-white',
    orange: 'bg-kumo-badge-orange text-black',
    purple: 'bg-kumo-badge-purple text-white',
    teal: 'bg-kumo-badge-teal text-white',
    'teal-subtle': 'bg-kumo-badge-teal-subtle text-kumo-badge-teal-subtle',
    blue: 'bg-kumo-badge-blue text-white'
  } as const;

  interface Props {
    children?: Snippet;
    class?: string;
    variant?: keyof typeof KUMO_BADGE_VARIANTS;
    [key: string]: unknown;
  }
  let { children, class: className, variant = 'secondary', ...rest }: Props = $props();
</script>

<span class={cn(KUMO_BADGE_BASE_STYLES, KUMO_BADGE_VARIANTS[variant], className)} {...rest}>
  {@render children?.()}
</span>
