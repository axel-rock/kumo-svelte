<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import type { EChartsOption } from 'echarts';
  import { Chart, ChartLegend, ChartPalette, LayerCard, SankeyChart, TimeseriesChart } from '$lib';

  interface Props {
    demo: string;
  }

  let { demo }: Props = $props();
  let isDarkMode = $state(false);
  let selectedRange = $state<string | null>(null);

  onMount(() => {
    const update = () => {
      isDarkMode = document.documentElement.getAttribute('data-mode') === 'dark';
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });
    return () => observer.disconnect();
  });

  const buildSeriesData = (seed = 0, points = 50, stepMs = 60_000, timeScale = 1): [number, number][] => {
    const end = Date.now();
    const start = end - (points - 1) * stepMs;
    return Array.from({ length: points }, (_, i) => {
      const ts = start + i * stepMs;
      const trend = i * 0.15;
      const wave = Math.sin((i + seed) / 4) * 8;
      const value = Math.round((30 + seed * 15 + trend + wave) * 100) / 100;
      return [ts, value * timeScale];
    });
  };

  const baseTimeseries = (scale = 1) => [
    { name: 'Requests', data: buildSeriesData(0, 50, 60_000, scale), color: ChartPalette.semantic('Neutral', isDarkMode) },
    { name: 'Errors', data: buildSeriesData(1, 50, 60_000, scale * 0.3), color: ChartPalette.semantic('Attention', isDarkMode) }
  ];

  const pieOptions = (count = 5): EChartsOption => ({
    animation: true,
    animationDuration: 1600,
    animationEasing: 'cubicOut',
    tooltip: { show: true },
    series: [
      {
        type: 'pie',
        radius: count > 3 ? ['35%', '70%'] : '70%',
        data: [
          { value: 101, name: 'Series A' },
          { value: 202, name: 'Series B' },
          { value: 303, name: 'Series C' },
          { value: 404, name: 'Series D' },
          { value: 505, name: 'Series E' }
        ].slice(0, count)
      }
    ]
  });

  const sankeyNodes = $derived([
    { name: 'Users', value: 103600, color: ChartPalette.categorical(0, isDarkMode) },
    { name: 'Networks', value: 84100, color: ChartPalette.categorical(1, isDarkMode) },
    { name: 'Devices', value: 50800, color: ChartPalette.categorical(2, isDarkMode) },
    { name: 'Other', value: 2000, color: ChartPalette.categorical(3, isDarkMode) },
    { name: 'Apps', value: 122600, color: ChartPalette.categorical(4, isDarkMode) },
    { name: 'Tunnels', value: 87800, color: ChartPalette.categorical(5, isDarkMode) },
    { name: 'BYOIP', value: 29500, color: ChartPalette.categorical(0, isDarkMode) },
    { name: 'Other Target', value: 600, color: ChartPalette.categorical(1, isDarkMode) }
  ]);

  const sankeyLinks = [
    { source: 0, target: 4, value: 80000 },
    { source: 0, target: 5, value: 20000 },
    { source: 0, target: 6, value: 3600 },
    { source: 1, target: 4, value: 30000 },
    { source: 1, target: 5, value: 50000 },
    { source: 1, target: 6, value: 4100 },
    { source: 2, target: 4, value: 10000 },
    { source: 2, target: 5, value: 15000 },
    { source: 2, target: 6, value: 20000 },
    { source: 2, target: 7, value: 5800 },
    { source: 3, target: 5, value: 1400 },
    { source: 3, target: 7, value: 600 }
  ];

  const categoricalLineOptions = $derived<EChartsOption>({
    animation: true,
    animationDuration: 900,
    animationEasing: 'cubicOut',
    color: Array.from({ length: 6 }, (_, index) => ChartPalette.categorical(index, isDarkMode)),
    tooltip: { trigger: 'axis' },
    grid: { left: 32, right: 16, top: 20, bottom: 24 },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed' } } },
    series: Array.from({ length: 6 }, (_, index) => ({
      name: `Region ${index + 1}`,
      type: 'line',
      showSymbol: false,
      lineStyle: { type: index % 3 === 1 ? 'dashed' : index % 3 === 2 ? 'dotted' : 'solid' },
      data: [21, 34, 28, 45, 38, 52, 49].map((value, i) => value + index * 8 + Math.sin(i + index) * 7)
    }))
  });

  const categoricalBarOptions = $derived<EChartsOption>({
    animation: true,
    animationDuration: 900,
    animationEasing: 'cubicOut',
    color: ['Success', 'Attention', 'Neutral', 'Warning', 'Disabled'].map((name) => ChartPalette.semantic(name as any, isDarkMode)),
    tooltip: { trigger: 'axis' },
    grid: { left: 32, right: 16, top: 20, bottom: 24 },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed' } } },
    series: ['Hit', 'Miss', 'Bypass', 'Expired', 'Other'].map((name, index) => ({
      name,
      type: 'bar',
      stack: 'total',
      data: [32, 42, 36, 48, 41].map((value) => Math.max(4, value - index * 6))
    }))
  });

  const heatmapOptions = $derived<EChartsOption>({
    animation: true,
    animationDuration: 700,
    animationEasing: 'cubicOut',
    tooltip: {},
    grid: { left: 48, right: 16, top: 20, bottom: 36 },
    xAxis: { type: 'category', data: ['00', '04', '08', '12', '16', '20'] },
    yAxis: { type: 'category', data: ['SFO', 'LHR', 'AMS', 'SIN', 'IAD'] },
    visualMap: { min: 0, max: 100, show: false, inRange: { color: ChartPalette.sequential('blues', isDarkMode) } },
    series: [
      {
        type: 'heatmap',
        data: Array.from({ length: 30 }, (_, i) => [i % 6, Math.floor(i / 6), Math.round(20 + Math.sin(i) * 20 + i * 2)])
      }
    ]
  });

  const semanticColorNames = ['Attention', 'Warning', 'Success', 'Neutral', 'Disabled'] as const;
  const categoricalCvdColors = ['#2F7ED8', '#B68A00', '#CC79A7', '#7F3FBF', '#009E73', '#A66400'];

  const is = (name: string) => demo === name;
