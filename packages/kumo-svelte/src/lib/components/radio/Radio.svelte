<script module lang="ts">
  export type RadioVariant = 'default' | 'error';
  export type RadioAppearance = 'default' | 'card';
  export type RadioControlPosition = 'start' | 'end';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import RadioGroup from './RadioGroup.svelte';
  import RadioItem from './RadioItem.svelte';

  interface Option {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }

  interface Props {
    children?: Snippet;
    options?: Option[];
    value?: string;
    defaultValue?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    orientation?: 'vertical' | 'horizontal';
    appearance?: RadioAppearance;
    variant?: RadioVariant;
    controlPosition?: RadioControlPosition;
    legend?: string;
    description?: string | Snippet;
    error?: string;
    class?: string;
    onValueChange?: (value: string) => void;
  }

  let {
    children,
    options = [],
    value = $bindable(),
    defaultValue,
    name,
    disabled = false,
    required,
    orientation = 'vertical',
    appearance = 'default',
    variant = 'default',
    controlPosition,
    legend,
    description,
    error,
    class: className,
    onValueChange
  }: Props = $props();
</script>

<RadioGroup
  bind:value
  {defaultValue}
  {name}
  {disabled}
  {required}
  {orientation}
  {appearance}
  {controlPosition}
  {legend}
  {description}
  {error}
  class={className}
  {onValueChange}
>
  {#if children}
    {@render children()}
  {:else}
    {#each options as option (option.value)}
      <RadioItem
        value={option.value}
        label={option.label}
        description={option.description}
        disabled={option.disabled}
        {variant}
      />
    {/each}
  {/if}
</RadioGroup>
