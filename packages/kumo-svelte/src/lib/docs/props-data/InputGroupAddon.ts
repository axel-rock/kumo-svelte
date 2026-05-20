import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
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
    "description": "Floating alignment."
  },
  {
    "prop": "containsButton",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "containsButton prop."
  }
];

export default rows;
