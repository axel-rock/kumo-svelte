import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "variant",
    "type": "'glyph' | 'full'",
    "required": false,
    "description": "Visual variant.",
    "default": "\"full\""
  },
  {
    "prop": "color",
    "type": "'color' | 'black' | 'white'",
    "required": false,
    "description": "Color scheme.",
    "default": "\"color\""
  }
];

export default rows;
