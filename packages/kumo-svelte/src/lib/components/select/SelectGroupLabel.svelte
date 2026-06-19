<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Select as SelectPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/cn';
  import { KUMO_SELECT_GROUP_LABEL_CLASSES } from './select-variants';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<SelectPrimitive.GroupHeading
  class={cn(KUMO_SELECT_GROUP_LABEL_CLASSES, className)}
  data-kumo-component="Select"
  data-kumo-part="group-label"
  {...rest}
>
  {@render children?.()}
</SelectPrimitive.GroupHeading>
