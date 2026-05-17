---
title: "Charts"
description: "Composable chart primitives built on ECharts."
sourceFile: "components/chart"
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>


<ComponentSection>

Chart components are built on ECharts. Install it as a dependency:

```bash
npm install echarts
```

For optimal bundle size, import only the ECharts components you need. The
examples below show the minimum required imports for our use cases.

```svelte
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  AxisPointerComponent,
  BrushComponent,
  GridComponent,
  TooltipComponent,
  CanvasRenderer,
  AriaComponent,
]);
```

</ComponentSection>

<ComponentSection>

## Available Charts

Kumo exposes a low-level `Chart` wrapper for custom ECharts options, plus
specialized chart components for common dashboard patterns.

### Timeseries

Use `TimeseriesChart` for line and bar charts over time. It includes accessible
chart labels, tooltips, loading states, incomplete data styling and optional
range brushing.

<ComponentExample demo="TimeseriesChartPreviewDemo" />

### Sankey

Use `SankeyChart` when showing flow between systems, resources or account
boundaries.

<ComponentExample demo="SankeyChartPreviewDemo" />

### Custom ECharts

<ComponentExample demo="PieChartPreviewDemo" />

</ComponentSection>

<ComponentSection>

## Color System

Chart colors are split into semantic, categorical and sequential systems. Use
semantic colors only when the data has status-like meaning; otherwise use the
categorical palette for nominal series and sequential scales for density.

<ComponentExample demo="ChartColorSystemsDemo" />

</ComponentSection>

<ComponentSection>

## Legend

Use `LegendItem` to display chart series information with color indicators.

### LargeItem

<ComponentExample demo="LegendDefaultDemo" />

### SmallItem

<ComponentExample demo="LegendCompactDemo" />

</ComponentSection>

<ComponentSection>

## Composition

Combine `ChartLegend`, `LayerCard` and chart primitives to build dashboard
panels without changing the chart API.

<ComponentExample demo="ChartExampleDemo" />

</ComponentSection>

<ComponentSection>

## API Reference

### Chart

<PropsTable component="Chart" />

### TimeseriesChart

<PropsTable component="TimeseriesChart" />

### ChartLegend

<PropsTable component="ChartLegend" />

</ComponentSection>
