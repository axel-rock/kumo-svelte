import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Flow nodes and parallel groups rendered inside the diagram."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "orientation",
    "type": "FlowOrientation",
    "required": false,
    "default": "\"horizontal\"",
    "description": "Diagram orientation. Vertical orientation is currently a no-op."
  },
  {
    "prop": "align",
    "type": "'start' | 'center'",
    "required": false,
    "default": "\"start\"",
    "description": "Controls vertical alignment of nodes in horizontal orientation."
  },
  {
    "prop": "canvas",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Whether to render the scrollable canvas wrapper."
  },
  {
    "prop": "padding",
    "type": "{ x?: number; y?: number }",
    "required": false,
    "description": "Padding around the diagram content within the canvas."
  },
  {
    "prop": "onOverflowChange",
    "type": "(overflow: { x: boolean; y: boolean }) => void",
    "required": false,
    "description": "Callback fired when canvas overflow changes on either axis."
  }
];

export default rows;
