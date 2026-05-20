<script lang="ts">
  import { Grid, Surface, Text } from 'kumo-svelte';
</script>

<Grid variant="2-1" gap="sm">
  <Grid.Item>
    <Surface class="rounded-lg p-4">
      <Text bold>Main Content</Text>
      <div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div>
    </Surface>
  </Grid.Item>
  <Grid.Item>
    <Surface class="rounded-lg p-4">
      <Text bold>Sidebar</Text>
      <div class="mt-1"><Text variant="secondary">One-third width</Text></div>
    </Surface>
  </Grid.Item>
</Grid>
