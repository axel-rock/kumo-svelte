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
    "prop": "keepMounted",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "keepMounted prop."
  },
  {
    "prop": "forceMount",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "forceMount prop."
  },
  {
    "prop": "hiddenUntilFound",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "hiddenUntilFound prop."
  }
];

export default rows;
