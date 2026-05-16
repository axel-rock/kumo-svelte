<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    id?: string;
    disabled?: boolean;
    bare?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, id, disabled = false, bare = false, ...rest }: Props = $props();
</script>

<li
  class={cn(
    'relative',
    !bare && 'py-2 px-3 rounded-md shadow bg-kumo-base ring ring-kumo-line',
    'before:absolute before:top-1/2 before:right-full before:h-0.5 before:w-8 before:-translate-y-1/2 before:bg-kumo-inactive first:before:hidden',
    'after:absolute after:top-1/2 after:left-full after:h-0.5 after:w-8 after:-translate-y-1/2 after:bg-kumo-inactive last:after:hidden',
    disabled && 'opacity-50 before:opacity-40 after:opacity-40',
    className
  )}
  style="cursor: default"
  data-node-id={id}
  data-disabled={disabled ? '' : undefined}
  {...rest}
>
  {@render children?.()}
</li>
