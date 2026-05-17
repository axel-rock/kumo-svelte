<script lang="ts">
  interface PropRow {
    prop: string;
    type: string;
    default?: string;
    required?: boolean;
    description: string;
  }

  interface Props {
    component?: string;
    sourceFile?: string;
  }

  let { component, sourceFile }: Props = $props();

  const classRow: PropRow = {
    prop: 'class',
    type: 'string',
    default: '-',
    description: 'Additional classes applied to the root element.'
  };
  const childrenRow: PropRow = {
    prop: 'children',
    type: 'Snippet',
    default: '-',
    description: 'Custom child content rendered inside the component.'
  };
  const restRow: PropRow = {
    prop: '...rest',
    type: 'Record<string, unknown>',
    default: '-',
    description: 'Additional attributes are forwarded to the underlying element or primitive.'
  };
  const commonRows: PropRow[] = [classRow, childrenRow, restRow];
  const fieldRows: PropRow[] = [
    { prop: 'label', type: 'string | Snippet', default: '-', description: 'Label rendered with the control.' },
    { prop: 'labelTooltip', type: 'string | Snippet', default: '-', description: 'Optional help content for the label.' },
    { prop: 'description', type: 'string', default: '-', description: 'Help text rendered below the control.' },
    { prop: 'error', type: 'string | FieldError', default: '-', description: 'Validation message or validity-state matcher.' },
    { prop: 'required', type: 'boolean', default: '-', description: 'Marks the field as required or optional.' }
  ];
  const popupRows: PropRow[] = [
    childrenRow,
    classRow,
    { prop: 'sideOffset', type: 'number', default: '8', description: 'Distance between trigger and popup content.' },
    { prop: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: '-', description: 'Preferred popup side.' },
    { prop: 'align', type: "'start' | 'center' | 'end'", default: '-', description: 'Popup alignment relative to the trigger.' },
    restRow
  ];

  const rowsByComponent: Record<string, PropRow[]> = {
    Button: [
      { prop: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline'", default: "'secondary'", description: 'Visual treatment for the button.' },
      { prop: 'size', type: "'xs' | 'sm' | 'base' | 'lg'", default: "'base'", description: 'Button height and text size.' },
      { prop: 'shape', type: "'base' | 'square' | 'circle'", default: "'base'", description: 'Standard, square icon, or circular icon button shape.' },
      { prop: 'icon', type: 'Component', default: '-', description: 'Optional leading icon component.' },
      { prop: 'href', type: 'string', default: '-', description: 'Renders the button as a link when provided.' },
      { prop: 'external', type: 'boolean', default: 'false', description: 'Adds external-link target and rel attributes.' },
      { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows the loading state and disables interaction.' },
      { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
      ...commonRows
    ],
    Badge: [
      { prop: 'variant', type: "'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'destructive' | 'info' | 'beta' | 'outline' | 'red' | 'green' | 'neutral' | 'orange' | 'purple' | 'teal' | 'teal-subtle' | 'blue'", default: "'primary'", description: 'Badge color and emphasis.' },
      ...commonRows
    ],
    Banner: [
      { prop: 'variant', type: "'default' | 'alert' | 'error'", default: "'default'", description: 'Semantic banner treatment.' },
      { prop: 'title', type: 'string', default: '-', description: 'Optional heading text.' },
      { prop: 'description', type: 'string | Snippet', default: '-', description: 'Supporting message content.' },
      { prop: 'icon', type: 'Component', default: '-', description: 'Optional leading icon.' },
      { prop: 'action', type: 'Snippet', default: '-', description: 'Optional action area.' },
      ...commonRows
    ],
    Grid: [
      { prop: 'variant', type: "'2up' | 'side-by-side' | '2-1' | '1-2' | '1-3up' | '3up' | '4up' | '6up' | '1-2-4up'", default: '-', description: 'Responsive column layout.' },
      { prop: 'gap', type: "'none' | 'sm' | 'base' | 'lg'", default: "'base'", description: 'Grid gap scale.' },
      { prop: 'mobileDivider', type: 'boolean', default: 'false', description: 'Adds mobile dividers for dense grid layouts.' },
      ...commonRows
    ],
    Input: [
      { prop: 'size', type: "'xs' | 'sm' | 'base' | 'lg'", default: "'base'", description: 'Input height and text size.' },
      { prop: 'variant', type: "'default' | 'error'", default: 'auto', description: 'Input validation styling.' },
      { prop: 'invalid', type: 'boolean', default: 'false', description: 'Marks the input as invalid for styling and accessibility.' },
      { prop: 'value', type: 'string | number', default: "''", description: 'Bindable input value.' },
      { prop: 'onValueChange', type: '(value: string) => void', default: '-', description: 'Called whenever the value changes.' },
      ...fieldRows,
      ...commonRows
    ],
    InputArea: [
      { prop: 'size', type: "'sm' | 'base' | 'lg'", default: "'base'", description: 'Textarea size preset.' },
      { prop: 'variant', type: "'default' | 'error'", default: 'auto', description: 'Textarea validation styling.' },
      { prop: 'value', type: 'string', default: "''", description: 'Bindable textarea value.' },
      ...fieldRows,
      ...commonRows
    ],
    Select: [
      { prop: 'options', type: '{ label: string; value: string }[]', default: '[]', description: 'Options displayed in the select content.' },
      { prop: 'value', type: 'string | string[]', default: '-', description: 'Bindable selected option value.' },
      { prop: 'placeholder', type: 'string', default: '-', description: 'Text shown before a value is selected.' },
      { prop: 'multiple', type: 'boolean', default: 'false', description: 'Allows multiple selections.' },
      { prop: 'size', type: "'xs' | 'sm' | 'base' | 'lg'", default: "'base'", description: 'Trigger size preset.' },
      { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger and option selection.' },
      ...fieldRows,
      ...commonRows
    ],
    'Select.Option': [
      { prop: 'value', type: 'string', default: '-', description: 'Option value submitted when selected.' },
      childrenRow,
      restRow
    ],
    Dialog: [
      { prop: 'trigger', type: 'Snippet<[props]>', default: '-', description: 'Trigger snippet used to open the dialog.' },
      { prop: 'title', type: 'string', default: '-', description: 'Accessible dialog title.' },
      { prop: 'description', type: 'string', default: '-', description: 'Accessible dialog description.' },
      { prop: 'open', type: 'boolean', default: 'false', description: 'Controlled open state.' },
      { prop: 'size', type: "'sm' | 'base' | 'lg' | 'xl'", default: "'base'", description: 'Dialog width preset.' },
      { prop: 'role', type: "'dialog' | 'alertdialog'", default: "'dialog'", description: 'Dialog semantics.' },
      ...commonRows
    ],
    'Dialog.Root': [childrenRow, { prop: 'open', type: 'boolean', default: 'false', description: 'Controlled open state.' }, restRow],
    'Dialog.Trigger': [childrenRow, restRow],
    'Dialog.Title': [childrenRow, classRow, restRow],
    'Dialog.Description': [childrenRow, classRow, restRow],
    'Dialog.Close': [childrenRow, restRow],
    DropdownMenu: [
      { prop: 'open', type: 'boolean', default: 'false', description: 'Controlled menu open state.' },
      { prop: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Called when the menu open state changes.' },
      childrenRow,
      restRow
    ],
    'DropdownMenu.Trigger': [childrenRow, { prop: 'child', type: 'Snippet<[{ props: Record<string, unknown> }]>', default: '-', description: 'Custom render function for the trigger element.' }, classRow, restRow],
    'DropdownMenu.Content': popupRows,
    'DropdownMenu.SubContent': popupRows,
    'DropdownMenu.Item': [
      childrenRow,
      classRow,
      { prop: 'inset', type: 'boolean', default: 'false', description: 'Indents the item to align with checkable menu items.' },
      { prop: 'icon', type: 'Component', default: '-', description: 'Optional leading icon.' },
      { prop: 'selected', type: 'boolean', default: 'false', description: 'Shows a check indicator at the end of the item.' },
      { prop: 'variant', type: "'default' | 'danger'", default: "'default'", description: 'Item treatment.' },
      { prop: 'href', type: 'string', default: '-', description: 'Renders the menu item as a link.' },
      { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the menu item.' },
      restRow
    ],
    'DropdownMenu.LinkItem': [childrenRow, { prop: 'href', type: 'string', default: '-', description: 'Destination URL.' }, classRow, restRow],
    'DropdownMenu.CheckboxItem': [childrenRow, { prop: 'checked', type: 'boolean', default: 'false', description: 'Bindable checked state.' }, { prop: 'onCheckedChange', type: '(checked: boolean) => void', default: '-', description: 'Called when checked changes.' }, classRow, restRow],
    'DropdownMenu.Sub': [childrenRow, { prop: 'open', type: 'boolean', default: 'false', description: 'Controlled submenu open state.' }, restRow],
    'DropdownMenu.SubTrigger': [childrenRow, { prop: 'inset', type: 'boolean', default: 'false', description: 'Indents the item.' }, { prop: 'icon', type: 'Component', default: '-', description: 'Optional leading icon.' }, classRow, restRow],
    'DropdownMenu.Separator': [classRow, restRow],
    'DropdownMenu.RadioGroup': [childrenRow, { prop: 'value', type: 'string', default: '-', description: 'Selected radio item value.' }, restRow],
    'DropdownMenu.RadioItem': [childrenRow, { prop: 'value', type: 'string', default: '-', description: 'Radio item value.' }, classRow, restRow],
    'DropdownMenu.RadioItemIndicator': [childrenRow, classRow, restRow],
    Tooltip: [
      { prop: 'trigger', type: 'Snippet<[props]>', default: '-', description: 'Trigger snippet used to anchor the tooltip.' },
      { prop: 'content', type: 'string', default: '-', description: 'Tooltip text content.' },
      { prop: 'open', type: 'boolean', default: 'false', description: 'Controlled open state.' },
      { prop: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred tooltip side.' },
      { prop: 'delay', type: 'number', default: '600', description: 'Delay before opening in milliseconds.' },
      ...commonRows
    ],
    Tabs: [{ prop: 'items', type: '{ value: string; label: string }[]', default: '[]', description: 'Tabs rendered by the component.' }, { prop: 'value', type: 'string', default: '-', description: 'Current selected tab value.' }, ...commonRows],
    Radio: [{ prop: 'value', type: 'string', default: '-', description: 'Current selected radio value.' }, { prop: 'defaultValue', type: 'string', default: '-', description: 'Initial selected radio value.' }, { prop: 'legend', type: 'string', default: '-', description: 'Accessible group legend.' }, ...commonRows],
    Checkbox: [{ prop: 'checked', type: 'boolean', default: 'false', description: 'Checked state.' }, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' }, ...fieldRows, ...commonRows],
    'Checkbox.Group': [childrenRow, { prop: 'legend', type: 'string | Snippet', default: '-', description: 'Accessible group legend.' }, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables all child checkboxes.' }, classRow],
    'Checkbox.Legend': [childrenRow, classRow],
    'Checkbox.Item': [{ prop: 'checked', type: 'boolean', default: 'false', description: 'Bindable checked state.' }, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the item.' }, { prop: 'label', type: 'string | Snippet', default: '-', description: 'Item label.' }, classRow],
    'Radio.Group': [childrenRow, { prop: 'value', type: 'string', default: '-', description: 'Bindable selected value.' }, { prop: 'defaultValue', type: 'string', default: '-', description: 'Initial selected value.' }, { prop: 'legend', type: 'string | Snippet', default: '-', description: 'Accessible group legend.' }, classRow],
    'Radio.Legend': [childrenRow, classRow],
    'Radio.Item': [{ prop: 'value', type: 'string', default: '-', description: 'Radio item value.' }, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the item.' }, { prop: 'label', type: 'string | Snippet', default: '-', description: 'Item label.' }, classRow],
    Switch: [{ prop: 'checked', type: 'boolean', default: 'false', description: 'Bindable checked state.' }, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch.' }, { prop: 'size', type: "'sm' | 'base' | 'lg'", default: "'base'", description: 'Switch size preset.' }, ...fieldRows, ...commonRows],
    'Switch.Group': [childrenRow, { prop: 'legend', type: 'string | Snippet', default: '-', description: 'Accessible group legend.' }, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables all child switches.' }, classRow],
    'Switch.Legend': [childrenRow, classRow],
    'Switch.Item': [{ prop: 'checked', type: 'boolean', default: 'false', description: 'Bindable checked state.' }, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the item.' }, { prop: 'label', type: 'string | Snippet', default: '-', description: 'Item label.' }, classRow],
    Table: [{ prop: 'children', type: 'Snippet', default: '-', description: 'Table sections and rows.' }, { prop: 'layout', type: "'auto' | 'fixed'", default: "'auto'", description: 'Table layout strategy.' }, classRow, restRow],
    'Table.Row': [childrenRow, { prop: 'variant', type: "'default' | 'selected'", default: "'default'", description: 'Row treatment.' }, classRow, restRow],
    'Table.CheckHead': [{ prop: 'checked', type: 'boolean', default: 'false', description: 'Bindable checked state.' }, classRow, restRow],
    'Table.CheckCell': [{ prop: 'checked', type: 'boolean', default: 'false', description: 'Bindable checked state.' }, classRow, restRow],
    DatePicker: [{ prop: 'value', type: 'string', default: "''", description: 'Bindable date value in yyyy-mm-dd format.' }, classRow, restRow],
    DateRangePicker: [{ prop: 'start', type: 'string', default: "''", description: 'Bindable start date.' }, { prop: 'end', type: 'string', default: "''", description: 'Bindable end date.' }, classRow, restRow],
    Chart: [{ prop: 'echarts', type: 'typeof import("echarts")', default: '-', description: 'ECharts module instance.' }, { prop: 'options', type: 'KumoChartOption', default: '-', description: 'ECharts options.' }, { prop: 'height', type: 'number', default: '350', description: 'Chart height in pixels.' }, { prop: 'isDarkMode', type: 'boolean', default: 'false', description: 'Uses dark chart palette.' }, classRow],
    TimeseriesChart: [{ prop: 'echarts', type: 'typeof import("echarts")', default: '-', description: 'ECharts module instance.' }, { prop: 'data', type: '{ name: string; data: [number, number][]; color: string }[]', default: '-', description: 'Named time series data.' }, { prop: 'type', type: "'line' | 'bar'", default: "'line'", description: 'Series rendering mode.' }, { prop: 'height', type: 'number', default: '350', description: 'Chart height in pixels.' }, { prop: 'gradient', type: 'boolean', default: 'false', description: 'Adds an area gradient.' }, { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading skeleton.' }],
    ChartLegend: [{ prop: 'name', type: 'string', default: '-', description: 'Legend label.' }, { prop: 'color', type: 'string', default: '-', description: 'Series color swatch.' }, { prop: 'value', type: 'string | number', default: '-', description: 'Primary metric value.' }, { prop: 'unit', type: 'string', default: '-', description: 'Unit suffix.' }, { prop: 'variant', type: "'small' | 'large'", default: "'small'", description: 'Legend density preset.' }],
    SankeyChart: [{ prop: 'echarts', type: 'typeof import("echarts")', default: '-', description: 'ECharts module instance.' }, { prop: 'nodes', type: 'SankeyNodeData[]', default: '-', description: 'Chart nodes.' }, { prop: 'links', type: 'SankeyLinkData[]', default: '-', description: 'Chart links.' }, { prop: 'height', type: 'number', default: '350', description: 'Chart height in pixels.' }, { prop: 'tooltipFormatter', type: '(params: SankeyTooltipParams) => string', default: '-', description: 'Custom tooltip HTML formatter.' }],
    Autocomplete: [
      { prop: 'items', type: '(string | { label: string; value: string; disabled?: boolean })[]', default: '[]', required: true, description: 'Items available to filter and render.' },
      { prop: 'value', type: 'string', default: "''", description: 'Bindable selected value.' },
      { prop: 'open', type: 'boolean', default: 'false', description: 'Bindable popup open state.' },
      { prop: 'size', type: "'xs' | 'sm' | 'base' | 'lg'", default: "'base'", description: 'Input group size inherited by child controls.' },
      { prop: 'filter', type: '(item, query) => boolean', default: '-', description: 'Custom filter used to compute Autocomplete.List items.' },
      ...fieldRows,
      ...commonRows
    ],
    'Autocomplete.InputGroup': [{ prop: 'placeholder', type: 'string', default: '-', description: 'Input placeholder text.' }, { prop: 'size', type: "'xs' | 'sm' | 'base' | 'lg'", default: 'inherited', description: 'Overrides the root autocomplete size.' }, classRow, restRow],
    'Autocomplete.Content': [childrenRow, classRow, restRow],
    'Autocomplete.List': [childrenRow, restRow],
    'Autocomplete.Item': [{ prop: 'value', type: 'string | { label: string; value: string; disabled?: boolean }', default: '-', required: true, description: 'Item represented by this row.' }, { prop: 'disabled', type: 'boolean', default: '-', description: 'Disables the item.' }, childrenRow, classRow, restRow],
    'Autocomplete.Group': [{ prop: 'items', type: 'AutocompleteItem[]', default: '[]', required: true, description: 'Items rendered by nested Autocomplete.Collection.' }, childrenRow, restRow],
    'Autocomplete.GroupLabel': [childrenRow, classRow, restRow],
    'Autocomplete.Collection': [childrenRow, restRow],
    'Autocomplete.Separator': [classRow, restRow],
    Combobox: [{ prop: 'options', type: '{ label: string; value: string }[]', default: '[]', description: 'Options rendered in the list.' }, { prop: 'value', type: 'string | string[]', default: '-', description: 'Bindable selected value or values.' }, { prop: 'placeholder', type: 'string', default: '-', description: 'Trigger placeholder text.' }, classRow, restRow],
    'Combobox.Content': popupRows,
    'Combobox.Item': [childrenRow, { prop: 'value', type: 'string', default: '-', description: 'Item value.' }, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the item.' }, classRow, restRow],
    ClipboardText: [{ prop: 'text', type: 'string', default: '-', description: 'Text copied to the clipboard.' }, { prop: 'textToCopy', type: 'string', default: '-', description: 'Alternate clipboard value.' }, classRow, restRow],
    Empty: [{ prop: 'title', type: 'string', default: '-', description: 'Empty state heading.' }, { prop: 'description', type: 'string | Snippet', default: '-', description: 'Supporting copy.' }, { prop: 'icon', type: 'Component', default: '-', description: 'Optional icon.' }, ...commonRows],
    LayerCard: [{ prop: 'as', type: 'keyof SvelteHTMLElements', default: "'div'", description: 'Element used for the card root.' }, ...commonRows],
    Loader: [{ prop: 'size', type: 'number', default: '16', description: 'Spinner size in pixels.' }, { prop: 'label', type: 'string', default: '-', description: 'Accessible loading label.' }, classRow, restRow],
    Meter: [{ prop: 'value', type: 'number', default: '0', description: 'Current meter value.' }, { prop: 'max', type: 'number', default: '100', description: 'Maximum meter value.' }, { prop: 'label', type: 'string', default: '-', description: 'Accessible meter label.' }, classRow, restRow],
    Text: [{ prop: 'as', type: 'keyof SvelteHTMLElements', default: "'p'", description: 'Element used for the text.' }, { prop: 'size', type: "'xs' | 'sm' | 'base' | 'lg' | 'xl'", default: "'base'", description: 'Text size preset.' }, { prop: 'tone', type: "'default' | 'strong' | 'subtle' | 'danger' | 'success'", default: "'default'", description: 'Text color treatment.' }, ...commonRows],
    Toasty: [{ prop: 'position', type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'", default: "'bottom-right'", description: 'Toast viewport position.' }, { prop: 'duration', type: 'number', default: '-', description: 'Default toast duration.' }, classRow],
    TableOfContents: [{ prop: 'items', type: '{ id: string; title: string; level?: number }[]', default: '[]', description: 'Headings rendered in the table of contents.' }, classRow, restRow],
    'TableOfContents.Title': [childrenRow, classRow],
    'TableOfContents.List': [childrenRow, classRow],
    'TableOfContents.Item': [childrenRow, { prop: 'href', type: 'string', default: '-', description: 'Anchor target.' }, classRow],
    'TableOfContents.Group': [childrenRow, classRow],
    Sidebar: [{ prop: 'items', type: '{ title: string; href: string; items?: Item[] }[]', default: '[]', description: 'Navigation items rendered in the sidebar.' }, ...commonRows],
    SensitiveInput: [{ prop: 'value', type: 'string', default: "''", description: 'Bindable sensitive input value.' }, classRow, restRow],
    MenuBar: [{ prop: 'options', type: '{ label: string; href?: string; onSelect?: () => void }[]', default: '[]', description: 'Menu options rendered in the bar.' }, { prop: 'isActive', type: '(option: unknown) => boolean', default: '-', description: 'Determines whether an option is active.' }, classRow, restRow],
    InputGroup: [{ prop: 'size', type: "'xs' | 'sm' | 'base' | 'lg'", default: "'base'", description: 'Shared sizing for grouped controls.' }, { prop: 'variant', type: "'default' | 'error'", default: "'default'", description: 'Group validation styling.' }, ...commonRows],
    InputGroupInput: [{ prop: 'value', type: 'string', default: "''", description: 'Bindable input value.' }, { prop: 'placeholder', type: 'string', default: '-', description: 'Placeholder text.' }, classRow, restRow],
    InputGroupAddon: [childrenRow, { prop: 'align', type: "'start' | 'end'", default: "'start'", description: 'Addon alignment.' }, classRow],
    InputGroupButton: [childrenRow, { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' }, classRow, restRow],
    InputGroupSuffix: [childrenRow, classRow],
    PageHeader: [{ prop: 'title', type: 'string', default: '-', description: 'Page title.' }, { prop: 'description', type: 'string', default: '-', description: 'Supporting page description.' }, { prop: 'actions', type: 'Snippet', default: '-', description: 'Optional action area.' }, classRow],
    DeleteResource: [{ prop: 'open', type: 'boolean', default: 'false', description: 'Bindable dialog open state.' }, { prop: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Called when open state changes.' }, { prop: 'resourceType', type: 'string', default: '-', description: 'Type of resource being deleted.' }, { prop: 'resourceName', type: 'string', default: '-', description: 'Name of the resource being deleted.' }, { prop: 'onDelete', type: '() => void | Promise<void>', default: '-', description: 'Called after confirmation.' }, { prop: 'isDeleting', type: 'boolean', default: 'false', description: 'Shows pending delete state.' }, { prop: 'caseSensitive', type: 'boolean', default: 'true', description: 'Controls confirmation matching.' }, { prop: 'deleteButtonText', type: 'string', default: '-', description: 'Custom destructive action label.' }, classRow]
  };

  const key = $derived(component ?? sourceFile ?? 'Component');
  const rows = $derived(rowsByComponent[key] ?? commonRows);
</script>

<div class="not-prose overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Default</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody class="text-kumo-strong">
      {#each rows as row (row.prop)}
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">
            {row.prop}
            {#if row.required}
              <span class="ml-0.5 text-kumo-danger">*</span>
            {/if}
          </td>
          <td class="max-w-xs px-4 py-3 font-mono text-xs">
            <code class="text-wrap break-words">{row.type}</code>
          </td>
          <td class="px-4 py-3 font-mono text-xs">
            {#if (row.default ?? '-') !== '-'}
              <code>{row.default}</code>
            {:else}
              -
            {/if}
          </td>
          <td class="max-w-md px-4 py-3 text-xs">{row.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
