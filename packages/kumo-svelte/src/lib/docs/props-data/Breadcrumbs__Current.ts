import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Current page label content."
  },
  {
    "prop": "icon",
    "type": "Component",
    "required": false,
    "description": "Icon component rendered before the label."
  },
  {
    "prop": "loading",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Shows a skeleton placeholder instead of the label."
  }
];

export default rows;
