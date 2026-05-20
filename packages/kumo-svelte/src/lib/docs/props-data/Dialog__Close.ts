import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "render",
    "type": "Snippet | Component",
    "required": false,
    "description": "Custom close render target."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the close control."
  }
];

export default rows;
