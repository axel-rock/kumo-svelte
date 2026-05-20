import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "value",
    "type": "number",
    "required": true,
    "description": "Current page size value."
  },
  {
    "prop": "onChange",
    "type": "(size: number) => void",
    "required": true,
    "description": "Callback when page size changes."
  },
  {
    "prop": "options",
    "type": "number[]",
    "required": false,
    "description": "Available page size options."
  },
  {
    "prop": "label",
    "type": "string | Snippet",
    "required": false,
    "default": "\"Per page:\"",
    "description": "Label shown before the selector."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
