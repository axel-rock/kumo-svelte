import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Item label content."
  },
  {
    "prop": "active",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Whether this item represents the currently active section."
  },
  {
    "prop": "href",
    "type": "string",
    "required": false,
    "description": "Destination URL."
  },
  {
    "prop": "as",
    "type": "'a' | 'button'",
    "required": false,
    "default": "\"a\"",
    "description": "Svelte replacement for React's render prop when rendering a button item."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
