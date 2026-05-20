import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "trigger",
    "type": "Snippet<[Record<string, unknown>]>",
    "required": false,
    "description": "trigger prop."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "open",
    "type": "boolean",
    "required": true,
    "default": "false",
    "description": "Controlled open state."
  },
  {
    "prop": "onOpenChange",
    "type": "(open: boolean) => void",
    "required": false,
    "description": "Called when open state changes."
  },
  {
    "prop": "onBackdropClick",
    "type": "(event: MouseEvent) => void",
    "required": false,
    "description": "Called when the backdrop is clicked."
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
