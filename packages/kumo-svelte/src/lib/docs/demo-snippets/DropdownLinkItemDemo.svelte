<script lang="ts">
  import { ArrowSquareOut, BookOpen, Gear } from 'phosphor-svelte';
  import { Button, DropdownMenu } from 'kumo-svelte';
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button>Resources</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.LinkItem href="/settings" icon={Gear}>
      Settings
    </DropdownMenu.LinkItem>
    <DropdownMenu.LinkItem href="/docs" icon={BookOpen}>
      Documentation
    </DropdownMenu.LinkItem>
    <DropdownMenu.Separator />
    <DropdownMenu.LinkItem
      href="https://developers.cloudflare.com"
      target="_blank"
      icon={ArrowSquareOut}
    >
      Developer Docs
    </DropdownMenu.LinkItem>
  </DropdownMenu.Content>
</DropdownMenu>
