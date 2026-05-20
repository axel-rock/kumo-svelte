import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "title",
    "type": "string",
    "required": true,
    "description": "Item title text."
  },
  {
    "prop": "breadcrumbs",
    "type": "string[]",
    "required": false,
    "description": "Optional breadcrumb path parts displayed before the title."
  },
  {
    "prop": "titleHighlights",
    "type": "[number, number][]",
    "required": false,
    "description": "Inclusive highlight ranges for the title."
  },
  {
    "prop": "breadcrumbHighlights",
    "type": "[number, number][][]",
    "required": false,
    "description": "Inclusive highlight ranges for each breadcrumb."
  },
  {
    "prop": "description",
    "type": "string",
    "required": false,
    "description": "Optional description displayed after the title."
  },
  {
    "prop": "icon",
    "type": "Snippet",
    "required": false,
    "description": "Optional icon displayed before the title."
  },
  {
    "prop": "value",
    "type": "unknown",
    "required": true,
    "description": "The value associated with this item."
  },
  {
    "prop": "onclick",
    "type": "(event?: MouseEvent) => void",
    "required": false,
    "description": "Selection handler for the item."
  },
  {
    "prop": "showArrow",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Whether to show the arrow indicator."
  },
  {
    "prop": "external",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Whether this links to an external URL."
  },
  {
    "prop": "nonInteractive",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Renders the item without interactive selection behavior."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the item."
  }
];

export default rows;
