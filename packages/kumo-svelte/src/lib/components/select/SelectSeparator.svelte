<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { KUMO_SELECT_SEPARATOR_CLASSES } from './select-variants';

  interface Props {
    class?: string;
    [key: string]: unknown;
  }

  let { class: className, ...rest }: Props = $props();
</script>

<div
  role="separator"
  aria-orientation="horizontal"
  class={cn(KUMO_SELECT_SEPARATOR_CLASSES, className)}
  data-kumo-component="Select"
  data-kumo-part="separator"
  {...rest}
></div>