</script>

<div class="w-full">
  {#if is('BasicLineChartDemo')}
    <TimeseriesChart {echarts} isDarkMode={isDarkMode} data={baseTimeseries()} xAxisName="Time (UTC)" yAxisName="Count" animationDuration={900} />
  {:else if is('CustomAxisLabelFormatDemo')}
    <TimeseriesChart
      {echarts}
      isDarkMode={isDarkMode}
      data={[{ name: 'Requests', data: buildSeriesData(0, 50, 60_000, 1000), color: ChartPalette.semantic('Neutral', isDarkMode) }]}
      xAxisName="Time (UTC)"
      yAxisName="Requests"
      xAxisTickFormat={(ts) => `${new Date(ts).getHours().toString().padStart(2, '0')}:${new Date(ts).getMinutes().toString().padStart(2, '0')}`}
      yAxisTickFormat={(value) => (value >= 1000 ? `${value / 1000}k` : `${value}`)}
      tooltipValueFormat={(value) => `${(value / 1000).toFixed(1)}k requests`}
    />
  {:else if is('GradientLineChartDemo')}
    <TimeseriesChart {echarts} isDarkMode={isDarkMode} data={baseTimeseries()} xAxisName="Time (UTC)" yAxisName="Count" gradient />
  {:else if is('IncompleteDataChartDemo')}
    {@const data = [{ name: 'Bandwidth', data: buildSeriesData(0, 50, 60_000, 1), color: ChartPalette.categorical(0, isDarkMode) }]}
    <TimeseriesChart {echarts} isDarkMode={isDarkMode} {data} xAxisName="Time (UTC)" yAxisName="Mbps" incomplete={{ after: data[0].data[data[0].data.length - 5][0] }} />
  {:else if is('TimeRangeSelectionChartDemo')}
    <div class="space-y-3">
      <TimeseriesChart
        {echarts}
        isDarkMode={isDarkMode}
        data={[{ name: 'CPU Usage', data: buildSeriesData(0, 50, 60_000, 1), color: ChartPalette.categorical(0, isDarkMode) }]}
        xAxisName="Time (UTC)"
        yAxisName="%"
        onTimeRangeChange={(from, to) => (selectedRange = `${new Date(from).toLocaleString()} - ${new Date(to).toLocaleString()}`)}
      />
      {#if selectedRange}<p class="text-sm text-kumo-subtle">Selected range: {selectedRange}</p>{/if}
    </div>
  {:else if is('BarChartDemo')}
    <TimeseriesChart {echarts} isDarkMode={isDarkMode} type="bar" data={baseTimeseries()} xAxisName="Time (UTC)" yAxisName="Count" tooltipValueFormat={(value) => value.toFixed(2)} />
  {:else if is('LoadingChartDemo')}
    <TimeseriesChart {echarts} isDarkMode={isDarkMode} xAxisName="Time (UTC)" yAxisName="Count" data={[]} loading />
  {:else if is('TimeseriesChartPreviewDemo')}
    <TimeseriesChart {echarts} isDarkMode={isDarkMode} data={baseTimeseries()} height={160} yAxisTickCount={2} />
  {:else if is('PieChartDemo')}
    <Chart {echarts} options={pieOptions()} height={400} isDarkMode={isDarkMode} />
  {:else if is('PieChartPreviewDemo')}
    <Chart {echarts} options={pieOptions(3)} height={160} isDarkMode={isDarkMode} />
  {:else if is('CustomTooltipChartDemo')}
    <Chart
      {echarts}
      isDarkMode={isDarkMode}
      height={400}
      options={{
        animation: true,
        animationDuration: 1200,
        animationEasing: 'cubicOut',
        tooltip: {
          trigger: 'item',
          dangerousHtmlFormatter: (params: any) => `<div style="padding:8px"><div style="font-weight:600;margin-bottom:4px;">${echarts.format.encodeHTML(params.name)}</div><div>Value: <strong>${echarts.format.encodeHTML(String(params.value))}</strong></div></div>`
        },
        series: [{ type: 'pie', data: [{ value: 101, name: 'Series A' }, { value: 202, name: 'Series B' }, { value: 150, name: '<img src=x onerror=alert("XSS")>' }, { value: 303, name: 'Series C' }, { value: 404, name: 'Series D' }] }]
      }}
    />
  {:else if is('LegendDefaultDemo')}
    <div class="space-y-4">
      <h3 class="text-sm font-medium">Active State</h3>
      <div class="flex flex-wrap gap-4 divide-x divide-kumo-hairline">
        <ChartLegend variant="large" name="Requests" color={ChartPalette.semantic('Neutral', isDarkMode)} value="1,234" unit="req/s" />
        <ChartLegend variant="large" name="Storage" color={ChartPalette.semantic('Attention', isDarkMode)} value="56" unit="GB" />
        <ChartLegend variant="large" name="Warnings" color={ChartPalette.semantic('Warning', isDarkMode)} value="128" />
      </div>
      <h3 class="mt-12 text-sm font-medium">Inactive State</h3>
      <div class="flex flex-wrap gap-4 divide-x divide-kumo-hairline">
        <ChartLegend variant="large" name="Requests" color={ChartPalette.semantic('Neutral', isDarkMode)} value="1,234" unit="req/s" inactive />
        <ChartLegend variant="large" name="Storage" color={ChartPalette.semantic('Attention', isDarkMode)} value="56" unit="GB" inactive />
        <ChartLegend variant="large" name="Warnings" color={ChartPalette.semantic('Warning', isDarkMode)} value="128" inactive />
      </div>
    </div>
  {:else if is('LegendCompactDemo')}
    <div class="space-y-4">
      <h3 class="text-sm font-medium">Active State</h3>
      <div class="flex flex-wrap gap-4">
        <ChartLegend name="Requests" color={ChartPalette.semantic('Neutral', isDarkMode)} value="1,234" unit="req/s" />
        <ChartLegend name="Storage" color={ChartPalette.semantic('Attention', isDarkMode)} value="56" unit="GB" />
        <ChartLegend name="Warnings" color={ChartPalette.semantic('Warning', isDarkMode)} value="128" />
      </div>
      <h3 class="mt-12 text-sm font-medium">Inactive State</h3>
      <div class="flex flex-wrap gap-4">
        <ChartLegend name="Requests" color={ChartPalette.semantic('Neutral', isDarkMode)} value="1,234" unit="req/s" inactive />
        <ChartLegend name="Storage" color={ChartPalette.semantic('Attention', isDarkMode)} value="56" unit="GB" inactive />
        <ChartLegend name="Warnings" color={ChartPalette.semantic('Warning', isDarkMode)} value="128" inactive />
      </div>
    </div>
  {:else if is('ChartExampleDemo')}
    <LayerCard>
      <div class="p-4">
        <div class="text-sm text-kumo-subtle">Read latency</div>
        <div class="mb-2 flex gap-4 divide-x divide-kumo-hairline px-2">
          <ChartLegend variant="large" name="P99" color={ChartPalette.semantic('Attention', isDarkMode)} value="124" unit="ms" />
          <ChartLegend variant="large" name="P95" color={ChartPalette.semantic('Warning', isDarkMode)} value="76" unit="ms" />
          <ChartLegend variant="large" name="P75" color={ChartPalette.semantic('Neutral', isDarkMode)} value="32" unit="ms" />
        </div>
        <TimeseriesChart {echarts} isDarkMode={isDarkMode} data={baseTimeseries()} height={300} animationDuration={900} />
      </div>
    </LayerCard>
  {:else if is('SankeyChartBasicDemo')}
    <SankeyChart {echarts} nodes={sankeyNodes} links={sankeyLinks} height={350} isDarkMode={isDarkMode} />
  {:else if is('SankeyChartPreviewDemo')}
    <SankeyChart {echarts} nodes={sankeyNodes.slice(0, 5)} links={sankeyLinks.slice(0, 5)} height={200} showTooltip={false} isDarkMode={isDarkMode} />
  {:else if is('SankeyChartMultiLevelDemo')}
    <SankeyChart {echarts} nodes={sankeyNodes.slice(0, 6)} links={sankeyLinks.slice(0, 8)} height={350} nodeWidth={20} nodePadding={15} isDarkMode={isDarkMode} />
  {:else if is('SankeyChartFullWidthDemo')}
    <SankeyChart {echarts} nodes={sankeyNodes} links={sankeyLinks} height={300} left={0} right={0} isDarkMode={isDarkMode} />
  {:else if is('SankeyChartTooltipDemo') || is('SankeyChartRichTooltipDemo')}
    <SankeyChart {echarts} nodes={sankeyNodes} links={sankeyLinks} height={350} isDarkMode={isDarkMode} tooltipFormatter={(params) => `<strong>${params.name}</strong><br/>${params.type === 'link' ? params.link?.value.toLocaleString() : params.node?.value?.toLocaleString() ?? ''}`} />
  {:else if is('SankeyChartInteractiveDemo') || is('SankeyChartDrillDownDemo')}
    <SankeyChart {echarts} nodes={sankeyNodes} links={sankeyLinks} height={350} isDarkMode={isDarkMode} onNodeClick={(node) => (selectedRange = `Node: ${node.name}`)} onLinkClick={(link) => (selectedRange = `Link: ${link.source} -> ${link.target}`)} />
    {#if selectedRange}<p class="mt-3 text-sm text-kumo-subtle">{selectedRange}</p>{/if}
  {:else if is('CategoricalLineChartDemo')}
    <Chart {echarts} options={categoricalLineOptions} height={320} isDarkMode={isDarkMode} />
  {:else if is('CategoricalBarChartDemo')}
    <Chart {echarts} options={categoricalBarOptions} height={320} isDarkMode={isDarkMode} />
  {:else if is('CategoricalDonutChartDemo')}
    <Chart {echarts} options={pieOptions()} height={320} isDarkMode={isDarkMode} />
  {:else if is('ChartColorSystemsDemo')}
    <div class="grid gap-4 md:grid-cols-3">
      {#each ['Semantic', 'Categorical', 'Sequential'] as title, groupIndex}
        <div class="rounded-lg border border-kumo-hairline bg-kumo-base p-4">
          <div class="mb-3 text-sm font-medium">{title}</div>
          <div class="flex gap-2">
            {#each Array.from({ length: 5 }) as _, index}
              <span class="h-10 flex-1 rounded" style:background-color={groupIndex === 0 ? ChartPalette.semantic(['Attention', 'Warning', 'Success', 'Neutral', 'Disabled'][index] as any, isDarkMode) : groupIndex === 1 ? ChartPalette.categorical(index, isDarkMode) : ChartPalette.sequential('blues', isDarkMode)[index]}></span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {:else if is('SemanticColorsDemo')}
    <div class="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {#each semanticColorNames as name (name)}
        <div class="rounded-lg border border-kumo-hairline bg-kumo-base p-4">
          <span class="mb-3 block h-10 rounded" style:background-color={ChartPalette.semantic(name, isDarkMode)}></span>
          <div class="text-sm font-medium">{name}</div>
          <code class="text-xs text-kumo-subtle">ChartPalette.semantic('{name}')</code>
        </div>
      {/each}
    </div>
  {:else if is('CategoricalColorsDemo')}
    <div class="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {#each Array.from({ length: 6 }) as _, index (index)}
        <div class="rounded-lg border border-kumo-hairline bg-kumo-base p-4">
          <span class="mb-3 block h-10 rounded" style:background-color={ChartPalette.categorical(index, isDarkMode)}></span>
          <div class="text-sm font-medium">Category {index + 1}</div>
          <code class="text-xs text-kumo-subtle">categorical({index})</code>
        </div>
      {/each}
    </div>
  {:else if is('CategoricalCvdDemo')}
    <div class="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {#each categoricalCvdColors as color, index (color)}
        <div class="rounded-lg border border-kumo-hairline bg-kumo-base p-4">
          <span class="mb-3 block h-10 rounded" style:background-color={color}></span>
          <div class="text-sm font-medium">Simulated {index + 1}</div>
          <div class="text-xs text-kumo-subtle">Deuteranopia check</div>
        </div>
      {/each}
    </div>
  {:else if is('SequentialColorsDemo')}
    <div class="w-full rounded-lg border border-kumo-hairline bg-kumo-base p-4">
      <div class="mb-3 flex items-center justify-between text-sm">
        <span class="font-medium">Lower density</span>
        <span class="text-kumo-subtle">Higher density</span>
      </div>
      <div class="grid grid-cols-5 overflow-hidden rounded">
        {#each ChartPalette.sequential('blues', isDarkMode) as color (color)}
          <span class="h-14" style:background-color={color}></span>
        {/each}
      </div>
    </div>
  {:else if demo.includes('Heatmap') || demo.includes('Sequential')}
    <Chart {echarts} options={heatmapOptions} height={300} isDarkMode={isDarkMode} />
  {:else}
    <Chart {echarts} options={categoricalLineOptions} height={300} isDarkMode={isDarkMode} />
  {/if}
</div>
