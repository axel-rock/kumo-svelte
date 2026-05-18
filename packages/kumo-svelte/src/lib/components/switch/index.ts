import Root from './Switch.svelte';
import Group from './SwitchGroup.svelte';
import Item from './SwitchItem.svelte';
import Legend from './SwitchLegend.svelte';

const Switch = Object.assign(Root, {
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

export { Switch, Group as SwitchGroup, Item as SwitchItem, Legend as SwitchLegend };
export type { SwitchSize, SwitchVariant } from './Switch.svelte';
