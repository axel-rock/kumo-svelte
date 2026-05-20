import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "size",
    "type": "'sm' | 'base' | 'lg' | number",
    "required": false,
    "description": "Size preset.",
    "default": "\"base\""
  },
  {
    "prop": "aria-label",
    "type": "string",
    "required": false,
    "default": "\"Loading\"",
    "description": "Accessible label."
  }
];

export default rows;
