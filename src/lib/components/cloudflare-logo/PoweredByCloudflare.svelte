<script lang="ts">
  import CloudflareLogo, { type CloudflareLogoColor } from './CloudflareLogo.svelte';

  interface Props {
    class?: string;
    color?: CloudflareLogoColor;
    href?: string;
    [key: string]: unknown;
  }

  let {
    class: className,
    color = 'color',
    href = 'https://www.cloudflare.com',
    ...rest
  }: Props = $props();
</script>

<CloudflareLogo poweredBy {color} {href} class={className} {...rest} />
