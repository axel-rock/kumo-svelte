<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import Field from '$lib/components/field/Field.svelte';
  import { Check } from 'phosphor-svelte';

  type Size = 'xs' | 'sm' | 'base' | 'lg';
  interface Option {
    label: string;
    value: string;
    disabled?: boolean;
    group?: string;
  }
  interface Props {
    class?: string;
    options?: Option[];
    value?: string;
    placeholder?: string;
    size?: Size;
    label?: string;
    description?: string;
    error?: string | { message: string; match: boolean };
    required?: boolean;
    onValueChange?: (value: string) => void;
    [key: string]: unknown;
  }

  let {
    class: className,
    options = [],
    value = $bindable(''),
    placeholder = 'Search…',
    size = 'base',
    label,
    description,
    error,
    required,
    onValueChange,
    ...rest
  }: Props = $props();

  const sizes: Record<Size, string> = {
    xs: 'h-5 rounded-sm px-1.5 text-xs',
    sm: 'h-6.5 rounded-md px-2 text-xs',
    base: 'h-9 rounded-lg px-3 text-base',
    lg: 'h-10 rounded-lg px-4 text-base'
  };

  let query = $state(value);
  let open = $state(false);
  const normalizedError = $derived(
    typeof error === 'string' ? error : error?.match ? error.message : undefined
  );
  let filtered = $derived(
    options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
  );
  let grouped = $derived.by(() => {
    const groups: { label: string; items: Option[] }[] = [];
    for (const option of filtered) {
      const group = option.group ?? '';
      const existing = groups.find((entry) => entry.label === group);
      if (existing) {
        existing.items = [...existing.items, option];
      } else {
        groups.push({ label: group, items: [option] });
      }
    }
    return groups;
  });

  function selectOption(option: Option) {
    if (option.disabled) return;
    value = option.value;
    query = option.label;
    open = false;
    onValueChange?.(option.value);
  }

  function handleInput(event: Event) {
    query = (event.currentTarget as HTMLInputElement).value;
    value = query;
    open = true;
    onValueChange?.(query);
  }
</script>

{#snippet control()}
  <div class={cn('relative w-full', className)} {...rest}>
    <input
      class={cn(
        'w-full border-0 bg-kumo-control text-kumo-default shadow-xs ring ring-kumo-line outline-none focus:outline-none',
        'placeholder:text-kumo-muted disabled:text-kumo-disabled',
        normalizedError
          ? '!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]'
          : 'focus:ring-kumo-focus/50 focus:ring-[1.5px]',
        sizes[size]
      )}
      value={query}
      {placeholder}
      aria-invalid={Boolean(normalizedError) || undefined}
      oninput={handleInput}
      onfocus={() => (open = true)}
      onkeydown={(event) => {
        if (event.key === 'Escape') open = false;
      }}
    />
    {#if open && query && filtered.length}
      <div class="absolute z-50 mt-1 max-h-96 min-w-full overflow-auto rounded-lg bg-kumo-control py-1.5 text-kumo-default shadow-lg ring ring-kumo-line">
        {#each grouped as group}
          {#if group.label}
            <div class="mx-1.5 px-2 py-1.5 text-sm text-kumo-strong">{group.label}</div>
          {/if}
          {#each group.items as option}
            <button
              type="button"
              disabled={option.disabled}
              class="group mx-1.5 grid w-[calc(100%-0.75rem)] cursor-pointer grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-left text-base hover:bg-kumo-overlay disabled:cursor-not-allowed disabled:opacity-50"
              onclick={() => selectOption(option)}
            >
              <span>{option.label}</span>
              {#if option.value === value}<Check class="size-3.5 text-kumo-default" />{/if}
            </button>
          {/each}
        {/each}
      </div>
    {/if}
  </div>
{/snippet}

{#if label || description || normalizedError}
  <Field {label} {description} error={normalizedError} {required}>
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
