import RadioRoot from './Radio.svelte';
import RadioGroup from './RadioGroup.svelte';
import RadioItem from './RadioItem.svelte';
import RadioLegend from './RadioLegend.svelte';

export const Radio = Object.assign(RadioRoot, {
  Group: RadioGroup,
  Item: RadioItem,
  Legend: RadioLegend
});

export { RadioGroup, RadioItem, RadioLegend };
export type { RadioAppearance, RadioControlPosition, RadioVariant } from './Radio.svelte';
