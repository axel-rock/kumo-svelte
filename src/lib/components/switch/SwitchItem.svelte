<script lang="ts">
  import { getContext } from 'svelte';
  import Switch, { type SwitchSize, type SwitchVariant } from './Switch.svelte';

  interface SwitchGroupContext {
    readonly controlFirst: boolean;
  }

  interface Props {
    class?: string;
    checked?: boolean;
    disabled?: boolean;
    size?: SwitchSize;
    variant?: SwitchVariant;
    label: string;
    transitioning?: boolean;
    onchange?: (checked: boolean) => void;
  }

  let { class: className, checked = $bindable(false), disabled = false, size = 'base', variant = 'default', label, transitioning, onchange }: Props = $props();
  const group = getContext<SwitchGroupContext | undefined>('kumo-switch-group');
</script>

<Switch bind:checked {disabled} {size} {variant} {label} {transitioning} {onchange} controlFirst={group?.controlFirst ?? true} class={className} />
