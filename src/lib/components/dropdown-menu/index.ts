import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import DropdownMenuRoot from './DropdownMenu.svelte';
import DropdownMenuTrigger from './DropdownMenuTrigger.svelte';
import DropdownMenuContent from './DropdownMenuContent.svelte';
import DropdownMenuItem from './DropdownMenuItem.svelte';
import DropdownMenuCheckboxItem from './DropdownMenuCheckboxItem.svelte';
import DropdownMenuLabel from './DropdownMenuLabel.svelte';
import DropdownMenuRadioItem from './DropdownMenuRadioItem.svelte';
import DropdownMenuRadioItemIndicator from './DropdownMenuRadioItemIndicator.svelte';
import DropdownMenuSeparator from './DropdownMenuSeparator.svelte';
import DropdownMenuShortcut from './DropdownMenuShortcut.svelte';
import DropdownMenuSubContent from './DropdownMenuSubContent.svelte';
import DropdownMenuSubTrigger from './DropdownMenuSubTrigger.svelte';

export {
  KUMO_DROPDOWN_DEFAULT_VARIANTS,
  KUMO_DROPDOWN_VARIANTS,
  type KumoDropdownVariant
} from './DropdownMenuItem.svelte';

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPrimitive.Portal,
  Sub: DropdownMenuPrimitive.Sub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  LinkItem: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  CheckboxGroup: DropdownMenuPrimitive.CheckboxGroup,
  RadioGroup: DropdownMenuPrimitive.RadioGroup,
  RadioItem: DropdownMenuRadioItem,
  RadioItemIndicator: DropdownMenuRadioItemIndicator,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuPrimitive.Group
});

export default DropdownMenu;
