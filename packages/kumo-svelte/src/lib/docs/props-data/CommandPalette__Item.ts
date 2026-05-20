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
    "prop": "value",
    "type": "unknown",
    "required": true,
    "description": "The value associated with this item."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the component."
  },
  {
    "prop": "onclick",
    "type": "(event: MouseEvent) => void",
    "required": false,
    "description": "Click handler for selection."
  }
];

export default rows;
