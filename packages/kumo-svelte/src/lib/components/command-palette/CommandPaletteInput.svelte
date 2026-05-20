<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    class?: string;
    value?: string;
    placeholder?: string;
    leading?: Snippet;
    trailing?: Snippet;
    [key: string]: unknown;
  }

  let {
    class: className,
    value = $bindable(''),
    placeholder = 'Type a command...',
    leading,
    trailing,
    ...rest
  }: Props = $props();
</script>

{#if leading || trailing}
  <div class="flex items-center gap-3 border-b border-kumo-line bg-kumo-base px-3 focus-within:ring-2 focus-within:ring-kumo-brand">
    {@render leading?.()}
    <CommandPrimitive.Input
      bind:value
      {placeholder}
      class={cn('h-11 min-w-0 flex-1 bg-transparent text-base text-kumo-default outline-none placeholder:text-kumo-muted', className)}
      {...rest}
    />
    {@render trailing?.()}
  </div>
{:else}
  <CommandPrimitive.Input
    bind:value
    {placeholder}
    class={cn(
      'h-11 w-full border-b border-kumo-line bg-transparent px-3 text-base text-kumo-default outline-none placeholder:text-kumo-muted',
      className
    )}
    {...rest}
  />
{/if}
