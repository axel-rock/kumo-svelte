import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet<[{ page: number; perPage?: number; totalCount?: number; pageShowingRange: string }]>",
    "required": false,
    "description": "Custom render snippet for the info text."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
];

export default rows;
