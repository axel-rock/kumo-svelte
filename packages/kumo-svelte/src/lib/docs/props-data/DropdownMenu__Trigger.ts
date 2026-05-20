import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "child",
    "type": "Snippet<[{ props: Record<string, unknown> }]>",
    "required": false,
    "description": "child prop."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "type",
    "type": "'button' | 'submit' | 'reset'",
    "required": false,
    "default": "\"button\"",
    "description": "Element or semantic type."
  }
];

export default rows;
