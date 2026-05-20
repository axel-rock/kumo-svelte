import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "layout",
    "type": "'auto' | 'fixed'",
    "required": false,
    "description": "Table layout algorithm.",
    "default": "\"auto\""
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Table section and row children."
  }
];

export default rows;
