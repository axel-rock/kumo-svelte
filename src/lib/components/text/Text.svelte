<script lang="ts" module>
  import { cn } from '$lib/utils/cn';

  /** Text variant and size definitions mapping names to their Tailwind classes. */
  export const KUMO_TEXT_VARIANTS = {
    variant: {
      heading1: {
        classes: 'text-3xl font-semibold',
        description: 'Large heading for page titles'
      },
      heading2: {
        classes: 'text-2xl font-semibold',
        description: 'Medium heading for section titles'
      },
      heading3: {
        classes: 'text-lg font-semibold',
        description: 'Small heading for subsections'
      },
      body: {
        classes: 'text-kumo-default',
        description: 'Default body text'
      },
      secondary: {
        classes: 'text-kumo-subtle',
        description: 'Muted text for secondary information'
      },
      success: {
        classes: 'text-kumo-link',
        description: 'Success state text'
      },
      error: {
        classes: 'text-kumo-danger',
        description: 'Error state text'
      },
      mono: {
        classes: 'font-mono',
        description: 'Monospace text for code'
      },
      'mono-secondary': {
        classes: 'font-mono text-kumo-subtle',
        description: 'Muted monospace text'
      }
    },
    size: {
      xs: {
        classes: 'text-xs',
        description: 'Extra small text'
      },
      sm: {
        classes: 'text-sm',
        description: 'Small text'
      },
      base: {
        classes: 'text-base',
        description: 'Default text size'
      },
      lg: {
        classes: 'text-lg',
        description: 'Large text'
      }
    }
  } as const;

  export const KUMO_TEXT_DEFAULT_VARIANTS = {
    variant: 'body',
    size: 'base'
  } as const;

  /**
   * Styling metadata for Text component (for AI/Figma plugin consumption).
   */
  export const KUMO_TEXT_STYLING = {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600
    },
    baseColor: 'text-kumo-default',
    variantColors: {
      body: 'text-kumo-default',
      secondary: 'text-kumo-subtle',
      success: 'text-kumo-link',
      error: 'text-kumo-danger',
      mono: 'text-kumo-default',
      'mono-secondary': 'text-kumo-subtle'
    },
    fontFamilies: {
      default: 'sans-serif',
      mono: 'monospace'
    }
  } as const;

  export type KumoTextVariant = keyof typeof KUMO_TEXT_VARIANTS.variant;
  export type KumoTextSize = keyof typeof KUMO_TEXT_VARIANTS.size;

  export interface KumoTextVariantsProps {
    variant?: KumoTextVariant;
    size?: KumoTextSize;
  }

  export type TextElement =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'label'
    | 'dt'
    | 'dd'
    | 'li'
    | 'figcaption'
    | 'legend'
    | 'pre'
    | 'code'
    | 'em'
    | 'strong'
    | 'small'
    | 'abbr'
    | 'time';

  export function textVariants({
    variant = KUMO_TEXT_DEFAULT_VARIANTS.variant,
    size = KUMO_TEXT_DEFAULT_VARIANTS.size
  }: KumoTextVariantsProps = {}) {
    return cn(
      KUMO_TEXT_VARIANTS.variant[variant]?.classes ??
        KUMO_TEXT_VARIANTS.variant[KUMO_TEXT_DEFAULT_VARIANTS.variant].classes,
      KUMO_TEXT_VARIANTS.size[size]?.classes ??
        KUMO_TEXT_VARIANTS.size[KUMO_TEXT_DEFAULT_VARIANTS.size].classes
    );
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Text style variant. Determines color, font, and weight. */
    variant?: KumoTextVariant;
    /** Text size. Only applies to body/secondary/success/error variants. */
    size?: KumoTextSize;
    /** Whether to use bold font weight. Only applies to body variants. */
    bold?: boolean;
    /** Whether to truncate overflowing text with an ellipsis. */
    truncate?: boolean;
    /** The HTML element to render. */
    as?: TextElement;
    /** Text content. */
    children?: Snippet;
    DANGEROUS_className?: string;
    DANGEROUS_style?: string;
    class?: string;
    style?: string;
    [key: string]: unknown;
  }

  let {
    variant = KUMO_TEXT_DEFAULT_VARIANTS.variant,
    size = KUMO_TEXT_DEFAULT_VARIANTS.size,
    bold = false,
    truncate = false,
    as,
    children,
    DANGEROUS_className,
    DANGEROUS_style,
    class: className,
    style,
    ...rest
  }: Props = $props();

  const copyVariants = ['body', 'secondary', 'success', 'error'];
  const monoVariants = ['mono', 'mono-secondary'];

  let isCopy = $derived(copyVariants.includes(variant));
  let isMono = $derived(monoVariants.includes(variant));
  let Component = $derived(as ?? (isMono || variant.startsWith('heading') ? 'span' : 'p'));
  let computedClass = $derived(
    cn(
      'text-kumo-default',
      KUMO_TEXT_VARIANTS.variant[variant]?.classes ??
        KUMO_TEXT_VARIANTS.variant[KUMO_TEXT_DEFAULT_VARIANTS.variant].classes,
      isCopy
        ? (KUMO_TEXT_VARIANTS.size[size]?.classes ??
            KUMO_TEXT_VARIANTS.size[KUMO_TEXT_DEFAULT_VARIANTS.size].classes)
        : '',
      isCopy && bold ? 'font-medium' : '',
      isMono
        ? size === 'lg'
          ? KUMO_TEXT_VARIANTS.size.base.classes
          : KUMO_TEXT_VARIANTS.size.sm.classes
        : '',
      truncate && 'truncate min-w-0',
      DANGEROUS_className,
      className
    )
  );
  let computedStyle = $derived(DANGEROUS_style ?? style);
</script>

<svelte:element this={Component} class={computedClass} style={computedStyle} {...rest}>
  {@render children?.()}
</svelte:element>
