<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import type { EChartsOption } from 'echarts';
  import { Chart, ChartLegend, ChartPalette, LayerCard, SankeyChart, Table, TimeseriesChart } from '$lib';

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

  const seededNoise = (seed: number, index: number) => {
    const x = Math.sin((index + 1) * (seed + 1) * 12.9898) * 43758.5453;
    return (x - Math.floor(x) - 0.5) * 8;
  };

  const buildSeriesData = (seed = 0, points = 50, stepMs = 60_000, timeScale = 1): [number, number][] => {
    const end = Date.now();
    const start = end - (points - 1) * stepMs;
    return Array.from({ length: points }, (_, i) => {
      const ts = start + i * stepMs;
      const trend = i * 0.15;
      const noise = seededNoise(seed, i);
      const value = Math.round((30 + seed * 15 + trend + noise) * 100) / 100;
      return [ts, value * timeScale];
    });
  };

  const baseTimeseries = (scale = 1) => [
    { name: 'Requests', data: buildSeriesData(0, 50, 60_000, scale), color: ChartPalette.semantic('Neutral', isDarkMode) },
    { name: 'Errors', data: buildSeriesData(1, 50, 60_000, scale * 0.3), color: ChartPalette.semantic('Attention', isDarkMode) }
  ];

  const pieOptions = (count = 5): EChartsOption => ({
    animation: true,
    animationDuration: 2000,
    tooltip: { show: true },
    series: [
      {
        type: 'pie',
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

  const sixSeries = ['US', 'EU', 'APAC', 'LATAM', 'MEA', 'Other'];
  const regionBaselines = [4820, 3610, 2190, 1120, 640, 870];
  const lineTimestamps = (() => {
    const end = Date.now();
    const step = 6 * 60 * 60 * 1000;
    return Array.from({ length: 28 }, (_, i) => end - (27 - i) * step);
  })();
  const countrySlices = [
    { name: 'United States', value: 2000 },
    { name: 'United Kingdom', value: 1500 },
    { name: 'Germany', value: 1000 },
    { name: 'France', value: 500 },
    { name: 'Japan', value: 300 },
    { name: 'Canada', value: 250 }
  ];
  const barLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const cacheData = {
    Hit: [18200, 19400, 21000, 20500, 22100, 16800, 15200],
    Miss: [4200, 4800, 5100, 4900, 5300, 3900, 3600],
    Revalidated: [2800, 3100, 3300, 3200, 3500, 2600, 2400],
    Expired: [1100, 1200, 1300, 1250, 1400, 1050, 950],
    Unknown: [900, 1000, 1100, 1050, 1150, 850, 780]
  };
  const heatmapHours = ['00:00', '06:00', '12:00', '18:00'];
  const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const heatmapValues = [
    [4, 12, 24, 36],
    [6, 14, 26, 38],
    [8, 16, 28, 40],
    [10, 18, 30, 42],
    [12, 20, 32, 44],
    [14, 22, 34, 46],
    [16, 24, 36, 48]
  ];
  const lineStyleBySeries: Record<string, 'solid' | 'dashed' | 'dotted'> = {
    US: 'dashed',
    EU: 'solid',
    APAC: 'dashed',
    LATAM: 'solid',
    MEA: 'dotted',
    Other: 'solid'
  };
  const semanticColorNames = ['Attention', 'Warning', 'Success', 'Neutral', 'Disabled', 'Skeleton'] as const;
  const categoricalColorIndices = Array.from({ length: 6 }, (_, i) => i);
  const colorSystemRows = [
    { system: 'Semantic', when: 'Data has inherent polarity - good/bad, pass/fail, blocked/allowed', task: 'Evaluate', examples: 'WAF actions, Web Vitals, error rates, TLS versions' },
    { system: 'Categorical', when: 'Nominal categories with no inherent order or polarity', task: 'Identify', examples: 'Countries, URLs, ASNs, worker versions, service names' },
    { system: 'Sequential', when: 'Single metric varying in magnitude - more = darker', task: 'Read magnitude', examples: 'Choropleth maps, heatmaps, bot score histograms' }
  ];
  const deuteranopiaMatrix = [
    [0.367, 0.861, -0.228],
    [0.28, 0.673, 0.047],
    [-0.012, 0.043, 0.969]
  ] as const;

  const clampChannel = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
  const hexToRgb = (hex: string): [number, number, number] => {
    const normalized = hex.replace('#', '');
    const chunk = normalized.length === 3 ? normalized.split('').map((char) => `${char}${char}`).join('') : normalized;
    return [Number.parseInt(chunk.slice(0, 2), 16), Number.parseInt(chunk.slice(2, 4), 16), Number.parseInt(chunk.slice(4, 6), 16)];
  };
  const rgbToHex = ([r, g, b]: [number, number, number]) =>
    `#${[r, g, b].map((channel) => clampChannel(channel).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  const srgbToLinear = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  const linearToSrgb = (channel: number) => {
    const clamped = Math.max(0, Math.min(1, channel));
    const encoded = clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * clamped ** (1 / 2.4) - 0.055;
    return encoded * 255;
  };
  const simulateCvdHex = (hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    const lr = srgbToLinear(r);
    const lg = srgbToLinear(g);
    const lb = srgbToLinear(b);
    return rgbToHex([
      linearToSrgb(deuteranopiaMatrix[0][0] * lr + deuteranopiaMatrix[0][1] * lg + deuteranopiaMatrix[0][2] * lb),
      linearToSrgb(deuteranopiaMatrix[1][0] * lr + deuteranopiaMatrix[1][1] * lg + deuteranopiaMatrix[1][2] * lb),
      linearToSrgb(deuteranopiaMatrix[2][0] * lr + deuteranopiaMatrix[2][1] * lg + deuteranopiaMatrix[2][2] * lb)
    ]);
  };

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
    <TimeseriesChart
      {echarts}
      isDarkMode={isDarkMode}
      data={[
        { name: 'Requests', data: buildSeriesData(0, 30, 60_000, 1), color: ChartPalette.semantic('Neutral', isDarkMode) },
        { name: 'Errors', data: buildSeriesData(1, 30, 60_000, 0.3), color: ChartPalette.semantic('Attention', isDarkMode) }
      ]}
      height={160}
      yAxisTickCount={2}
    />
  {:else if is('PieChartDemo')}
    <Chart {echarts} options={pieOptions()} height={400} isDarkMode={isDarkMode} />
  {:else if is('PieChartPreviewDemo')}
    <Chart
      {echarts}
      height={160}
      isDarkMode={isDarkMode}
      options={{
        toolbox: { show: false },
        series: [
          {
            type: 'pie',
            data: [
              { value: 101, name: 'Series A' },
              { value: 202, name: 'Series B' },
              { value: 303, name: 'Series C' }
            ]
          }
        ]
      }}
    />
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
    {@const data = [
      { name: 'P99', data: buildSeriesData(3, 30, 60_000, 1), color: ChartPalette.semantic('Attention', isDarkMode) },
      { name: 'P95', data: buildSeriesData(2, 30, 60_000, 0.6), color: ChartPalette.semantic('Warning', isDarkMode) },
      { name: 'P75', data: buildSeriesData(1, 30, 60_000, 0.4), color: ChartPalette.semantic('Neutral', isDarkMode) },
      { name: 'P50', data: buildSeriesData(0, 30, 60_000, 0.2), color: ChartPalette.semantic('Neutral', isDarkMode) }
    ]}
    <LayerCard>
      <LayerCard.Secondary>Read latency</LayerCard.Secondary>
      <LayerCard.Primary>
        <div class="mb-2 flex gap-4 divide-x divide-kumo-hairline px-2">
          <ChartLegend variant="large" name="P99" color={ChartPalette.semantic('Attention', isDarkMode)} value="124" unit="ms" />
          <ChartLegend variant="large" name="P95" color={ChartPalette.semantic('Warning', isDarkMode)} value="76" unit="ms" />
          <ChartLegend variant="large" name="P75" color={ChartPalette.semantic('Neutral', isDarkMode)} value="32" unit="ms" />
          <ChartLegend variant="large" name="P50" color={ChartPalette.semantic('Neutral', isDarkMode)} value="10" unit="ms" />
        </div>
        <TimeseriesChart {echarts} isDarkMode={isDarkMode} {data} height={300} />
      </LayerCard.Primary>
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
    {@const seriesData = sixSeries.map((name, i) => ({
      name,
      data: lineTimestamps.map((ts, j) => [
        ts,
        Math.max(0, Math.round(regionBaselines[i] * (0.8 + 0.4 * Math.sin(j * 0.4 + i)) + Math.sin(j + i) * regionBaselines[i] * 0.075))
      ] as [number, number]),
      color: ChartPalette.categorical(i, isDarkMode)
    }))}
    <LayerCard>
      <LayerCard.Secondary>Line chart - requests by region</LayerCard.Secondary>
      <LayerCard.Primary class="!overflow-visible">
        <Chart
          {echarts}
          height={260}
          isDarkMode={isDarkMode}
          options={{
            backgroundColor: 'transparent',
            legend: { top: 4, left: 0, itemWidth: 10, itemHeight: 10, icon: 'circle', textStyle: { fontSize: 11 } },
            grid: { left: 56, right: 16, top: 40, bottom: 40 },
            tooltip: { trigger: 'axis', appendTo: 'body', confine: false },
            xAxis: { type: 'time', name: 'Time (UTC)', axisLine: { show: false }, axisTick: { show: false } },
            yAxis: { type: 'value', name: 'Requests', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } } },
            series: seriesData.map((s) => ({
              name: s.name,
              type: 'line',
              data: s.data,
              color: s.color,
              showSymbol: false,
              lineStyle: { width: 2, type: lineStyleBySeries[s.name] ?? 'solid' }
            }))
          }}
        />
      </LayerCard.Primary>
    </LayerCard>
  {:else if is('CategoricalBarChartDemo')}
    {@const seriesData = [
      { name: 'Hit', data: cacheData.Hit, color: ChartPalette.semantic('Success', isDarkMode), type: 'bar' as const, stack: 'total' as const, barWidth: 28 },
      { name: 'Miss', data: cacheData.Miss, color: ChartPalette.semantic('Attention', isDarkMode), type: 'bar' as const, stack: 'total' as const, barWidth: 28 },
      { name: 'Revalidated', data: cacheData.Revalidated, color: ChartPalette.semantic('Neutral', isDarkMode), type: 'bar' as const, stack: 'total' as const, barWidth: 28 },
      { name: 'Expired', data: cacheData.Expired, color: ChartPalette.semantic('Warning', isDarkMode), type: 'bar' as const, stack: 'total' as const, barWidth: 28 },
      { name: 'Unknown', data: cacheData.Unknown, color: ChartPalette.semantic('Disabled', isDarkMode), type: 'bar' as const, stack: 'total' as const, barWidth: 28 }
    ]}
    <LayerCard>
      <LayerCard.Secondary>Bar chart - cache status by day (semantic tokens)</LayerCard.Secondary>
      <LayerCard.Primary class="!overflow-visible">
        <Chart
          {echarts}
          height={260}
          isDarkMode={isDarkMode}
          options={{
            backgroundColor: 'transparent',
            grid: { left: 56, right: 16, top: 40, bottom: 40 },
            legend: { top: 4, left: 0, itemWidth: 10, itemHeight: 10, icon: 'circle', textStyle: { fontSize: 11 } },
            tooltip: { trigger: 'axis', appendTo: 'body', confine: false },
            xAxis: { type: 'category', data: barLabels, axisLine: { show: false }, axisTick: { show: false } },
            yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } } },
            series: seriesData
          }}
        />
      </LayerCard.Primary>
    </LayerCard>
  {:else if is('CategoricalDonutChartDemo')}
    <LayerCard>
      <LayerCard.Secondary>Donut chart - traffic by country</LayerCard.Secondary>
      <LayerCard.Primary class="!overflow-visible">
        <Chart
          {echarts}
          height={300}
          isDarkMode={isDarkMode}
          options={{
            color: countrySlices.map((_, i) => ChartPalette.categorical(i, isDarkMode)),
            backgroundColor: 'transparent',
            tooltip: { trigger: 'item', appendTo: 'body', confine: false },
            series: [{ type: 'pie', radius: ['42%', '70%'], data: countrySlices, label: { show: true, formatter: '{b}' } }]
          }}
        />
      </LayerCard.Primary>
    </LayerCard>
  {:else if is('ChartColorSystemsDemo')}
    <LayerCard>
      <LayerCard.Secondary class="!m-0 !p-0" />
      <Table class="!m-0 !p-0 [&_tbody]:text-sm [&_tbody]:font-medium [&_tbody]:text-kumo-default">
        <colgroup>
          <col class="w-[14%]" />
          <col class="w-[38%]" />
          <col class="w-[16%]" />
          <col class="w-[32%]" />
        </colgroup>
        <Table.Body>
          <Table.Row>
            <Table.Cell>System</Table.Cell>
            <Table.Cell>When to use</Table.Cell>
            <Table.Cell>User task</Table.Cell>
            <Table.Cell>Examples</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <LayerCard.Primary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !w-full !p-0 [&_td]:align-top [&_td]:text-kumo-default">
          <colgroup>
            <col class="w-[14%]" />
            <col class="w-[38%]" />
            <col class="w-[16%]" />
            <col class="w-[32%]" />
          </colgroup>
          <Table.Body>
            {#each colorSystemRows as row (row.system)}
              <Table.Row>
                <Table.Cell>{row.system}</Table.Cell>
                <Table.Cell>{row.when}</Table.Cell>
                <Table.Cell>{row.task}</Table.Cell>
                <Table.Cell>{row.examples}</Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table>
      </LayerCard.Primary>
    </LayerCard>
  {:else if is('SemanticColorsDemo')}
    <LayerCard>
      <LayerCard.Secondary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !p-0">
          <Table.Body>
            <Table.Row>
              {#each semanticColorNames as name (name)}
                <Table.Cell class="w-1/6 whitespace-nowrap">{name}</Table.Cell>
              {/each}
            </Table.Row>
          </Table.Body>
        </Table>
      </LayerCard.Secondary>
      <LayerCard.Primary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !p-0">
          <Table.Body>
            <Table.Row>
              {#each semanticColorNames as name (name)}
                {@const color = ChartPalette.semantic(name, isDarkMode)}
                <Table.Cell class="w-1/6">
                  <div class="flex items-center gap-2">
                    <div style:background-color={color} class="size-5 rounded"></div>
                    <span class="font-mono text-xs">{color}</span>
                  </div>
                </Table.Cell>
              {/each}
            </Table.Row>
          </Table.Body>
        </Table>
      </LayerCard.Primary>
    </LayerCard>
  {:else if is('CategoricalColorsDemo')}
    <LayerCard>
      <LayerCard.Secondary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !p-0">
          <Table.Body>
            <Table.Row>
              {#each categoricalColorIndices as index (index)}
                <Table.Cell class="w-1/6 whitespace-nowrap">{index}</Table.Cell>
              {/each}
            </Table.Row>
          </Table.Body>
        </Table>
      </LayerCard.Secondary>
      <LayerCard.Primary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !p-0">
          <Table.Body>
            <Table.Row>
              {#each categoricalColorIndices as index (index)}
                {@const color = ChartPalette.categorical(index, isDarkMode)}
                <Table.Cell class="w-1/6">
                  <div class="flex items-center gap-2">
                    <div style:background-color={color} class="size-5 rounded"></div>
                    <span class="font-mono text-xs">{color}</span>
                  </div>
                </Table.Cell>
              {/each}
            </Table.Row>
          </Table.Body>
        </Table>
      </LayerCard.Primary>
    </LayerCard>
  {:else if is('CategoricalCvdDemo')}
    <LayerCard>
      <LayerCard.Secondary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !p-0">
          <Table.Body>
            <Table.Row>
              {#each categoricalColorIndices as index (index)}
                <Table.Cell class="w-1/6 whitespace-nowrap">{index}</Table.Cell>
              {/each}
            </Table.Row>
          </Table.Body>
        </Table>
      </LayerCard.Secondary>
      <LayerCard.Primary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !p-0">
          <Table.Body>
            <Table.Row>
              {#each categoricalColorIndices.map((index) => simulateCvdHex(ChartPalette.categorical(index, isDarkMode))) as color, index (index)}
                <Table.Cell class="w-1/6 text-center">
                  <div class="flex items-center gap-2">
                    <div style:background-color={color} class="size-5 rounded"></div>
                    <span class="font-mono text-xs">{color}</span>
                  </div>
                </Table.Cell>
              {/each}
            </Table.Row>
          </Table.Body>
        </Table>
      </LayerCard.Primary>
    </LayerCard>
  {:else if is('SequentialColorsDemo')}
    <LayerCard>
      <LayerCard.Secondary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !p-0">
          <Table.Body>
            <Table.Row>
              {#each ChartPalette.sequential('blues', isDarkMode) as _, index (index)}
                <Table.Cell class="w-1/5 whitespace-nowrap">Step {index + 1}</Table.Cell>
              {/each}
            </Table.Row>
          </Table.Body>
        </Table>
      </LayerCard.Secondary>
      <LayerCard.Primary class="!m-0 !p-0">
        <Table layout="fixed" class="!m-0 !p-0">
          <Table.Body>
            <Table.Row>
              {#each ChartPalette.sequential('blues', isDarkMode) as color (color)}
                <Table.Cell class="w-1/5">
                  <div class="flex items-center gap-2">
                    <div style:background-color={color} class="size-5 rounded"></div>
                    <span class="font-mono text-xs">{color}</span>
                  </div>
                </Table.Cell>
              {/each}
            </Table.Row>
          </Table.Body>
        </Table>
      </LayerCard.Primary>
    </LayerCard>
  {:else if is('SequentialHeatmapDemo')}
    {@const scale = ChartPalette.sequential('blues', isDarkMode)}
    {@const maxValue = Math.max(...heatmapValues.flatMap((row) => row))}
    {@const stepSize = Math.max(1, Math.ceil((maxValue + 1) / scale.length))}
    {@const visualPieces = scale.map((color, i) => ({ min: i * stepSize, max: i === scale.length - 1 ? maxValue : (i + 1) * stepSize - 1, color, label: `${i * stepSize}-${i === scale.length - 1 ? maxValue : (i + 1) * stepSize - 1}` }))}
    {@const heatmapData = heatmapDays.flatMap((day, dayIndex) => heatmapHours.map((hour, hourIndex) => [hourIndex, dayIndex, heatmapValues[dayIndex][hourIndex]] as [number, number, number]))}
    <LayerCard>
      <LayerCard.Secondary>Heatmap - request density by day and hour (sequential scale)</LayerCard.Secondary>
      <LayerCard.Primary class="!overflow-visible">
        <Chart
          {echarts}
          height={300}
          isDarkMode={isDarkMode}
          options={{
            backgroundColor: 'transparent',
            grid: { left: 72, right: 24, top: 20, bottom: 70 },
            tooltip: { appendTo: 'body', confine: false, position: 'top' },
            xAxis: { type: 'category', data: heatmapHours, splitArea: { show: true }, axisLine: { show: false }, axisTick: { show: false } },
            yAxis: { type: 'category', data: heatmapDays, splitArea: { show: true }, axisLine: { show: false }, axisTick: { show: false } },
            visualMap: { type: 'piecewise', show: true, dimension: 2, orient: 'horizontal', left: 'center', bottom: 16, itemWidth: 16, itemHeight: 10, textStyle: { fontSize: 11 }, pieces: visualPieces },
            series: [{ type: 'heatmap', data: heatmapData, label: { show: false }, itemStyle: { borderColor: isDarkMode ? '#1F2937' : '#bcd8fa', borderWidth: 0.5 } }]
          }}
        />
      </LayerCard.Primary>
    </LayerCard>
  {:else if demo.includes('Heatmap') || demo.includes('Sequential')}
    <Chart {echarts} options={heatmapOptions} height={300} isDarkMode={isDarkMode} />
  {:else}
    <Chart {echarts} options={categoricalLineOptions} height={300} isDarkMode={isDarkMode} />
  {/if}
</div>
