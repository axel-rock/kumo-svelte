import LayerCardRoot from './LayerCard.svelte';
import LayerCardPrimary from './LayerCardPrimary.svelte';
import LayerCardSecondary from './LayerCardSecondary.svelte';

export const LayerCard = Object.assign(LayerCardRoot, {
  Primary: LayerCardPrimary,
  Secondary: LayerCardSecondary
}) as typeof LayerCardRoot & {
  Primary: typeof LayerCardPrimary;
  Secondary: typeof LayerCardSecondary;
};

export { LayerCardPrimary, LayerCardSecondary };
export default LayerCard;
