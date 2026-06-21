<script lang="ts">
  import { TooltipProvider } from '$lib/components/tooltip';
  import Button from './Button.svelte';
</script>

<TooltipProvider>
  <Button title="Create a new Worker" aria-label="Create Worker" />
</TooltipProvider>
