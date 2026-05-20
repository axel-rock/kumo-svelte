import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "as",
    "type": "string",
    "required": false,
    "default": "\"div\"",
    "description": "Deprecated element override. Prefer LayerCard for new code."
  },
  {
    "prop": "color",
    "type": "'primary' | 'secondary'",
    "required": false,
    "default": "\"primary\"",
    "description": "Surface color variant."
  }
];

export default rows;
