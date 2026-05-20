import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Nested TableOfContents.Item children."
  },
  {
    "prop": "label",
    "type": "string",
    "required": true,
    "description": "Label displayed above the group's items."
  },
  {
    "prop": "href",
    "type": "string",
    "required": false,
    "description": "URL the group label links to. When provided, the label renders as a clickable link."
  },
  {
    "prop": "active",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Whether this group's label represents the currently active section. Only applies when href is provided."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
