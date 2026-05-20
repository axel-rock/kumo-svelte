<script lang="ts">
  import { Copy, PencilSimple, Trash } from 'phosphor-svelte';
  import { Button, DropdownMenu } from 'kumo-svelte';
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button>Edit</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={PencilSimple}>Rename</DropdownMenu.Item>
    <DropdownMenu.Item icon={Copy}>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item inset>Move to folder</DropdownMenu.Item>
    <DropdownMenu.Item inset>Add to favorites</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item icon={Trash} variant="danger">Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
