import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Branch nodes rendered inside the parallel group."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "align",
    "type": "'start' | 'end'",
    "required": false,
    "default": "\"start\"",
    "description": "Controls alignment of nodes within the parallel group."
  }
];

export default rows;
