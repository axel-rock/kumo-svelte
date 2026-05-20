import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Body cell content."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "sticky",
    "type": "'left' | 'right'",
    "required": false,
    "description": "Pin this cell to the left or right edge of the scroll container."
  }
];

export default rows;
