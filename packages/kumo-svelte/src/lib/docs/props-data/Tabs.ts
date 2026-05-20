import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "tabs",
    "type": "TabsItem[]",
    "required": false,
    "description": "Array of tab items to render."
  },
  {
    "prop": "value",
    "type": "string",
    "required": false,
    "description": "Controlled value."
  },
  {
    "prop": "selectedValue",
    "type": "string",
    "required": false,
    "description": "Default selected value for uncontrolled mode. Ignored when value is set."
  },
  {
    "prop": "onValueChange",
    "type": "(value: string) => void",
    "required": false,
    "description": "Called when the value changes."
  },
  {
    "prop": "activateOnFocus",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "When true, tabs are activated immediately upon receiving focus via arrow keys."
  },
  {
    "prop": "variant",
    "type": "'segmented' | 'underline'",
    "required": false,
    "description": "Tab style.",
    "default": "\"segmented\""
  },
  {
    "prop": "size",
    "type": "'base' | 'sm'",
    "required": false,
    "description": "Tab size.",
    "default": "\"base\""
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "listClassName",
    "type": "string",
    "required": false,
    "description": "Additional classes for the tab list element."
  },
  {
    "prop": "indicatorClassName",
    "type": "string",
    "required": false,
    "description": "Additional classes for the indicator element."
  }
];

export default rows;
