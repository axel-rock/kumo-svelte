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
    "description": "Checked state."
  },
  {
    "prop": "indeterminate",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Indeterminate checked state."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "variant",
    "type": "'default' | 'error'",
    "required": false,
    "default": "\"default\"",
    "description": "Visual variant."
  },
  {
    "prop": "label",
    "type": "string",
    "required": true,
    "description": "Visible label content."
  },
  {
    "prop": "value",
    "type": "string",
    "required": false,
    "description": "Controlled value."
  },
  {
    "prop": "name",
    "type": "string",
    "required": false,
    "description": "Form field name."
  },
  {
    "prop": "onCheckedChange",
    "type": "(checked: boolean) => void",
    "required": false,
    "description": "Called when checked changes."
  },
  {
    "prop": "onIndeterminateChange",
    "type": "(indeterminate: boolean) => void",
    "required": false,
    "description": "Called when indeterminate changes."
  }
];

export default rows;
