import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "size",
    "type": "'sm' | 'base' | 'lg' | 'xl'",
    "required": false,
    "default": "\"base\"",
    "description": "Dialog width preset."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the dialog content."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": true,
    "description": "Dialog content, typically title, description, close, and action buttons."
  },
  {
    "prop": "style",
    "type": "string",
    "required": false,
    "description": "Inline styles for the dialog content."
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
