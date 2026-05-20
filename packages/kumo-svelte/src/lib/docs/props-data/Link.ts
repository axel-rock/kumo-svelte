import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "variant",
    "type": "'inline' | 'current' | 'plain'",
    "required": false,
    "default": "\"inline\"",
    "description": "Visual style of the link."
  },
  {
    "prop": "href",
    "type": "string",
    "required": false,
    "description": "Link destination."
  },
  {
    "prop": "to",
    "type": "string",
    "required": false,
    "description": "Deprecated routing destination. Use href instead."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Content rendered inside the link."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
