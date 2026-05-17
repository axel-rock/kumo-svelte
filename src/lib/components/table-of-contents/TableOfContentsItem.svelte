<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const ITEM_BASE = 'block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-left text-sm no-underline';

  interface Props {
    children?: Snippet;
    active?: boolean;
    href?: string;
    class?: string;
    [key: string]: unknown;
  }

  let { children, active = false, href = '#', class: className, ...rest }: Props = $props();
</script>

<li class="-ml-0.5">
  <a
    {href}
    aria-current={active ? 'true' : undefined}
    class={cn(
      ITEM_BASE,
      active
        ? 'border-kumo-brand font-medium text-kumo-default'
        : 'text-kumo-subtle hover:border-kumo-line hover:font-medium hover:text-kumo-default',
      className
    )}
    {...rest}
  >
    <span class="block min-w-0 leading-5">{@render children?.()}</span>
  </a>
</li>
