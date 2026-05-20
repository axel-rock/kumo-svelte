import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Anchor content rendered inside the default div."
  },
  {
    "prop": "type",
    "type": "'start' | 'end'",
    "required": false,
    "description": "Whether the anchor serves as the start point for the next connector or the end point for the previous connector."
  }
];

export default rows;
