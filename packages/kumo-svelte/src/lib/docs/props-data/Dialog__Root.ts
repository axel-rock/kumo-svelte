import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "role",
    "type": "'dialog' | 'alertdialog'",
    "required": false,
    "default": "\"dialog\"",
    "description": "ARIA role for the dialog."
  },
  {
    "prop": "open",
    "type": "boolean",
    "required": false,
    "description": "Controlled open state."
  },
  {
    "prop": "defaultOpen",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Initial open state for uncontrolled usage."
  },
  {
    "prop": "onOpenChange",
    "type": "(open: boolean) => void",
    "required": false,
    "description": "Called when the open state changes."
  },
  {
    "prop": "modal",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Whether the dialog is modal."
  },
  {
    "prop": "dismissible",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Whether the dialog can be dismissed."
  }
];

export default rows;
