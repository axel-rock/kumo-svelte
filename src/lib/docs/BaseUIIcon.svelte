<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    size?: number;
    class?: string;
  }

  let { size = 20, class: className = '' }: Props = $props();
  let circleSize = $derived(size * 0.75);
</script>

<span class={cn('inline-flex items-center justify-center', className)} style:width={`${size}px`} style:height={`${size}px`} aria-hidden="true">
  <span class="block rounded-full bg-black dark:bg-white" style:width={`${circleSize}px`} style:height={`${circleSize}px`}></span>
</span>
