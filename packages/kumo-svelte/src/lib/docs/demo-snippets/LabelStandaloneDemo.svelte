<script lang="ts">
  import { Label } from 'kumo-svelte';
</script>

<div class="flex flex-col gap-3">
  <Label>Default</Label>
  <Label showOptional>Optional</Label>
  <Label tooltip="Important field">With Tooltip</Label>
</div>
