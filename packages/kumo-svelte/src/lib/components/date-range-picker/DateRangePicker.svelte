<script module lang="ts">
  import { cn } from '$lib/utils/cn';

  /** DateRangePicker size and variant definitions mapping names to their Tailwind classes. */
  export const KUMO_DATE_RANGE_PICKER_VARIANTS = {
    size: {
      sm: {
        classes: 'p-3 gap-2',
        cellHeight: 'h-[22px]',
        cellWidth: 'w-6',
        calendarWidth: 'w-[168px]',
        textSize: 'text-xs',
        iconSize: 14,
        description: 'Compact calendar for tight spaces'
      },
      base: {
        classes: 'p-4 gap-2.5',
        cellHeight: 'h-[26px]',
        cellWidth: 'w-7',
        calendarWidth: 'w-[196px]',
        textSize: 'text-sm',
        iconSize: 16,
        description: 'Default calendar size'
      },
      lg: {
        classes: 'p-5 gap-3',
        cellHeight: 'h-[32px]',
        cellWidth: 'w-9',
        calendarWidth: 'w-[252px]',
        textSize: 'text-base',
        iconSize: 18,
        description: 'Large calendar for prominent date selection'
      }
    },
    variant: {
      default: {
        classes: 'bg-kumo-overlay',
        description: 'Default calendar appearance'
      },
      subtle: {
        classes: 'bg-kumo-base',
        description: 'Subtle calendar with minimal background'
      }
    }
  } as const;

  export const KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS = {
    size: 'base',
    variant: 'default'
  } as const;

  export type KumoDateRangePickerSize = keyof typeof KUMO_DATE_RANGE_PICKER_VARIANTS.size;
  export type KumoDateRangePickerVariant = keyof typeof KUMO_DATE_RANGE_PICKER_VARIANTS.variant;

  export function getDateRangePickerSizeConfig(size: KumoDateRangePickerSize) {
    return KUMO_DATE_RANGE_PICKER_VARIANTS.size[size];
  }

  export function dateRangePickerVariants({
    size = KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.size,
    variant = KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.variant
  }: {
    size?: KumoDateRangePickerSize;
    variant?: KumoDateRangePickerVariant;
  } = {}) {
    return cn(
      'flex w-fit flex-col rounded-xl select-none',
      KUMO_DATE_RANGE_PICKER_VARIANTS.variant[variant].classes,
      KUMO_DATE_RANGE_PICKER_VARIANTS.size[size].classes
    );
  }

  /** Upstream DateRangeDayCell background tokens (see getBackgroundColor in Kumo). */
  export const DATE_RANGE_CELL_BACKGROUNDS = {
    outOfRange: 'bg-transparent',
    enabled: 'bg-transparent',
    selectedStart: '!bg-kumo-contrast rounded-tl-[5px] rounded-bl-[5px]',
    selectedEnd: '!bg-kumo-contrast rounded-tr-[5px] rounded-br-[5px]',
    selected: 'bg-kumo-interact',
    selectedOutOfRange: 'bg-kumo-fill'
  } as const;

  /** Upstream DateRangeDayCell text tokens (see getTextColor in Kumo). */
  export const DATE_RANGE_CELL_TEXT = {
    subtle: '!text-kumo-subtle',
    inverse: '!text-kumo-inverse',
    default: 'text-kumo-default'
  } as const;

  export function dateRangePickerDayCellClasses(size: KumoDateRangePickerSize = 'base') {
    const sizeConfig = getDateRangePickerSizeConfig(size);
    return cn(
      sizeConfig.cellHeight,
      sizeConfig.cellWidth,
      sizeConfig.textSize,
      DATE_RANGE_CELL_BACKGROUNDS.enabled,
      DATE_RANGE_CELL_TEXT.default,
      'cursor-pointer text-center transition-all duration-[50]',
      'hover:bg-kumo-interact',
      'data-[outside-month]:bg-transparent data-[outside-month]:!text-kumo-subtle',
      'data-[outside-month]:hover:bg-transparent',
      'data-[selection-start]:!bg-kumo-contrast data-[selection-start]:rounded-tl-[5px] data-[selection-start]:rounded-bl-[5px] data-[selection-start]:!text-kumo-inverse',
      'data-[selection-end]:!bg-kumo-contrast data-[selection-end]:rounded-tr-[5px] data-[selection-end]:rounded-br-[5px] data-[selection-end]:!text-kumo-inverse',
      'data-[highlighted]:bg-kumo-interact data-[range-middle]:bg-kumo-interact',
      'data-[outside-month][data-highlighted]:bg-kumo-fill',
      'data-[disabled]:pointer-events-none'
    );
  }
