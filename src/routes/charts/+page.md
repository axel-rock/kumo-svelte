---
title: "Charts"
description: "Charts built on ECharts."
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

<ComponentExample demo="TimeseriesChartPreviewDemo" />

<ComponentExample demo="PieChartPreviewDemo" />

</ComponentSection>

<ComponentSection>

## Color System

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

<ComponentExample demo="ChartExampleDemo" />
