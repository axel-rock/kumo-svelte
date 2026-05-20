import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the nav element."
  },
  {
    "prop": "isActive",
    "type": "number | boolean | string",
    "required": true,
    "description": "Currently active option value, matched against the option index or id."
  },
  {
    "prop": "options",
    "type": "MenuOptionProps[]",
    "required": true,
    "description": "Array of menu option configurations."
  },
  {
    "prop": "optionIds",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "When true, each option's id is used for active matching instead of its array index."
  }
];

export default rows;
