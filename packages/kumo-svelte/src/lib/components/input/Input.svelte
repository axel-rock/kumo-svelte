<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Field, normalizeFieldError } from '$lib/components/field';
  import { cn } from '$lib/utils/cn';
  import {
    inputVariants,
    KUMO_INPUT_PASSWORD_MANAGER_ATTRS,
    type KumoInputSize,
    type KumoInputVariant
  } from './input-variants';

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
    passwordManagerIgnore?: boolean;
    value?: string | number;
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
    passwordManagerIgnore = false,
    value = $bindable(''),
    onValueChange,
    oninput,
    required,
    id,
    ...rest
  }: Props = $props();

  const generatedId = `kumo-input-${Math.random().toString(36).slice(2)}`;
  const inputId = $derived(id ?? generatedId);

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

  const passwordManagerAttrs = $derived(
    passwordManagerIgnore ? KUMO_INPUT_PASSWORD_MANAGER_ATTRS : {}
  );

  function handleInput(event: Event) {
    value = (event.currentTarget as HTMLInputElement).value;
    validity = (event.currentTarget as HTMLInputElement).validity;
    onValueChange?.(String(value));
    oninput?.(event);
  }
</script>

{#snippet control()}
  <input
    bind:value
    id={inputId}
    class={cn(
      inputVariants({ size, variant: normalizedVariant, focusIndicator: true }),
      passwordManagerIgnore && 'keeper-ignore',
      className
    )}
    aria-invalid={Boolean(showError || invalid) || undefined}
    {required}
    oninput={handleInput}
    {...passwordManagerAttrs}
    {...rest}
  />
{/snippet}

{#if hasField}
  <Field {label} {labelTooltip} {description} error={showError ? String(showError) : undefined} {required}>
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
