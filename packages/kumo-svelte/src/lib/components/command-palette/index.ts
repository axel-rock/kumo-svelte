import { Command as CommandPrimitive } from 'bits-ui';
import CommandPaletteRoot from './CommandPalette.svelte';
import CommandPaletteDialog from './CommandPaletteDialog.svelte';
import CommandPalettePanel from './CommandPalettePanel.svelte';
import CommandPaletteInput from './CommandPaletteInput.svelte';
import CommandPaletteList from './CommandPaletteList.svelte';
import CommandPaletteGroup from './CommandPaletteGroup.svelte';
import CommandPaletteGroupLabel from './CommandPaletteGroupLabel.svelte';
import CommandPaletteItems from './CommandPaletteItems.svelte';
import CommandPaletteItem from './CommandPaletteItem.svelte';
import CommandPaletteResultItem from './CommandPaletteResultItem.svelte';
import CommandPaletteHighlightedText from './CommandPaletteHighlightedText.svelte';
import CommandPaletteEmpty from './CommandPaletteEmpty.svelte';
import CommandPaletteLoading from './CommandPaletteLoading.svelte';
import CommandPaletteFooter from './CommandPaletteFooter.svelte';
import CommandPaletteResults from './CommandPaletteResults.svelte';

export const KUMO_COMMAND_PALETTE_VARIANTS = {} as const;

export const KUMO_COMMAND_PALETTE_DEFAULT_VARIANTS = {} as const;

export { default as CommandPaletteRoot } from './CommandPalette.svelte';
export { default as CommandPaletteDialog } from './CommandPaletteDialog.svelte';
export { default as CommandPalettePanel } from './CommandPalettePanel.svelte';
export { default as CommandPaletteInput } from './CommandPaletteInput.svelte';
export { default as CommandPaletteList } from './CommandPaletteList.svelte';
export { default as CommandPaletteGroup } from './CommandPaletteGroup.svelte';
export { default as CommandPaletteGroupLabel } from './CommandPaletteGroupLabel.svelte';
export { default as CommandPaletteItems } from './CommandPaletteItems.svelte';
export { default as CommandPaletteItem } from './CommandPaletteItem.svelte';
export { default as CommandPaletteResultItem } from './CommandPaletteResultItem.svelte';
export { default as CommandPaletteHighlightedText } from './CommandPaletteHighlightedText.svelte';
export { default as CommandPaletteEmpty } from './CommandPaletteEmpty.svelte';
export { default as CommandPaletteLoading } from './CommandPaletteLoading.svelte';
export { default as CommandPaletteFooter } from './CommandPaletteFooter.svelte';
export { default as CommandPaletteResults } from './CommandPaletteResults.svelte';
export type { CommandPaletteCommand } from './CommandPalette.svelte';

export const CommandPalette = Object.assign(CommandPaletteRoot, {
  Root: CommandPaletteRoot,
  Dialog: CommandPaletteDialog,
  Panel: CommandPalettePanel,
  Input: CommandPaletteInput,
  List: CommandPaletteList,
  Viewport: CommandPrimitive.Viewport,
  Results: CommandPaletteResults,
  Group: CommandPaletteGroup,
  GroupLabel: CommandPaletteGroupLabel,
  GroupHeading: CommandPaletteGroupLabel,
  Items: CommandPaletteItems,
  Item: CommandPaletteItem,
  LinkItem: CommandPrimitive.LinkItem,
  ResultItem: CommandPaletteResultItem,
  HighlightedText: CommandPaletteHighlightedText,
  Empty: CommandPaletteEmpty,
  Loading: CommandPaletteLoading,
  Separator: CommandPrimitive.Separator,
  Footer: CommandPaletteFooter
}) as typeof CommandPaletteRoot & {
  Root: typeof CommandPaletteRoot;
  Dialog: typeof CommandPaletteDialog;
  Panel: typeof CommandPalettePanel;
  Input: typeof CommandPaletteInput;
  List: typeof CommandPaletteList;
  Viewport: typeof CommandPrimitive.Viewport;
  Results: typeof CommandPaletteResults;
  Group: typeof CommandPaletteGroup;
  GroupLabel: typeof CommandPaletteGroupLabel;
  GroupHeading: typeof CommandPaletteGroupLabel;
  Items: typeof CommandPaletteItems;
  Item: typeof CommandPaletteItem;
  LinkItem: typeof CommandPrimitive.LinkItem;
  ResultItem: typeof CommandPaletteResultItem;
  HighlightedText: typeof CommandPaletteHighlightedText;
  Empty: typeof CommandPaletteEmpty;
  Loading: typeof CommandPaletteLoading;
  Separator: typeof CommandPrimitive.Separator;
  Footer: typeof CommandPaletteFooter;
};

export default CommandPalette;
