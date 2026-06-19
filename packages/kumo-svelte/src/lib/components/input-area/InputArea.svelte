<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Field, normalizeFieldError } from '$lib/components/field';
  import { cn } from '$lib/utils/cn';
  import {
    inputVariants,
    type KumoInputSize,
    type KumoInputVariant
  } from '../input/input-variants';

  type ErrorMatch = keyof ValidityState | true;
  type FieldError = string | { message: string; match: ErrorMatch };

  interface Props {
    class?: string;
    size?: KumoInputSize;
    variant?: KumoInputVariant;
    invalid?: boolean;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string;
    error?: FieldError;
    value?: string;
    onValueChange?: (value: string) => void;
    oninput?: (event: Event) => void;
    required?: boolean;
    id?: string;
    [key: string]: unknown;
  }

  let {
    class: className,
    size = 'base',
    variant,
    invalid = false,
    label,
    labelTooltip,
    description,
    error,
    value = $bindable(''),
    onValueChange,
    oninput,
    required,
    id,
    ...rest
  }: Props = $props();

  const generatedId = `kumo-input-area-${Math.random().toString(36).slice(2)}`;
  const textareaId = $derived(id ?? generatedId);

  let validity = $state<ValidityState | undefined>();

  const hasField = $derived(Boolean(label || error || description));
  const normalizedVariant = $derived(variant ?? (error || invalid ? 'error' : 'default'));
  const normalizedError = $derived(normalizeFieldError(error));
  const showError = $derived.by(() => {
    if (!normalizedError) return undefined;
    if (normalizedError.match === true) return normalizedError.message;
    if (validity?.[normalizedError.match as keyof ValidityState]) return normalizedError.message;
    return undefined;
  });

  function handleInput(event: Event) {
    value = (event.currentTarget as HTMLTextAreaElement).value;
    validity = (event.currentTarget as HTMLTextAreaElement).validity;
    onValueChange?.(value);
    oninput?.(event);
  }
</script>

{#snippet control()}
  <textarea
    bind:value
    id={textareaId}
    class={cn(
      inputVariants({ size, variant: normalizedVariant, focusIndicator: true }),
      'h-auto py-2',
      className
    )}
    aria-invalid={Boolean(showError || invalid) || undefined}
    {required}
    oninput={handleInput}
    {...rest}
  ></textarea>
{/snippet}

{#if hasField}
  <Field {label} {labelTooltip} {description} error={showError ? String(showError) : undefined} {required}>
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
