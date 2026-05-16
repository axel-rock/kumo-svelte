<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface TabItem { value: string; label: string; disabled?: boolean; content?: Snippet; }
  interface Props { items: TabItem[]; value?: string; class?: string; listClass?: string; triggerClass?: string; contentClass?: string; [key: string]: unknown; }
  let { items, value = $bindable(), class: className, listClass, triggerClass, contentClass, ...rest }: Props = $props();
</script>

<TabsPrimitive.Root bind:value class={cn('w-full', className)} {...rest}>
  <TabsPrimitive.List class={cn('inline-flex h-9 items-center rounded-lg bg-kumo-fill p-1 text-kumo-muted', listClass)}>
    {#each items as item}
      <TabsPrimitive.Trigger value={item.value} disabled={item.disabled} class={cn('inline-flex h-7 items-center justify-center rounded-md px-3 text-sm font-medium transition hover:text-kumo-default data-[state=active]:bg-kumo-base data-[state=active]:text-kumo-default data-[state=active]:shadow-xs disabled:pointer-events-none disabled:opacity-50', triggerClass)}>
        {item.label}
      </TabsPrimitive.Trigger>
    {/each}
  </TabsPrimitive.List>
  {#each items as item}
    <TabsPrimitive.Content value={item.value} class={cn('mt-3 outline-none', contentClass)}>
      {@render item.content?.()}
    </TabsPrimitive.Content>
  {/each}
</TabsPrimitive.Root>
