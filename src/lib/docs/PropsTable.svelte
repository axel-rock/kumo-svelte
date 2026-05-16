<script lang="ts">
  interface Props {
    component?: string;
    sourceFile?: string;
  }

  let { component, sourceFile }: Props = $props();
</script>

<div class="not-prose my-4 rounded-lg border border-kumo-hairline bg-kumo-canvas p-4 text-sm text-kumo-subtle">
  Props table: {component ?? sourceFile ?? 'component'}
</div>
