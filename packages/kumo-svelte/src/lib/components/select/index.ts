import SelectRoot from './Select.svelte';
import SelectOption from './SelectOption.svelte';
import SelectGroup from './SelectGroup.svelte';
import SelectGroupLabel from './SelectGroupLabel.svelte';
import SelectSeparator from './SelectSeparator.svelte';

export {
  KUMO_SELECT_DEFAULT_VARIANTS,
  KUMO_SELECT_STYLING,
  KUMO_SELECT_VARIANTS,
  selectVariants,
  type KumoSelectSize
} from './select-variants';

export const Select = Object.assign(SelectRoot, {
  Option: SelectOption,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator
}) as typeof SelectRoot & {
  Option: typeof SelectOption;
  Group: typeof SelectGroup;
  GroupLabel: typeof SelectGroupLabel;
  Separator: typeof SelectSeparator;
};

export default Select;
