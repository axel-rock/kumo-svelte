import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the description."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Description content."
  }
];

export default rows;
