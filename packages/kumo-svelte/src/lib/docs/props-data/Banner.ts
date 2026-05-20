import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "icon",
    "type": "Component",
    "required": false,
    "description": "Icon rendered before the banner content."
  },
  {
    "prop": "title",
    "type": "string",
    "required": false,
    "description": "Primary heading text for the banner."
  },
  {
    "prop": "description",
    "type": "string | Snippet",
    "required": false,
    "description": "Secondary description content displayed below the title."
  },
  {
    "prop": "action",
    "type": "Snippet",
    "required": false,
    "description": "Action snippet rendered at the trailing end in structured mode."
  },
  {
    "prop": "text",
    "type": "string",
    "required": false,
    "description": "Deprecated simple banner text. Prefer title and description."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Deprecated simple banner content. Prefer title and description."
  },
  {
    "prop": "variant",
    "type": "'default' | 'alert' | 'error'",
    "required": false,
    "default": "\"default\"",
    "description": "Visual style of the banner."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
