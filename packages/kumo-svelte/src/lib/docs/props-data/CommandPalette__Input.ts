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
    "type": "string",
    "required": false,
    "default": "\"\"",
    "description": "Controlled value."
  },
  {
    "prop": "placeholder",
    "type": "string",
    "required": false,
    "default": "\"Type a command...\"",
    "description": "Placeholder text."
  },
  {
    "prop": "leading",
    "type": "Snippet",
    "required": false,
    "description": "Optional leading content such as a back button."
  },
  {
    "prop": "trailing",
    "type": "Snippet",
    "required": false,
    "description": "Optional trailing content such as an Escape key hint."
  }
];

export default rows;