</script>

<script lang="ts">
  import type { DateValue } from '@internationalized/date';
  import type { DateRange } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { Calendar as CalendarIcon, CaretLeft, CaretRight, GlobeHemisphereWest } from 'phosphor-svelte';
  import { DateRangePicker as DateRangePickerPrimitive } from 'bits-ui';

  interface Props {
    value?: DateRange;
    placeholder?: DateValue;
    open?: boolean;
    onValueChange?: (value: DateRange) => void;
    class?: string;
    calendarClass?: string;
    triggerClass?: string;
    contentClass?: string;
    startName?: string;
    endName?: string;
    disabled?: boolean;
    readonly?: boolean;
    locale?: string;
    weekdayFormat?: Intl.DateTimeFormatOptions['weekday'];
    numberOfMonths?: number;
    fixedWeeks?: boolean;
    calendarLabel?: string;
    size?: KumoDateRangePickerSize;
    variant?: KumoDateRangePickerVariant;
    timezone?: string;
    closeOnRangeSelect?: boolean;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    value = $bindable({ start: undefined, end: undefined }),
    placeholder = $bindable(),
    open = $bindable(false),
    onValueChange,
    class: className,
    calendarClass,
    triggerClass,
    contentClass,
    startName,
    endName,
    disabled = false,
    readonly = false,
    locale = 'en-US',
    weekdayFormat = 'short',
    numberOfMonths = 2,
    fixedWeeks = true,
    calendarLabel = 'Choose date range',
    size = KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.size,
    variant = KUMO_DATE_RANGE_PICKER_DEFAULT_VARIANTS.variant,
    timezone = 'New York, NY, USA (GMT-4)',
    closeOnRangeSelect = false,
    children,
    ...rest
  }: Props = $props();

  const sizeConfig = $derived(getDateRangePickerSizeConfig(size));
  const dayCellClass = $derived(dateRangePickerDayCellClasses(size));
  const navButtonClass =
    'cursor-pointer rounded bg-kumo-interact/85 p-1.5 hover:bg-kumo-interact';
  const monthInputClass = $derived(
    cn(
      'w-full rounded-md border-none bg-transparent py-1.5 text-center font-semibold text-kumo-default transition-all duration-200 focus:outline-none focus:ring-kumo-focus/50 focus:ring-[1.5px]',
      sizeConfig.textSize
    )
  );
  const weekdayClass = $derived(
    cn('h-[22px] text-center text-kumo-subtle', sizeConfig.cellWidth, sizeConfig.textSize)
  );
  const footerClass = $derived(cn('flex items-center gap-2 text-kumo-subtle', sizeConfig.textSize));
  const resetButtonClass =
    'cursor-pointer font-semibold text-kumo-default underline underline-offset-2';

  function handleValueChange(nextValue: DateRange) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function resetDates() {
    handleValueChange({ start: undefined, end: undefined });
  }

  function formatMonthYear(dateValue: DateValue) {
    return new Date(dateValue.year, dateValue.month - 1, 1).toLocaleString(locale, {
      month: 'long',
      year: 'numeric'
    });
  }

  const rootClass = $derived(cn('inline-flex flex-col gap-2', className));
  const panelClass = $derived(
    cn(
      dateRangePickerVariants({ size, variant }),
      'z-50 shadow-lg ring ring-kumo-line outline-none',
      contentClass
    )
  );
</script>

