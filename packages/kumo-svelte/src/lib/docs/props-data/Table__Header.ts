import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Header row children."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "variant",
    "type": "'default' | 'compact'",
    "required": false,
    "default": "\"default\"",
    "description": "Header density variant."
  },
  {
    "prop": "sticky",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Make the header row stick to the top of the scroll container."
  }
];

export default rows;
