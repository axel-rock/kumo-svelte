import Root from './Grid.svelte';
import Item from './GridItem.svelte';

const Grid = Object.assign(Root, {
  Root,
  Item
}) as typeof Root & {
  Root: typeof Root;
  Item: typeof Item;
};

export { Grid };
export {
  gridItemVariants,
  gridVariants,
  KUMO_GRID_DEFAULT_VARIANTS,
  KUMO_GRID_VARIANTS,
  type KumoGridGap,
  type KumoGridVariant,
  type KumoGridVariantsProps
} from './Grid.svelte';
export { Item as GridItem };