{#snippet dateInput(type: 'start' | 'end', name: string | undefined)}
  <DateRangePickerPrimitive.Input {type} {name} class="flex min-w-0 items-center gap-0.5 text-left">
    {#snippet children({ segments })}
      {#each segments as segment, index (`${type}-${segment.part}-${index}`)}
        <DateRangePickerPrimitive.Segment
          part={segment.part}
          class={cn(
            'rounded-sm px-0.5 outline-none focus:bg-kumo-tint focus:text-kumo-default',
            segment.part !== 'literal' && segment.value === segment.part
              ? 'text-kumo-placeholder'
              : undefined
          )}
        >
          {segment.value}
        </DateRangePickerPrimitive.Segment>
      {/each}
    {/snippet}
  </DateRangePickerPrimitive.Input>
{/snippet}

<DateRangePickerPrimitive.Root
  bind:value
  bind:placeholder
  bind:open
  onValueChange={handleValueChange}
  {disabled}
  {readonly}
  {locale}
  {weekdayFormat}
  {numberOfMonths}
  {fixedWeeks}
  {calendarLabel}
  {closeOnRangeSelect}
  data-kumo-component="DateRangePicker"
  data-kumo-part="date-range-picker"
  {...rest}
>
  <div class={rootClass}>
    <DateRangePickerPrimitive.Trigger
      class={cn(
        'inline-flex h-9 w-full min-w-80 items-center justify-between gap-2 rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line transition focus:ring-2 focus:ring-kumo-focus/50 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-kumo-placeholder',
        triggerClass
      )}
    >
      <span class="flex min-w-0 flex-1 items-center gap-1">
        {@render dateInput('start', startName)}
        <span class="shrink-0 text-kumo-subtle">-</span>
        {@render dateInput('end', endName)}
      </span>
      <CalendarIcon class="size-4 shrink-0 text-kumo-subtle" aria-hidden="true" />
    </DateRangePickerPrimitive.Trigger>

    <DateRangePickerPrimitive.Content class={panelClass} sideOffset={6}>
      <DateRangePickerPrimitive.Calendar class={calendarClass}>
        {#snippet children({ months, weekdays })}
          <div class="flex gap-4">
            {#each months as month, monthIndex (month.value.toString())}
              <div class={cn('relative', sizeConfig.calendarWidth)}>
                {#if monthIndex === 0}
                  <DateRangePickerPrimitive.PrevButton
                    class={cn('absolute top-0 left-0', navButtonClass)}
                    aria-label="Previous month"
                  >
                    <CaretLeft size={sizeConfig.iconSize} aria-hidden="true" />
                  </DateRangePickerPrimitive.PrevButton>
                {/if}

                {#if monthIndex === months.length - 1}
                  <DateRangePickerPrimitive.NextButton
                    class={cn('absolute top-0 right-0', navButtonClass)}
                    aria-label="Next month"
                  >
                    <CaretRight size={sizeConfig.iconSize} aria-hidden="true" />
                  </DateRangePickerPrimitive.NextButton>
                {/if}

                <div>
                  <div class="mb-3 text-center">
                    <input
                      aria-label="Edit month and year"
                      class={monthInputClass}
                      value={formatMonthYear(month.value)}
                      readonly
                    />
                  </div>

                  <div class="mt-2 grid grid-cols-7 gap-1">
                    {#each weekdays as day (day)}
                      <div class={weekdayClass}>{day}</div>
                    {/each}
                  </div>
                </div>

                <DateRangePickerPrimitive.Grid class="grid grid-cols-7 gap-0 gap-y-0.5">
                  <DateRangePickerPrimitive.GridHead class="sr-only">
                    <DateRangePickerPrimitive.GridRow>
                      {#each weekdays as day (day)}
                        <DateRangePickerPrimitive.HeadCell class={weekdayClass}>
                          {day}
                        </DateRangePickerPrimitive.HeadCell>
                      {/each}
                    </DateRangePickerPrimitive.GridRow>
                  </DateRangePickerPrimitive.GridHead>
                  <DateRangePickerPrimitive.GridBody>
                    {#each month.weeks as week, weekIndex (weekIndex)}
                      <DateRangePickerPrimitive.GridRow>
                        {#each week as date (date.toString())}
                          <DateRangePickerPrimitive.Cell {date} month={month.value} class="p-0">
                            <DateRangePickerPrimitive.Day class={dayCellClass} />
                          </DateRangePickerPrimitive.Cell>
                        {/each}
                      </DateRangePickerPrimitive.GridRow>
                    {/each}
                  </DateRangePickerPrimitive.GridBody>
                </DateRangePickerPrimitive.Grid>
              </div>
            {/each}
          </div>
        {/snippet}
      </DateRangePickerPrimitive.Calendar>

      <div class={footerClass}>
        <GlobeHemisphereWest size={sizeConfig.iconSize} aria-hidden="true" />
        <span class="flex-1">Timezone: {timezone}</span>
        <button type="button" class={resetButtonClass} onclick={resetDates}>Reset Dates</button>
      </div>

      {@render children?.()}
    </DateRangePickerPrimitive.Content>
  </div>
</DateRangePickerPrimitive.Root>
