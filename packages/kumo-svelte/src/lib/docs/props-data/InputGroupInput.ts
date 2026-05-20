import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "value",
    "type": "string | number",
    "required": false,
    "default": "\"\"",
    "description": "Controlled value."
  },
  {
    "prop": "onValueChange",
    "type": "(value: string) => void",
    "required": false,
    "description": "Called when the value changes."
  },
  {
    "prop": "oninput",
    "type": "(event: Event) => void",
    "required": false,
    "description": "Input event handler."
  },
  {
    "prop": "id",
    "type": "string",
    "required": false,
    "description": "Element id."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the component."
  }
];

export default rows;
