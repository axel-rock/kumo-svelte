import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Link label content."
  },
  {
    "prop": "href",
    "type": "string",
    "required": true,
    "description": "Destination URL."
  },
  {
    "prop": "icon",
    "type": "Component",
    "required": false,
    "description": "Icon component rendered before the label."
  }
];

export default rows;
