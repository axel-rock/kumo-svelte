import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
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
    "prop": "onCheckedChange",
    "type": "(checked: boolean) => void",
    "required": false,
    "description": "Called when checked changes."
  }
];

export default rows;
