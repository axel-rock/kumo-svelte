import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "child",
    "type": "Snippet<[{ props: Record<string, unknown> }]>",
    "required": false,
    "description": "Custom trigger render target."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Trigger content."
  }
];

export default rows;
