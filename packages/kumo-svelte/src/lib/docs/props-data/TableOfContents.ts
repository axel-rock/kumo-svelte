import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the nav element."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "TableOfContents.Title and TableOfContents.List children."
  },
  {
    "prop": "aria-label",
    "type": "string",
    "required": false,
    "default": "\"Table of contents\"",
    "description": "Accessible label for the nav landmark."
  }
];

export default rows;
