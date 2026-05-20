import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "echarts",
    "type": "any",
    "required": true,
    "description": "The ECharts core instance imported by the consumer."
  },
  {
    "prop": "nodes",
    "type": "SankeyNodeData[]",
    "required": true,
    "description": "Array of nodes in the Sankey diagram."
  },
  {
    "prop": "links",
    "type": "SankeyLinkData[]",
    "required": true,
    "description": "Array of links connecting nodes by index."
  },
  {
    "prop": "height",
    "type": "number",
    "required": false,
    "default": "400",
    "description": "Chart height in pixels."
  },
  {
    "prop": "showNodeValues",
    "type": "boolean",
    "required": false,
    "description": "Show node values above labels. Defaults to true when any node has a value."
  },
  {
    "prop": "formatValue",
    "type": "(value: number) => string",
    "required": false,
    "description": "Format function for node and link values."
  },
  {
    "prop": "tooltipFormatter",
    "type": "(params: SankeyTooltipParams) => string",
    "required": false,
    "description": "Custom tooltip formatter. Return an HTML string or empty string."
  },
  {
    "prop": "nodeWidth",
    "type": "number",
    "required": false,
    "default": "8",
    "description": "Width of each Sankey node in pixels."
  },
  {
    "prop": "nodePadding",
    "type": "number",
    "required": false,
    "default": "10",
    "description": "Vertical gap between Sankey nodes."
  },
  {
    "prop": "showTooltip",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Whether to show Sankey tooltips."
  },
  {
    "prop": "defaultNodeColor",
    "type": "string",
    "required": false,
    "description": "Fallback color used for nodes without their own color."
  },
  {
    "prop": "left",
    "type": "number | string",
    "required": false,
    "description": "Left padding of the Sankey layout within the chart container."
  },
  {
    "prop": "right",
    "type": "number | string",
    "required": false,
    "description": "Right padding of the Sankey layout within the chart container."
  },
  {
    "prop": "linkColor",
    "type": "'gradient' | 'gray'",
    "required": false,
    "default": "\"gradient\"",
    "description": "Link fill style: gradient blends source to target colors, gray uses flat gray."
  },
  {
    "prop": "linkOpacity",
    "type": "number",
    "required": false,
    "default": "0.5",
    "description": "Opacity used for gradient links."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "isDarkMode",
    "type": "boolean",
    "required": false,
    "description": "When true, switches chart labels and palette choices for dark mode."
  },
  {
    "prop": "onNodeClick",
    "type": "(node: SankeyNodeData) => void",
    "required": false,
    "description": "Callback fired when a Sankey node is clicked."
  },
  {
    "prop": "onLinkClick",
    "type": "(link: SankeyLinkData) => void",
    "required": false,
    "description": "Callback fired when a Sankey link is clicked."
  }
];

export default rows;
