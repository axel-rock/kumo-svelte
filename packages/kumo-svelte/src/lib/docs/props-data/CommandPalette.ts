import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": true,
    "description": "Child components such as Input, List, groups, items, and Footer."
  },
  {
    "prop": "value",
    "type": "string",
    "required": false,
    "description": "Controlled input value for the search."
  },
  {
    "prop": "onValueChange",
    "type": "(value: string) => void",
    "required": false,
    "description": "Called when the search value changes."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the command palette container."
  }
];

export default rows;
