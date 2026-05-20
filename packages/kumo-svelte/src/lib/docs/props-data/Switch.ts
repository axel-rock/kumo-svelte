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
    "description": "Checked state."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "size",
    "type": "'sm' | 'base' | 'lg'",
    "required": false,
    "default": "\"base\"",
    "description": "Size preset."
  },
  {
    "prop": "variant",
    "type": "'default' | 'neutral'",
    "required": false,
    "default": "\"default\"",
    "description": "Visual variant."
  },
  {
    "prop": "label",
    "type": "string",
    "required": false,
    "description": "Visible label content."
  },
  {
    "prop": "labelTooltip",
    "type": "string | Snippet",
    "required": false,
    "description": "Optional help content for the label."
  },
  {
    "prop": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the field as required."
  },
  {
    "prop": "controlFirst",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Renders the control before label content."
  },
  {
    "prop": "transitioning",
    "type": "boolean",
    "required": false,
    "description": "transitioning prop."
  },
  {
    "prop": "id",
    "type": "string",
    "required": false,
    "description": "Element id."
  },
  {
    "prop": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible label."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "onchange",
    "type": "(checked: boolean) => void",
    "required": false,
    "description": "Change event handler."
  },
  {
    "prop": "onCheckedChange",
    "type": "(checked: boolean) => void",
    "required": false,
    "description": "Called when checked changes."
  }
];

export default rows;
