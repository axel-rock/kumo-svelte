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
    "prop": "sideOffset",
    "type": "number",
    "required": false,
    "default": "8",
    "description": "Distance from the anchor."
  },
  {
    "prop": "side",
    "type": "'top' | 'right' | 'bottom' | 'left'",
    "required": false,
    "description": "Preferred floating side."
  },
  {
    "prop": "align",
    "type": "'start' | 'center' | 'end'",
    "required": false,
    "description": "Floating alignment."
  },
  {
    "prop": "container",
    "type": "HTMLElement | string",
    "required": false,
    "default": "document.body",
    "description": "Portal container for custom roots or Shadow DOM."
  }
];

export default rows;
