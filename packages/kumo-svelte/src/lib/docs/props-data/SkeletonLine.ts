import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "minWidth",
    "type": "number",
    "required": false,
    "default": "30",
    "description": "minWidth prop."
  },
  {
    "prop": "maxWidth",
    "type": "number",
    "required": false,
    "default": "100",
    "description": "maxWidth prop."
  },
  {
    "prop": "minDuration",
    "type": "number",
    "required": false,
    "default": "1.3",
    "description": "minDuration prop."
  },
  {
    "prop": "maxDuration",
    "type": "number",
    "required": false,
    "default": "1.7",
    "description": "maxDuration prop."
  },
  {
    "prop": "minDelay",
    "type": "number",
    "required": false,
    "default": "0",
    "description": "minDelay prop."
  },
  {
    "prop": "maxDelay",
    "type": "number",
    "required": false,
    "default": "0.5",
    "description": "maxDelay prop."
  },
  {
    "prop": "blockHeight",
    "type": "string | number",
    "required": false,
    "description": "blockHeight prop."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
