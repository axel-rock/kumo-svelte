<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { Loader } from '$lib/components/loader';

  interface Props {
    children?: Snippet;
    class?: string;
    progress?: number;
    [key: string]: unknown;
  }

  let { children, class: className, progress, ...rest }: Props = $props();
</script>

<CommandPrimitive.Loading {progress} class={className} {...rest}>
  <div class="flex items-center justify-center p-8">
    {#if children}
      {@render children()}
    {:else}
      <Loader size={24} />
    {/if}
  </div>
</CommandPrimitive.Loading>
