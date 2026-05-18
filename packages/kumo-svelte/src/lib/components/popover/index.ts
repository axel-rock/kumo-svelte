import Root from './Popover.svelte';
import PopoverRoot from './PopoverRoot.svelte';
import Trigger from './PopoverTrigger.svelte';
import Content from './PopoverContent.svelte';
import Title from './PopoverTitle.svelte';
import Description from './PopoverDescription.svelte';
import Close from './PopoverClose.svelte';

const Popover = Object.assign(Root, {
  Root: PopoverRoot,
  Trigger,
  Content,
  Title,
  Description,
  Close
}) as typeof Root & {
  Root: typeof PopoverRoot;
  Trigger: typeof Trigger;
  Content: typeof Content;
  Title: typeof Title;
  Description: typeof Description;
  Close: typeof Close;
};

export {
  Popover,
  PopoverRoot,
  Trigger as PopoverTrigger,
  Content as PopoverContent,
  Title as PopoverTitle,
  Description as PopoverDescription,
  Close as PopoverClose
};
