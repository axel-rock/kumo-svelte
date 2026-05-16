<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; value?: string; [key: string]: unknown; }
  let { class: className, value = $bindable(''), ...rest }: Props = $props();
  let visible = $state(false);
</script>

<div class={cn('relative', className)}>
  <input bind:value type={visible ? 'text' : 'password'} class="h-9 w-full rounded-lg bg-kumo-base px-3 pr-16 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line focus:ring-2 focus:ring-kumo-brand/40" {...rest} />
  <button type="button" class="absolute right-1 top-1 h-7 rounded-md px-2 text-xs text-kumo-link hover:bg-kumo-tint" onclick={() => visible = !visible}>{visible ? 'Hide' : 'Show'}</button>
</div>
