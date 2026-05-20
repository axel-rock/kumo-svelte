import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "color",
    "type": "'color' | 'black' | 'white'",
    "required": false,
    "default": "\"color\"",
    "description": "Color scheme for the logo and text."
  },
  {
    "prop": "href",
    "type": "string",
    "required": false,
    "default": "\"https://www.cloudflare.com\"",
    "description": "Destination URL."
  }
];

export default rows;
