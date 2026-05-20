import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "echarts",
    "type": "any",
    "required": true,
    "description": "The ECharts core instance imported by the consumer."
  },
  {
    "prop": "options",
    "type": "KumoChartOption",
    "required": true,
    "description": "ECharts option object passed through to chart.setOption()."
  },
  {
    "prop": "optionUpdateBehavior",
    "type": "SetOptionOpts",
    "required": false,
    "description": "Additional options passed as the second argument to chart.setOption()."
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
    "description": "When true, initializes ECharts with its dark theme."
  },
  {
    "prop": "height",
    "type": "number",
    "required": false,
    "default": "350",
    "description": "Chart height in pixels."
  },
  {
    "prop": "onEvents",
    "type": "Partial<ChartEvents>",
    "required": false,
    "default": "{}",
    "description": "Subset of ECharts events to listen for."
  },
  {
    "prop": "chartRef",
    "type": "EChartsType | null",
    "required": false,
    "default": "null",
    "description": "Bindable Svelte reference to the raw ECharts instance."
  }
];

export default rows;
