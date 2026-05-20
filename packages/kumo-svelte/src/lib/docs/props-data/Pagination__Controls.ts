import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "controls",
    "type": "'full' | 'simple'",
    "required": false,
    "default": "\"full\"",
    "description": "Control density."
  },
  {
    "prop": "pageSelector",
    "type": "'input' | 'dropdown'",
    "required": false,
    "default": "\"input\"",
    "description": "How the page number selector is rendered in full controls mode."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
