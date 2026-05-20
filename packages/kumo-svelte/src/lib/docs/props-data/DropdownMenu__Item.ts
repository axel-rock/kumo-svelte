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
    "prop": "inset",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Indents the item content."
  },
  {
    "prop": "icon",
    "type": "Component",
    "required": false,
    "description": "Icon rendered by the component."
  },
  {
    "prop": "selected",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Shows a trailing selected check indicator."
  },
  {
    "prop": "variant",
    "type": "'default' | 'danger'",
    "required": false,
    "description": "Visual variant.",
    "default": "\"default\""
  },
  {
    "prop": "href",
    "type": "string",
    "required": false,
    "description": "Deprecated destination URL for legacy link items."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the component."
  }
];

export default rows;
