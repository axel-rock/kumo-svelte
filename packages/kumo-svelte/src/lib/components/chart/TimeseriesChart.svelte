<script lang="ts">
  import { onMount } from 'svelte';
  import type { SeriesOption } from 'echarts';
  import type { EChartsType } from 'echarts/core';
  import Chart, { type ChartEvents, type KumoChartOption } from './Chart.svelte';

  export interface TimeseriesData {
    name: string;
    data: [number, number][];
    color: string;
  }

  interface Props {
    echarts: any;
    type?: 'line' | 'bar';
    data: TimeseriesData[];
    xAxisName?: string;
    xAxisTickCount?: number;
    xAxisTickFormat?: (value: number) => string;
    yAxisTickFormat?: (value: number) => string;
    yAxisTickLabelFormat?: (value: number) => string;
    yAxisName?: string;
    yAxisTickCount?: number;
    tooltipValueFormat?: (value: number) => string;
    incomplete?: { before?: number; after?: number };
    height?: number;
    onTimeRangeChange?: (from: number, to: number) => void;
    isDarkMode?: boolean;
    gradient?: boolean;
    loading?: boolean;
    ariaDescription?: string;
    animation?: boolean;
    animationDuration?: number;
    optionUpdateBehavior?: Record<string, unknown>;
  }

  let {
    echarts,
    type = 'line',
    data,
    xAxisName,
    xAxisTickCount,
    xAxisTickFormat,
    yAxisTickFormat,
    yAxisTickLabelFormat,
    yAxisName,
    yAxisTickCount,
    tooltipValueFormat,
    incomplete,
    height = 350,
    onTimeRangeChange,
    isDarkMode,
    gradient = false,
    loading = false,
    ariaDescription,
    animation = true,
    animationDuration = 600,
    optionUpdateBehavior
  }: Props = $props();

  let chartRef: EChartsType | null = $state(null);
  let detectedDarkMode = $state(false);
  const effectiveDarkMode = $derived(isDarkMode ?? detectedDarkMode);

  onMount(() => {
    const updateDetectedDarkMode = () => {
      detectedDarkMode =
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark') ||
        document.documentElement.dataset.mode === 'dark' ||
        document.body.dataset.mode === 'dark' ||
        window.matchMedia?.('(prefers-color-scheme: dark)').matches === true;
    };
    const themeObserver = new MutationObserver(updateDetectedDarkMode);
    updateDetectedDarkMode();
    [document.documentElement, document.body].forEach((node) => {
      themeObserver.observe(node, { attributes: true, attributeFilter: ['data-mode', 'class'] });
    });
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener('change', updateDetectedDarkMode);

    return () => {
      themeObserver.disconnect();
      mediaQuery?.removeEventListener('change', updateDetectedDarkMode);
    };
  });

  const colorWithOpacity = (color: string, alpha: number): string => {
    const a = Math.max(0, Math.min(1, alpha));
    const rgbMatch = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (rgbMatch) return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${a})`;
    let hex = color.replace(/^#/, '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    if (hex.length === 8) hex = hex.slice(0, 6);
    return `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}, ${a})`;
  };

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatTimestamp = (ts: number | string | Date): string => {
    const d = new Date(ts);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  let options = $derived.by(() => {
    const incompleteBefore = incomplete?.before;
    const incompleteAfter = incomplete?.after;
    const series: SeriesOption[] = [];
    const seriesType = type === 'bar' ? ({ type: 'bar', stack: 'total' } as const) : ({ type: 'line', showSymbol: false } as const);

    for (const s of data) {
      const incompleteBeforePoints = incompleteBefore && type === 'line' ? s.data.filter((point) => point[0] <= incompleteBefore) : [];
      const incompleteAfterPoints = incompleteAfter && type === 'line' ? s.data.filter((point) => point[0] >= incompleteAfter) : [];
      const completePoints =
        incompleteBeforePoints.length > 0 || incompleteAfterPoints.length > 0
          ? s.data.slice(Math.max(0, incompleteBeforePoints.length - 1), Math.max(0, s.data.length - incompleteAfterPoints.length + 1))
          : s.data;

      series.push({
        data: completePoints,
        color: s.color,
        name: s.name,
        emphasis: { focus: 'series' },
        ...(gradient && type === 'line'
          ? {
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: colorWithOpacity(s.color, 0.4) },
                  { offset: 1, color: colorWithOpacity(s.color, 0) }
                ])
              }
            }
          : {}),
        ...seriesType
      });

      const incompleteConfig = {
        color: s.color,
        name: s.name,
        type: 'line' as const,
        lineStyle: { type: 'dashed' as const },
        showSymbol: false,
        emphasis: { focus: 'series' as const }
      };
      if (incompleteBeforePoints.length > 0) series.push({ ...incompleteConfig, data: incompleteBeforePoints });
      if (incompleteAfterPoints.length > 0) series.push({ ...incompleteConfig, data: incompleteAfterPoints });
    }

    return {
      aria: { enabled: true, ...(ariaDescription && { label: { description: ariaDescription } }) },
      brush: {
        xAxisIndex: 'all',
        brushType: 'lineX',
        brushMode: 'single',
        outOfBrush: { colorAlpha: 0.3 },
        brushStyle: { borderWidth: 1, color: 'rgba(120,140,180,0.3)', borderColor: 'rgba(120,140,180,0.8)' }
      },
      tooltip: {
        trigger: 'axis',
        appendTo: 'body',
        axisPointer: { type: 'shadow' },
        backgroundColor: effectiveDarkMode ? '#3A3E44' : '#FFFFFF',
        borderColor: effectiveDarkMode ? '#5B5E64' : '#DDDDDD',
        textStyle: { color: effectiveDarkMode ? '#B3B4B7' : '#1F1F1F' },
        extraCssText: `color: ${effectiveDarkMode ? '#B3B4B7' : '#1F1F1F'};`,
        dangerousHtmlFormatter: (params: any) => {
          const items = Array.isArray(params) ? params : [params];
          const seenNames = new Set<string>();
          const filtered = items.filter((param: any) => {
            if (seenNames.has(param.seriesName)) return false;
            seenNames.add(param.seriesName);
            return true;
          });
          const ts = filtered[0]?.value?.[0] ?? filtered[0]?.axisValue;
          const header = ts != null ? `<div style="font-weight:600;margin-bottom:4px;">${echarts.format.encodeHTML(formatTimestamp(ts))}</div>` : '';
          const rows = filtered
            .map((param: any) => {
              const value = param?.value?.[1];
              const formatFn = tooltipValueFormat ?? yAxisTickLabelFormat;
              const formattedValue = formatFn ? echarts.format.encodeHTML(String(formatFn(value))) : echarts.format.encodeHTML(String(value));
              return `${param.marker} ${echarts.format.encodeHTML(param.seriesName)}: <strong>${formattedValue}</strong>`;
            })
            .join('<br/>');
          return `${header}${rows}`;
        }
      },
      backgroundColor: 'transparent',
      animation,
      animationDuration,
      animationDurationUpdate: 300,
      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicOut',
      toolbox: { show: false },
      xAxis: {
        name: xAxisName,
        nameLocation: 'middle',
        nameGap: 30,
        type: 'time',
        splitLine: { show: false },
        axisLine: { show: false },
        splitNumber: xAxisTickCount ?? 5,
        ...(xAxisTickFormat && { axisLabel: { formatter: (value: number) => xAxisTickFormat(value) } })
      },
      yAxis: {
        name: yAxisName,
        nameLocation: 'middle',
        nameGap: 40,
        type: 'value',
        axisTick: { show: true },
        axisLabel: { margin: 15, ...(yAxisTickFormat && { formatter: (value: number) => yAxisTickFormat(value) }) },
        splitLine: { show: true, lineStyle: { type: 'dashed', width: 1 } },
        splitNumber: yAxisTickCount
      },
      grid: { left: yAxisName ? 30 : 24, right: 24, top: 24, bottom: xAxisName ? 30 : 24 },
      series
    } satisfies KumoChartOption;
  });

  let events = $derived<Partial<ChartEvents>>(
    onTimeRangeChange
      ? {
          brushend: (params: any) => {
            const range = params.areas?.[0]?.coordRange;
            if (!range) return;
            onTimeRangeChange(range[0], range[1]);
            chartRef?.dispatchAction({ type: 'brush', areas: [] });
          }
        }
      : {}
  );

  $effect(() => {
    if (chartRef && onTimeRangeChange && !loading) {
      chartRef.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'brush',
        brushOption: { brushType: 'lineX', brushMode: 'single' }
      });
    }
  });
</script>

<div class="relative w-full" style:height={`${height}px`}>
  {#if loading}
    {@const mid = height / 2}
    {@const amp = Math.min(height * 0.12, 28)}
    {@const period = 400}
    {@const wavePath = Array.from({ length: 121 }, (_, i) => {
      const x = -period + (i / 120) * period * 3;
      const y = mid + Math.sin((i / 120) * 2 * Math.PI * 3) * amp;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ')}
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden" style:height={`${height}px`}>
      <svg width="100%" height={height} viewBox={`0 0 ${period} ${height}`} preserveAspectRatio="none" class="w-full animate-pulse">
        <path
          d={wavePath}
          fill="none"
          stroke={effectiveDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)'}
          stroke-width="2"
          style:animation="kumo-chart-wave 2.4s linear infinite"
          style:transform-origin="0 0"
        ></path>
      </svg>
    </div>
  {:else}
    <Chart {echarts} bind:chartRef options={options} {height} isDarkMode={effectiveDarkMode} onEvents={events} optionUpdateBehavior={optionUpdateBehavior as any} />
  {/if}
</div>
