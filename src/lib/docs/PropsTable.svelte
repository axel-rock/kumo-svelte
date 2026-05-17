<script lang="ts">
  interface PropRow {
    prop: string;
    type: string;
    default?: string;
    description: string;
  }

  interface Props {
    component?: string;
    sourceFile?: string;
  }

  let { component, sourceFile }: Props = $props();

  const commonRows: PropRow[] = [
    { prop: 'class', type: 'string', default: '-', description: 'Additional classes applied to the root element.' },
    { prop: 'children', type: 'Snippet', default: '-', description: 'Custom child content rendered inside the component.' }
  ];

  const rowsByComponent: Record<string, PropRow[]> = {
    Button: [
      { prop: 'variant', type: "'default' | 'primary' | 'ghost' | 'destructive'", default: "'default'", description: 'Visual treatment for the button.' },
      { prop: 'size', type: "'sm' | 'base' | 'lg'", default: "'base'", description: 'Button height and text size.' },
      { prop: 'shape', type: "'default' | 'square'", default: "'default'", description: 'Standard button or icon-only square button shape.' },
      { prop: 'icon', type: 'Component', default: '-', description: 'Optional leading icon component.' },
      { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows the loading state and disables interaction.' },
      { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
      ...commonRows
    ],
    Input: [
      { prop: 'variant', type: "'default' | 'error'", default: "'default'", description: 'Input validation styling.' },
      { prop: 'invalid', type: 'boolean', default: 'false', description: 'Marks the input as invalid for styling and accessibility.' },
      { prop: 'value', type: 'string', default: "''", description: 'Current input value.' },
      { prop: 'placeholder', type: 'string', default: '-', description: 'Placeholder text shown when empty.' },
      ...commonRows
    ],
    Select: [
      { prop: 'options', type: '{ label: string; value: string }[]', default: '[]', description: 'Options displayed in the select content.' },
      { prop: 'value', type: 'string', default: '-', description: 'Selected option value.' },
      { prop: 'placeholder', type: 'string', default: '-', description: 'Text shown before a value is selected.' },
      { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger and option selection.' },
      ...commonRows
    ],
    'Select.Option': [
      { prop: 'value', type: 'string', default: '-', description: 'Option value submitted when selected.' },
      { prop: 'children', type: 'Snippet', default: '-', description: 'Option label content.' }
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
    'Dialog.Root': [
      { prop: 'open', type: 'boolean', default: 'false', description: 'Controlled open state.' },
      { prop: 'children', type: 'Snippet', default: '-', description: 'Dialog compound component content.' }
    ],
    'Dialog.Trigger': [
      { prop: 'children', type: 'Snippet', default: '-', description: 'Trigger content.' }
    ],
    'Dialog.Title': [
      { prop: 'children', type: 'Snippet', default: '-', description: 'Title content announced by assistive technology.' }
    ],
    'Dialog.Description': [
      { prop: 'children', type: 'Snippet', default: '-', description: 'Description content announced by assistive technology.' }
    ],
    'Dialog.Close': [
      { prop: 'children', type: 'Snippet', default: '-', description: 'Close control content.' }
    ],
    DropdownMenu: [
      { prop: 'open', type: 'boolean', default: 'false', description: 'Controlled menu open state.' },
      { prop: 'children', type: 'Snippet', default: '-', description: 'Dropdown trigger and content.' }
    ],
    Tooltip: [
      { prop: 'trigger', type: 'Snippet<[props]>', default: '-', description: 'Trigger snippet used to anchor the tooltip.' },
      { prop: 'content', type: 'string', default: '-', description: 'Tooltip text content.' },
      { prop: 'open', type: 'boolean', default: 'false', description: 'Controlled open state.' },
      { prop: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred tooltip side.' },
      { prop: 'delay', type: 'number', default: '600', description: 'Delay before opening in milliseconds.' },
      ...commonRows
    ],
    Tabs: [
      { prop: 'items', type: '{ value: string; label: string }[]', default: '[]', description: 'Tabs rendered by the component.' },
      { prop: 'value', type: 'string', default: '-', description: 'Current selected tab value.' },
      ...commonRows
    ],
    Radio: [
      { prop: 'value', type: 'string', default: '-', description: 'Current selected radio value.' },
      { prop: 'defaultValue', type: 'string', default: '-', description: 'Initial selected radio value.' },
      { prop: 'legend', type: 'string', default: '-', description: 'Accessible group legend.' },
      ...commonRows
    ],
    Checkbox: [
      { prop: 'checked', type: 'boolean', default: 'false', description: 'Checked state.' },
      { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
      ...commonRows
    ],
    Table: [
      { prop: 'children', type: 'Snippet', default: '-', description: 'Table sections and rows.' },
      { prop: 'class', type: 'string', default: '-', description: 'Additional classes applied to the table.' }
    ]
  };

  const key = $derived(component ?? sourceFile ?? 'Component');
  const rows = $derived(rowsByComponent[key] ?? commonRows);
</script>

<div class="not-prose my-6 overflow-hidden rounded-lg border border-kumo-hairline bg-kumo-canvas">
  <table class="w-full text-left text-sm">
    <thead class="bg-kumo-base text-kumo-default">
      <tr>
        <th class="border-b border-kumo-hairline px-4 py-3 font-semibold">Prop</th>
        <th class="border-b border-kumo-hairline px-4 py-3 font-semibold">Type</th>
        <th class="border-b border-kumo-hairline px-4 py-3 font-semibold">Default</th>
        <th class="border-b border-kumo-hairline px-4 py-3 font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr class="border-b border-kumo-hairline last:border-b-0">
          <td class="px-4 py-3 font-mono text-xs text-kumo-default">{row.prop}</td>
          <td class="px-4 py-3 font-mono text-xs text-kumo-subtle">{row.type}</td>
          <td class="px-4 py-3 font-mono text-xs text-kumo-subtle">{row.default ?? '-'}</td>
          <td class="px-4 py-3 text-kumo-subtle">{row.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
