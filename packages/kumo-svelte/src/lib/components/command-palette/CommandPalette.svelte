<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export interface CommandPaletteCommand {
    label: string;
    value?: string;
    action?: () => void;
    disabled?: boolean;
    description?: string;
    group?: string;
    keywords?: string[];
  }

  interface GroupedCommand {
    label?: string;
    items: CommandPaletteCommand[];
  }

  interface Props {
    children?: Snippet;
    class?: string;
    commands?: CommandPaletteCommand[];
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    onSelect?: (command: CommandPaletteCommand, options: { newTab: boolean }) => void;
    label?: string;
    loop?: boolean;
    shouldFilter?: boolean;
    loading?: boolean;
    loadingText?: string;
    emptyText?: string;
    inputClass?: string;
    listClass?: string;
    itemClass?: string;
    inputProps?: Record<string, unknown>;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    commands = [],
    placeholder = 'Type a command...',
    value = $bindable(''),
    onValueChange,
    onSelect,
    label = 'Command menu',
    loop = true,
    shouldFilter = true,
    loading = false,
    loadingText = 'Loading...',
    emptyText = 'No results found.',
    inputClass,
    listClass,
    itemClass,
    inputProps,
    ...rest
  }: Props = $props();

  let search = $state('');
  let selectInNewTab = false;

  const groupedCommands = $derived.by<GroupedCommand[]>(() => {
    const grouped: GroupedCommand[] = [];
    const ungrouped: CommandPaletteCommand[] = [];

    for (const command of commands) {
      if (!command.group) {
        ungrouped.push(command);
        continue;
      }

      const group = grouped.find((entry) => entry.label === command.group);
      if (group) {
        group.items.push(command);
      } else {
        grouped.push({ label: command.group, items: [command] });
      }
    }

    return [...(ungrouped.length ? [{ items: ungrouped }] : []), ...grouped];
  });

  function commandValue(command: CommandPaletteCommand) {
    return command.value ?? command.label;
  }

  function handleValueChange(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      selectInNewTab = event.metaKey || event.ctrlKey;
    }
  }

  function handleSelect(command: CommandPaletteCommand) {
    command.action?.();
    onSelect?.(command, { newTab: selectInNewTab });
    selectInNewTab = false;
  }
</script>

<CommandPrimitive.Root
  class={cn('overflow-hidden rounded-xl bg-kumo-base shadow-lg ring ring-kumo-hairline', className)}
  {label}
  {loop}
  {shouldFilter}
  {value}
  onValueChange={handleValueChange}
  onkeydown={handleKeydown}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <CommandPrimitive.Input
      bind:value={search}
      {placeholder}
      {...inputProps}
      class={cn(
        'h-11 w-full border-b border-kumo-line bg-transparent px-3 text-base text-kumo-default outline-none placeholder:text-kumo-muted',
        inputClass
      )}
    />
    <CommandPrimitive.List class={cn('max-h-72 overflow-auto p-1', listClass)}>
      {#if loading}
        <CommandPrimitive.Loading class="px-2 py-6 text-center text-sm text-kumo-subtle">
          {loadingText}
        </CommandPrimitive.Loading>
      {:else}
        {#each groupedCommands as group (group.label ?? '__ungrouped')}
          <CommandPrimitive.Group value={group.label} class="py-1">
            {#if group.label}
              <CommandPrimitive.GroupHeading class="px-2 py-1.5 text-xs font-medium text-kumo-subtle">
                {group.label}
              </CommandPrimitive.GroupHeading>
            {/if}
            <CommandPrimitive.GroupItems>
              {#each group.items as command (commandValue(command))}
                <CommandPrimitive.Item
                  value={commandValue(command)}
                  keywords={command.keywords}
                  disabled={command.disabled}
                  onSelect={() => handleSelect(command)}
                  class={cn(
                    'flex min-h-8 cursor-default select-none flex-col rounded-md px-2 py-1.5 text-left text-sm text-kumo-default outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[selected]:bg-kumo-tint',
                    itemClass
                  )}
                >
                  <span>{command.label}</span>
                  {#if command.description}
                    <span class="text-xs text-kumo-subtle">{command.description}</span>
                  {/if}
                </CommandPrimitive.Item>
              {/each}
            </CommandPrimitive.GroupItems>
          </CommandPrimitive.Group>
        {/each}
        <CommandPrimitive.Empty class="px-2 py-6 text-center text-sm text-kumo-subtle">
          {emptyText}
        </CommandPrimitive.Empty>
      {/if}
    </CommandPrimitive.List>
  {/if}
</CommandPrimitive.Root>
