import LayerCardRoot from './LayerCard.svelte';
import LayerCardPrimary from './LayerCardPrimary.svelte';
import LayerCardSecondary from './LayerCardSecondary.svelte';

export const LayerCard = Object.assign(LayerCardRoot, {
  Primary: LayerCardPrimary,
  Secondary: LayerCardSecondary
});

export { LayerCardPrimary, LayerCardSecondary };
export default LayerCard;
