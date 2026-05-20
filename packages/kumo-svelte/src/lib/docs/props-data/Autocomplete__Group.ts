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
    "prop": "items",
    "type": "AutocompleteItem[]",
    "required": false,
    "default": "[]",
    "description": "Items rendered by the component."
  }
];

export default rows;
