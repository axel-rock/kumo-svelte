import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "variant",
    "type": "'large' | 'small'",
    "required": false,
    "default": "\"small\"",
    "description": "Svelte variant matching the upstream SmallItem or LargeItem legend layouts."
  },
  {
    "prop": "name",
    "type": "string",
    "required": true,
    "description": "Series name shown as a label."
  },
  {
    "prop": "color",
    "type": "string",
    "required": true,
    "description": "Hex color string for the series indicator dot."
  },
  {
    "prop": "value",
    "type": "string",
    "required": true,
    "description": "Formatted value string to display."
  },
  {
    "prop": "unit",
    "type": "string",
    "required": false,
    "description": "Optional unit label shown after the value."
  },
  {
    "prop": "inactive",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Renders the item at reduced opacity to indicate a deselected state."
  }
];

export default rows;
