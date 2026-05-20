import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "size",
    "type": "'sm' | 'base'",
    "required": false,
    "description": "Size of the breadcrumbs.",
    "default": "\"base\""
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Breadcrumbs.Link, Breadcrumbs.Separator, Breadcrumbs.Current, and Breadcrumbs.Clipboard children."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the nav element."
  }
];

export default rows;
