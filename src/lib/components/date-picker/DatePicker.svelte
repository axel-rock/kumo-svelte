<script lang="ts">
  import type { DateValue } from '@internationalized/date';
  import type { Snippet } from 'svelte';
  import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from '@lucide/svelte';
  import { DatePicker as DatePickerPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/cn';

  interface Props {
    value?: DateValue;
    placeholder?: DateValue;
    open?: boolean;
    onValueChange?: (value: DateValue | undefined) => void;
    class?: string;
    calendarClass?: string;
    triggerClass?: string;
    contentClass?: string;
    name?: string;
    disabled?: boolean;
    readonly?: boolean;
    locale?: string;
    weekdayFormat?: Intl.DateTimeFormatOptions['weekday'];
    numberOfMonths?: number;
    fixedWeeks?: boolean;
    calendarLabel?: string;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    value = $bindable(),
    placeholder = $bindable(),
    open = $bindable(false),
    onValueChange,
    class: className,
    calendarClass,
    triggerClass,
    contentClass,
    name,
    disabled = false,
    readonly = false,
    locale = 'en-US',
    weekdayFormat = 'short',
    numberOfMonths = 1,
    fixedWeeks = true,
    calendarLabel = 'Choose date',
    children,
    ...rest
  }: Props = $props();

  function handleValueChange(nextValue: DateValue | undefined) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  const rootClass = $derived(cn('inline-flex flex-col gap-2', className));
</script>

<DatePickerPrimitive.Root
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
  {...rest}
>
  <div class={rootClass}>
    <DatePickerPrimitive.Trigger
      class={cn(
        'inline-flex h-9 w-full min-w-56 items-center justify-between gap-2 rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line transition focus:ring-2 focus:ring-kumo-focus/50 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-kumo-placeholder',
        triggerClass
      )}
    >
      <DatePickerPrimitive.Input {name} class="flex min-w-0 flex-1 items-center gap-0.5 text-left">
        {#snippet children({ segments })}
          {#each segments as segment, index (`${segment.part}-${index}`)}
            <DatePickerPrimitive.Segment
              part={segment.part}
              class={cn(
                'rounded-sm px-0.5 outline-none focus:bg-kumo-tint focus:text-kumo-default',
                segment.part !== 'literal' && segment.value === segment.part ? 'text-kumo-placeholder' : undefined
              )}
            >
              {segment.value}
            </DatePickerPrimitive.Segment>
          {/each}
        {/snippet}
      </DatePickerPrimitive.Input>
      <CalendarIcon class="size-4 shrink-0 text-kumo-subtle" aria-hidden="true" />
    </DatePickerPrimitive.Trigger>

    <DatePickerPrimitive.Portal>
      <DatePickerPrimitive.Content
        class={cn('z-50 rounded-lg bg-kumo-base p-3 text-kumo-default shadow-lg ring ring-kumo-line outline-none', contentClass)}
        sideOffset={6}
      >
        <DatePickerPrimitive.Calendar class={cn('space-y-3', calendarClass)}>
          {#snippet children({ months, weekdays })}
            <DatePickerPrimitive.Header class="flex items-center justify-between gap-2">
              <DatePickerPrimitive.PrevButton
                class="inline-flex size-8 items-center justify-center rounded-md text-kumo-muted outline-none transition hover:bg-kumo-tint hover:text-kumo-default focus-visible:ring-2 focus-visible:ring-kumo-brand disabled:pointer-events-none disabled:opacity-40"
                aria-label="Previous month"
              >
                <ChevronLeft class="size-4" aria-hidden="true" />
              </DatePickerPrimitive.PrevButton>
              <DatePickerPrimitive.Heading class="text-sm font-medium text-kumo-default" />
              <DatePickerPrimitive.NextButton
                class="inline-flex size-8 items-center justify-center rounded-md text-kumo-muted outline-none transition hover:bg-kumo-tint hover:text-kumo-default focus-visible:ring-2 focus-visible:ring-kumo-brand disabled:pointer-events-none disabled:opacity-40"
                aria-label="Next month"
              >
                <ChevronRight class="size-4" aria-hidden="true" />
              </DatePickerPrimitive.NextButton>
            </DatePickerPrimitive.Header>

            <div class="grid gap-4" style={`grid-template-columns: repeat(${months.length}, minmax(0, 1fr));`}>
              {#each months as month (month.value.toString())}
                <DatePickerPrimitive.Grid class="w-full border-separate border-spacing-1">
                  <DatePickerPrimitive.GridHead>
                    <DatePickerPrimitive.GridRow>
                      {#each weekdays as day (day)}
                        <DatePickerPrimitive.HeadCell class="size-8 text-center text-xs font-medium text-kumo-subtle">
                          {day}
                        </DatePickerPrimitive.HeadCell>
                      {/each}
                    </DatePickerPrimitive.GridRow>
                  </DatePickerPrimitive.GridHead>
                  <DatePickerPrimitive.GridBody>
                    {#each month.weeks as week, weekIndex (weekIndex)}
                      <DatePickerPrimitive.GridRow>
                        {#each week as date (date.toString())}
                          <DatePickerPrimitive.Cell {date} month={month.value} class="p-0">
                            <DatePickerPrimitive.Day
                              class={cn(
                                'inline-flex size-8 items-center justify-center rounded-md text-sm outline-none transition',
                                'hover:bg-kumo-tint focus-visible:ring-2 focus-visible:ring-kumo-brand',
                                'data-[selected]:bg-kumo-brand data-[selected]:text-white',
                                'data-[disabled]:pointer-events-none data-[disabled]:text-kumo-subtle/50',
                                'data-[unavailable]:line-through data-[unavailable]:opacity-60',
                                'data-[outside-month]:text-kumo-subtle/50'
                              )}
                            />
                          </DatePickerPrimitive.Cell>
                        {/each}
                      </DatePickerPrimitive.GridRow>
                    {/each}
                  </DatePickerPrimitive.GridBody>
                </DatePickerPrimitive.Grid>
              {/each}
            </div>
          {/snippet}
        </DatePickerPrimitive.Calendar>

        {@render children?.()}
      </DatePickerPrimitive.Content>
    </DatePickerPrimitive.Portal>
  </div>
</DatePickerPrimitive.Root>
