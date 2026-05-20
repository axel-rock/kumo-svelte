import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
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
    "default": "false",
    "description": "Whether the popover is modal."
  }
];

export default rows;
