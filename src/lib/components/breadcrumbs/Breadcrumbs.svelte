<script lang="ts">
  import { cn } from '$lib/utils/cn';
  interface Crumb { label: string; href?: string; }
  interface Props { class?: string; items?: Crumb[]; [key: string]: unknown; }
  let { class: className, items = [], ...rest }: Props = $props();
</script>

<nav class={cn('text-sm text-kumo-muted', className)} aria-label="Breadcrumb" {...rest}>
  <ol class="flex flex-wrap items-center gap-1">
    {#each items as item, i}
      <li class="inline-flex items-center gap-1">
        {#if i > 0}<span aria-hidden="true">/</span>{/if}
        {#if item.href}<a class="text-kumo-link hover:underline" href={item.href}>{item.label}</a>{:else}<span class="text-kumo-default">{item.label}</span>{/if}
      </li>
    {/each}
  </ol>
</nav>
