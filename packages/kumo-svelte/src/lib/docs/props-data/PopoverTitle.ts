import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the title."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Title content."
  }
];

export default rows;
