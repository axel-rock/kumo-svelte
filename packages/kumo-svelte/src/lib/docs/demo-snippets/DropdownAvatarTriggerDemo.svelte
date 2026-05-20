<script lang="ts">
  import { Gear, SignOut, User } from 'phosphor-svelte';
  import { DropdownMenu } from 'kumo-svelte';
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <button type="button" class="rounded-full">
      <span class="flex h-8 w-8 items-center justify-center rounded-full bg-kumo-brand text-sm font-medium text-white">
        MR
      </span>
    </button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={User}>Profile</DropdownMenu.Item>
    <DropdownMenu.Item icon={Gear}>Settings</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item icon={SignOut} variant="danger">Log out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
