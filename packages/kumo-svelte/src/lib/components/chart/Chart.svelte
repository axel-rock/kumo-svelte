<script lang="ts">
  import { onMount } from 'svelte';
  import type { EChartsOption, SetOptionOpts, TooltipComponentOption } from 'echarts';
  import type { EChartsType } from 'echarts/core';
  import { cn } from '$lib/utils/cn';
  import { CHART_DARK_COLORS, CHART_LIGHT_COLORS } from './Color';

  export type SafeTooltipOption = Omit<TooltipComponentOption, 'formatter'> & {
    dangerousHtmlFormatter?: TooltipComponentOption['formatter'];
  };

  export type KumoChartOption = {
    [K in keyof EChartsOption]: K extends 'tooltip' ? SafeTooltipOption | SafeTooltipOption[] | undefined : EChartsOption[K];
  };

  export type ChartEvents = Record<string, (params: any) => void>;

  interface Props {
    echarts: any;
    options: KumoChartOption;
    optionUpdateBehavior?: SetOptionOpts;
    class?: string;
    isDarkMode?: boolean;
    height?: number;
    onEvents?: Partial<ChartEvents>;
    chartRef?: EChartsType | null;
  }

  let {
    echarts,
    options,
    optionUpdateBehavior,
    class: className,
    isDarkMode = false,
    height = 350,
    onEvents = {},
    chartRef = $bindable(null)
  }: Props = $props();

  let el: HTMLDivElement;
  let chart: EChartsType | null = null;
  let resizeObserver: ResizeObserver | null = null;
  const eventWrappers = new Map<string, (params: any) => void>();
  let boundEvents = new Set<string>();

  const transformTooltip = (tooltipObj: SafeTooltipOption) => {
    const { dangerousHtmlFormatter, ...restOfTooltip } = tooltipObj;
    return { ...restOfTooltip, formatter: dangerousHtmlFormatter };
  };

  const prepareChartOptions = (rawOptions: KumoChartOption): EChartsOption => {
    if (!rawOptions.tooltip) return rawOptions as EChartsOption;
    return {
      ...rawOptions,
      tooltip: Array.isArray(rawOptions.tooltip) ? rawOptions.tooltip.map(transformTooltip) : transformTooltip(rawOptions.tooltip)
    } as EChartsOption;
  };

  const bindEvents = () => {
    if (!chart) return;
    const nextBound = new Set<string>();
    for (const [event, handler] of Object.entries(onEvents ?? {})) {
      if (typeof handler !== 'function') continue;
      nextBound.add(event);
      if (!eventWrappers.has(event)) {
        eventWrappers.set(event, (params: any) => onEvents?.[event]?.(params));
      }
      if (!boundEvents.has(event)) chart.on(event, eventWrappers.get(event)!);
    }
    for (const event of boundEvents) {
      if (nextBound.has(event)) continue;
      const wrapper = eventWrappers.get(event);
      if (wrapper) chart.off(event, wrapper);
    }
    boundEvents = nextBound;
  };

  const initChart = () => {
    if (!el) return;
    chart?.dispose();
    const nextChart = echarts.init(el, isDarkMode ? 'dark' : { color: isDarkMode ? CHART_DARK_COLORS : CHART_LIGHT_COLORS }, { renderer: 'canvas' });
    chart = nextChart;
    chartRef = nextChart;
    nextChart.setOption(prepareChartOptions(options), { notMerge: false, lazyUpdate: true, ...optionUpdateBehavior });
    bindEvents();
  };

  onMount(() => {
    initChart();
    let isInitialResize = true;
    resizeObserver = new ResizeObserver(() => {
      if (isInitialResize) {
        isInitialResize = false;
        return;
      }
      chart?.resize();
    });
    resizeObserver.observe(el);
    return () => {
      resizeObserver?.disconnect();
      for (const event of boundEvents) {
        const wrapper = eventWrappers.get(event);
        if (wrapper) chart?.off(event, wrapper);
      }
      chart?.dispose();
      chart = null;
      chartRef = null;
    };
  });

  $effect(() => {
    if (chart) {
      chart.setOption(prepareChartOptions(options), { notMerge: false, lazyUpdate: true, ...optionUpdateBehavior });
      bindEvents();
    }
  });

  $effect(() => {
    isDarkMode;
    if (chart) initChart();
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div bind:this={el} class={cn('w-full', className)} style:height={`${height}px`} tabindex={options.aria?.enabled ? 0 : undefined} role={options.aria?.enabled ? 'img' : undefined}></div>
