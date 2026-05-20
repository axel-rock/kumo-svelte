import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Cell children."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "variant",
    "type": "'default' | 'selected'",
    "required": false,
    "default": "\"default\"",
    "description": "Row visual state."
  }
];

export default rows;
