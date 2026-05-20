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
    "type": "'start' | 'center' | 'end'",
    "required": false,
    "default": "\"start\"",
    "description": "Alignment of the popup relative to the trigger."
  },
  {
    "prop": "alignOffset",
    "type": "number | string",
    "required": false,
    "description": "Offset along the alignment axis."
  },
  {
    "prop": "side",
    "type": "'top' | 'right' | 'bottom' | 'left'",
    "required": false,
    "default": "\"bottom\"",
    "description": "Side of the trigger where the popup is placed."
  },
  {
    "prop": "sideOffset",
    "type": "number | string",
    "required": false,
    "default": "4",
    "description": "Offset between the popup and the trigger."
  }
];

export default rows;
