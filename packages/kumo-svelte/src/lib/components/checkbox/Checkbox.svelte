<script module lang="ts">
  import { cn } from '$lib/utils/cn';
  import { resolveVariant } from '$lib/utils/variants';

  /** Checkbox variant definitions mapping variant names to their Tailwind classes. */
  export const KUMO_CHECKBOX_VARIANTS = {
    variant: {
      default: {
        classes: '[&:focus-within>span]:ring-kumo-focus [&:hover>span]:ring-kumo-hairline',
        description: 'Default checkbox appearance'
      },
      error: {
        classes: '[&>span]:ring-kumo-danger',
        description: 'Error state for validation failures'
      }
    }
  } as const;

  export const KUMO_CHECKBOX_DEFAULT_VARIANTS = {
    variant: 'default'
  } as const;

  export type KumoCheckboxVariant = keyof typeof KUMO_CHECKBOX_VARIANTS.variant;
  export type CheckboxVariant = KumoCheckboxVariant;

  export interface KumoCheckboxVariantsProps {
    variant?: KumoCheckboxVariant;
  }

  export function checkboxVariants({
    variant = KUMO_CHECKBOX_DEFAULT_VARIANTS.variant
  }: KumoCheckboxVariantsProps = {}) {
    return cn(
      resolveVariant(
        { variant: KUMO_CHECKBOX_VARIANTS.variant },
        { variant },
        KUMO_CHECKBOX_DEFAULT_VARIANTS
      )
    );
  }

  /** Mirrors upstream dev a11y warning tokens for fidelity parity. */
  export const KUMO_CHECKBOX_A11Y_DEV_WARN =
    '  - aria-labelledby for custom label associationn';

  export const checkboxControlBaseClasses =
    'relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-0 bg-kumo-base ring focus:outline-none after:absolute after:-inset-x-3 after:-inset-y-2';

  export const checkboxStateClasses =
    'data-[checked]:bg-kumo-contrast data-[checked]:ring-kumo-contrast data-[indeterminate]:bg-kumo-contrast data-[indeterminate]:ring-kumo-contrast data-[state=checked]:bg-kumo-contrast data-[state=checked]:ring-kumo-contrast data-[state=indeterminate]:bg-kumo-contrast data-[state=indeterminate]:ring-kumo-contrast';

  export const checkboxIndicatorClasses =
    'flex items-center justify-center text-kumo-inverse data-[unchecked]:invisible data-[state=unchecked]:invisible';

  export function checkboxRingClasses(variant: CheckboxVariant = 'default') {
    return variant === 'error' ? 'ring-kumo-danger' : 'ring-kumo-hairline';
  }

  export const checkboxInteractiveClasses =
    'hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand';

  export const checkboxItemInteractiveClasses =
    'group-hover:ring-kumo-hairline hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand';

  export const checkboxControlClasses = cn(checkboxControlBaseClasses, checkboxStateClasses);

  export function checkboxVariantClasses(variant: CheckboxVariant = 'default') {
    return checkboxRingClasses(variant);
  }
</script>

<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import { Check, Minus } from 'phosphor-svelte';
  import Label from '$lib/components/label/Label.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    variant?: CheckboxVariant;
    label?: string;
    labelTooltip?: string | Snippet;
    controlFirst?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    onCheckedChange?: (checked: boolean) => void;
    onIndeterminateChange?: (indeterminate: boolean) => void;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    disabled = false,
    variant = 'default',
    label,
    labelTooltip,
    controlFirst = true,
    required,
    name,
    value,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    onCheckedChange,
    onIndeterminateChange,
    ...rest
  }: Props = $props();

  const hasVisibleLabel = $derived(Boolean(label || children));
  const controlLabel = $derived(ariaLabel ?? (label && !ariaLabelledBy ? label : undefined));
</script>

{#snippet control(withLabel = false)}
  <CheckboxPrimitive.Root
    bind:checked
    bind:indeterminate
    {disabled}
    {name}
    {value}
    {id}
    aria-label={controlLabel}
    aria-labelledby={ariaLabelledBy}
    data-kumo-component="Checkbox"
    {onCheckedChange}
    {onIndeterminateChange}
    class={cn(
      checkboxControlBaseClasses,
      checkboxStateClasses,
      checkboxRingClasses(variant),
      withLabel && 'mt-0.5',
      !disabled && checkboxInteractiveClasses,
      disabled && 'cursor-not-allowed opacity-50',
      className
    )}
    {...rest}
  >
    <span
      class={checkboxIndicatorClasses}
      data-unchecked={!checked && !indeterminate ? '' : undefined}
    >
      {#if indeterminate}
        <Minus size={12} weight="bold" aria-hidden="true" />
      {:else}
        <Check size={12} weight="bold" aria-hidden="true" />
      {/if}
    </span>
  </CheckboxPrimitive.Root>
{/snippet}

{#if label || children}
  <div class="inline-flex">
    <label
      data-kumo-component="Checkbox"
      data-kumo-part="label"
      class={cn(
        '!m-0 !min-h-0 !text-base inline-flex items-start gap-2',
        controlFirst ? 'flex-row' : 'flex-row-reverse justify-end',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      {@render control(true)}
      <Label showOptional={required === false} tooltip={labelTooltip} asContent>
        {#if label}
          {label}
        {:else}
          {@render children?.()}
        {/if}
      </Label>
    </label>
  </div>
{:else}
  {@render control()}
{/if}
