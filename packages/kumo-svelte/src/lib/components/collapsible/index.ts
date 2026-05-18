import Root from './Collapsible.svelte';
import CollapsibleRoot from './CollapsibleRoot.svelte';
import Trigger from './CollapsibleTrigger.svelte';
import Panel from './CollapsiblePanel.svelte';
import DefaultTrigger from './CollapsibleDefaultTrigger.svelte';
import DefaultPanel from './CollapsibleDefaultPanel.svelte';

const Collapsible = Object.assign(Root, {
  Root: CollapsibleRoot,
  Trigger,
  Panel,
  DefaultTrigger,
  DefaultPanel
}) as typeof Root & {
  Root: typeof CollapsibleRoot;
  Trigger: typeof Trigger;
  Panel: typeof Panel;
  DefaultTrigger: typeof DefaultTrigger;
  DefaultPanel: typeof DefaultPanel;
};

export {
  Collapsible,
  CollapsibleRoot,
  Trigger as CollapsibleTrigger,
  Panel as CollapsiblePanel,
  DefaultTrigger as CollapsibleDefaultTrigger,
  DefaultPanel as CollapsibleDefaultPanel
};
