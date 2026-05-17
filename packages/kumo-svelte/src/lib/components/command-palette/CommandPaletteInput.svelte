<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/cn';

  interface Props {
    class?: string;
    value?: string;
    placeholder?: string;
    [key: string]: unknown;
  }

  let { class: className, value = $bindable(''), placeholder = 'Type a command...', ...rest }: Props = $props();
</script>

<CommandPrimitive.Input
  bind:value
  {placeholder}
  class={cn(
    'h-11 w-full border-b border-kumo-line bg-transparent px-3 text-base text-kumo-default outline-none placeholder:text-kumo-muted',
    className
  )}
  {...rest}
/>
