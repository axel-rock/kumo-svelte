<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import CommandPaletteDialog from './CommandPaletteDialog.svelte';

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
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onBackdropClick?: (event: MouseEvent) => void;
    container?: HTMLElement | string;
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
    open = $bindable(undefined),
    onOpenChange,
    onBackdropClick,
    container,
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

{#snippet commandRoot()}
  <CommandPrimitive.Root
    class={cn('flex max-h-[60vh] flex-col overflow-hidden rounded-lg bg-kumo-elevated', className)}
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
      <div class="flex items-center gap-3 bg-kumo-base px-4 py-3 focus-within:ring-2 focus-within:ring-kumo-brand">
        <svg class="h-4 w-4 text-kumo-subtle" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path d="M229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72 72.08 72.08 0 0 1-72-72Z" />
        </svg>
        <CommandPrimitive.Input
          bind:value={search}
          {placeholder}
          {...inputProps}
          class={cn('flex-1 border-none bg-transparent text-base kumo-input-placeholder outline-none', inputClass)}
        />
      </div>
      <CommandPrimitive.List class={cn('relative min-h-0 flex-1 overflow-y-auto rounded-b-lg bg-kumo-base px-2 py-2 scroll-py-2 ring-1 ring-kumo-hairline', listClass)}>
        {#if loading}
          <div class="flex items-center justify-center p-8">
            <span class="text-kumo-subtle">{loadingText}</span>
          </div>
        {:else}
          <div class="space-y-3">
            {#each groupedCommands as group (group.label ?? '__ungrouped')}
              <CommandPrimitive.Group value={group.label} class="space-y-0.5">
                {#if group.label}
                  <CommandPrimitive.GroupHeading class="mb-2 px-2 pt-1 text-xs font-semibold text-kumo-subtle">
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
                        'group flex w-full items-center gap-3 px-2 py-1.5 text-left text-base transition-colors',
                        'cursor-pointer data-[highlighted]:bg-kumo-overlay data-[selected]:bg-kumo-overlay',
                        'rounded-lg',
                        command.disabled && 'cursor-default opacity-50',
                        itemClass
                      )}
                    >
                      <span>{command.label}</span>
                      {#if command.description}
                        <span class="truncate text-sm text-kumo-subtle">{command.description}</span>
                      {/if}
                    </CommandPrimitive.Item>
                  {/each}
                </CommandPrimitive.GroupItems>
              </CommandPrimitive.Group>
            {/each}
          </div>
          <CommandPrimitive.Empty>
            <div class="p-8 text-center">
              <p class="text-kumo-subtle">{emptyText}</p>
            </div>
          </CommandPrimitive.Empty>
        {/if}
      </CommandPrimitive.List>
    {/if}
  </CommandPrimitive.Root>
{/snippet}

{#if typeof open === 'boolean'}
  <CommandPaletteDialog bind:open {onOpenChange} {onBackdropClick} {container}>
    {@render commandRoot()}
  </CommandPaletteDialog>
{:else}
  {@render commandRoot()}
{/if}
