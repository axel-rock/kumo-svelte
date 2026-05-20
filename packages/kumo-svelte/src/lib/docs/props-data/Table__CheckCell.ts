import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "checked",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Checked state for the row checkbox."
  },
  {
    "prop": "indeterminate",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Indeterminate state for the row checkbox."
  },
  {
    "prop": "onCheckedChange",
    "type": "(checked: boolean) => void",
    "required": false,
    "description": "Called when the checkbox's checked state changes."
  },
  {
    "prop": "onValueChange",
    "type": "(checked: boolean) => void",
    "required": false,
    "description": "Deprecated. Use onCheckedChange instead."
  },
  {
    "prop": "label",
    "type": "string",
    "required": false,
    "description": "Accessible label for the checkbox."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  }
];

export default rows;
