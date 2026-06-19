<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Field } from '$lib/components/field';
  import { inputVariants } from '$lib/components/input/input-variants';
  import { cn } from '$lib/utils/cn';
  import {
    INPUT_GROUP_HAS_CLASSES,
    setInputGroupContext,
    type FieldError,
    type InputGroupFocusMode,
    type InputGroupSize
  } from './context';

  export const KUMO_INPUT_GROUP_VARIANTS = {
    size: {
      xs: {
        classes: 'h-6 text-xs',
        description: 'Extra small size.'
      },
      sm: {
        classes: 'h-7 text-xs',
        description: 'Small size.'
      },
      base: {
        classes: 'h-9 text-base',
        description: 'Default size.'
      },
      lg: {
        classes: 'h-11 text-base',
        description: 'Large size.'
      }
    }
  } as const;

  export const KUMO_INPUT_GROUP_DEFAULT_VARIANTS = {
    size: 'base'
  } as const;

  interface Props {
    children?: Snippet;
    class?: string;
    size?: InputGroupSize;
    focusMode?: InputGroupFocusMode;
    disabled?: boolean;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string;
    error?: FieldError;
    required?: boolean;
    id?: string;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    size = 'base',
    focusMode = 'container',
    disabled = false,
    label,
    labelTooltip,
    description,
    error,
    required,
    id,
    ...rest
  }: Props = $props();

  const generatedId = `kumo-input-group-${Math.random().toString(36).slice(2)}`;
  const inputId = $derived(id ?? generatedId);
  const showError = $derived(typeof error === 'string' ? error : error?.message);
  const hasField = $derived(Boolean(label || description || showError));
  const useLabelContainer = $derived(!label && focusMode === 'container');

  setInputGroupContext({
    get size() {
      return size;
    },
    get focusMode() {
      return focusMode;
    },
    get disabled() {
      return disabled;
    },
    get error() {
      return error;
    },
    get inputId() {
      return inputId;
    },
    get describedBy() {
      return undefined;
    }
  });

  const containerClassName = $derived(
    cn(
      'relative w-full cursor-text',
      inputVariants({ size }),
      'shadow-xs',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      focusMode === 'container'
        ? ['overflow-hidden', 'focus-within:ring-kumo-focus/50 focus-within:ring-[1.5px]']
        : 'isolate overflow-visible ring-0 shadow-none',
      'has-[input[aria-invalid=true]]:ring-kumo-danger',
      'px-0',
      'flex items-center gap-0',
      'has-[[data-slot=input-group-suffix]]:[&_input]:[field-sizing:content]',
      'has-[[data-slot=input-group-suffix]]:[&_input]:max-w-full',
      'has-[[data-slot=input-group-suffix]]:[&_input]:grow-0',
      'has-[[data-slot=input-group-suffix]]:[&_input]:pr-0',
      INPUT_GROUP_HAS_CLASSES[size],
      '!mb-0',
      className
    )
  );

  const hybridContainerZoneClassName = $derived(
    cn(
      inputVariants({ size }),
      'overflow-hidden',
      'has-[input[aria-invalid=true]]:ring-kumo-danger',
      'px-0',
      'flex min-w-0 flex-1 items-center gap-0',
      'ring-0 shadow-none',
      'border border-kumo-line',
      'focus-within:border-kumo-focus/50',
      'focus-within:z-2',
      'not-first:-ml-px',
      'first:rounded-l-[inherit] last:rounded-r-[inherit] rounded-none',
      INPUT_GROUP_HAS_CLASSES[size],
      'has-data-[slot=input-group-suffix]:[&_input]:field-sizing-content',
      'has-data-[slot=input-group-suffix]:[&_input]:max-w-full',
      'has-data-[slot=input-group-suffix]:[&_input]:grow-0',
      'has-data-[slot=input-group-suffix]:[&_input]:pr-0'
    )
  );
</script>

{#snippet groupContent()}
  {#if focusMode === 'hybrid'}
    <div
      data-slot="input-group-container-zone"
      class={hybridContainerZoneClassName}
    >
      {#if label}
        <label for={inputId} class="absolute inset-0 z-0 cursor-text mb-0!" aria-hidden="true"></label>
      {/if}
      {@render children?.()}
    </div>
  {:else if label}
    <label for={inputId} class="absolute inset-0 z-0 mb-0!" aria-hidden="true"></label>
    {@render children?.()}
  {:else}
    {@render children?.()}
  {/if}
{/snippet}

{#snippet container()}
  {#if useLabelContainer}
    <label
      data-slot="input-group"
      data-focus-mode={focusMode}
      data-disabled={disabled ? '' : undefined}
      class={cn(containerClassName, 'mb-0!')}
      {...rest}
    >
      {@render groupContent()}
    </label>
  {:else}
    <div
      data-slot="input-group"
      data-focus-mode={focusMode}
      data-disabled={disabled ? '' : undefined}
      role="group"
      class={containerClassName}
      {...rest}
    >
      {@render groupContent()}
    </div>
  {/if}
{/snippet}

{#if hasField}
  <Field {label} {labelTooltip} {description} error={showError} {required}>
    {@render container()}
  </Field>
{:else}
  {@render container()}
{/if}
