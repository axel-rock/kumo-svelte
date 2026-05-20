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
    "prop": "href",
    "type": "string",
    "required": false,
    "description": "Destination URL."
  },
  {
    "prop": "shape",
    "type": "'base' | 'square' | 'circle'",
    "required": false,
    "default": "\"base\"",
    "description": "Shape preset."
  },
  {
    "prop": "size",
    "type": "'xs' | 'sm' | 'base' | 'lg'",
    "required": false,
    "default": "\"base\"",
    "description": "Size preset."
  },
  {
    "prop": "variant",
    "type": "'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline'",
    "required": false,
    "default": "\"ghost\"",
    "description": "Visual variant."
  },
  {
    "prop": "icon",
    "type": "Component",
    "required": false,
    "description": "Icon rendered by the component."
  },
  {
    "prop": "external",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Opens links in a new tab with safe rel attributes."
  },
  {
    "prop": "linksExternal",
    "type": "boolean",
    "required": false,
    "description": "Treats links as external."
  }
];

export default rows;
