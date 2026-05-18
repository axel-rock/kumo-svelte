import Root from './Checkbox.svelte';
import Group from './CheckboxGroup.svelte';
import Item from './CheckboxItem.svelte';
import Legend from './CheckboxLegend.svelte';

const Checkbox = Object.assign(Root, {
  Root,
  Group,
  Item,
  Legend
}) as typeof Root & {
  Root: typeof Root;
  Group: typeof Group;
  Item: typeof Item;
  Legend: typeof Legend;
};

export { Checkbox, Group as CheckboxGroup, Item as CheckboxItem, Legend as CheckboxLegend };
export type { CheckboxVariant } from './Checkbox.svelte';
