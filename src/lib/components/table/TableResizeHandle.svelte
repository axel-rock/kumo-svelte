<script lang="ts">
  interface Props {
    [key: string]: unknown;
  }

  let { ...rest }: Props = $props();
</script>

<button
  type="button"
  aria-label="Resize column"
  class="invisible h-full group-hover:visible w-[10px] flex items-center justify-center cursor-col-resize touch-none select-none absolute top-0 right-0 m-0 bg-kumo-base p-0 focus-visible:ring-2 focus-visible:ring-kumo-brand"
  {...rest}
>
  <span class="h-5 w-[2px] rounded bg-kumo-hairline"></span>
</button>
