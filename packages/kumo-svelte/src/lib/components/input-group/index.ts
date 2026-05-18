import Root from './InputGroup.svelte';
import Input from './InputGroupInput.svelte';
import Addon from './InputGroupAddon.svelte';
import Button from './InputGroupButton.svelte';
import Suffix from './InputGroupSuffix.svelte';

const InputGroup = Object.assign(Root, {
  Root,
  Input,
  Addon,
  Button,
  Suffix
}) as typeof Root & {
  Root: typeof Root;
  Input: typeof Input;
  Addon: typeof Addon;
  Button: typeof Button;
  Suffix: typeof Suffix;
};

export {
  InputGroup,
  Input as InputGroupInput,
  Addon as InputGroupAddon,
  Button as InputGroupButton,
  Suffix as InputGroupSuffix
};
export type { FieldError, InputGroupFocusMode, InputGroupSize } from './context';
