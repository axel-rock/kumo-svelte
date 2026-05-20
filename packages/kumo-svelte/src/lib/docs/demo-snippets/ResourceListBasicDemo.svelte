<script lang="ts">
  import { Surface } from 'kumo-svelte';
  import { ResourceListPage } from '../../../blocks/resource-list';
  import { Database } from 'phosphor-svelte';
</script>

<ResourceListPage
  title="Databases"
  description="Manage your database instances and configurations"
  icon={Database}
>
  <Surface class="p-6">
    <p>Main content area - your resource list would go here</p>
  </Surface>
</ResourceListPage>
