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
  <p class="mb-4">
    Chart components are built on ECharts. Install it as a dependency:
  

```bash
npm install echarts
```

<p class="my-4">
  For optimal bundle size, import only the ECharts components you need. The
  examples below show the minimum required imports for our use cases.

```tsx

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

  
    <div class="not-prose my-4 rounded-lg border border-kumo-hairline bg-kumo-canvas p-4 text-sm text-kumo-subtle">
      <p class="text-sm text-kumo-subtle">TimeseriesChartPreviewDemo</p>
    </div>

    <div class="not-prose my-4 rounded-lg border border-kumo-hairline bg-kumo-canvas p-4 text-sm text-kumo-subtle">
      <p class="text-sm text-kumo-subtle">PieChartPreviewDemo</p>
    </div>

</ComponentSection>

<ComponentSection>

## Color System

  <p class="not-prose my-4 rounded-lg border border-kumo-hairline bg-kumo-canvas p-4 text-sm text-kumo-subtle">ChartCard</p>

</ComponentSection>

<ComponentSection>

## Legend

<p class="mb-6">
  Use <code>LegendItem</code> to display chart series information with color
  indicators.

### LargeItem

<ComponentExample demo="LegendDefaultDemo" />

### SmallItem

<ComponentExample demo="LegendCompactDemo" />

</ComponentSection>

<p class="text-sm text-kumo-subtle">ChartExampleDemo</p>
