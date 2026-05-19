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

  const rowsByComponent: Record<string, PropRow[]> = {
    "DeleteResource": [
      {
        "prop": "open",
        "type": "boolean",
        "required": true,
        "description": "Whether the dialog is open."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": true,
        "description": "Callback fired when the open state changes."
      },
      {
        "prop": "resourceType",
        "type": "string",
        "required": true,
        "description": "Type of resource being deleted, such as Zone, Worker, or KV Namespace."
      },
      {
        "prop": "resourceName",
        "type": "string",
        "required": true,
        "description": "Name of the resource users must type to confirm deletion."
      },
      {
        "prop": "onDelete",
        "type": "() => void | Promise<void>",
        "required": true,
        "description": "Callback fired when the delete action is confirmed."
      },
      {
        "prop": "isDeleting",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Whether the delete action is currently in progress."
      },
      {
        "prop": "caseSensitive",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Whether the confirmation input must match the resource name case exactly."
      },
      {
        "prop": "deleteButtonText",
        "type": "string",
        "required": false,
        "description": "Custom label for the destructive confirmation button."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the dialog content."
      },
      {
        "prop": "errorMessage",
        "type": "string",
        "required": false,
        "description": "Error message displayed above the confirmation copy."
      },
      {
        "prop": "size",
        "type": "'sm' | 'base'",
        "required": false,
        "default": "\"base\"",
        "description": "Dialog size preset."
      }
    ],
    "PageHeader": [
      {
        "prop": "breadcrumbContent",
        "type": "Snippet",
        "required": false,
        "description": "Rendered breadcrumb composition for full Breadcrumbs API parity."
      },
      {
        "prop": "breadcrumbs",
        "type": "BreadcrumbsItem[]",
        "required": false,
        "description": "Data-driven breadcrumb items for simple headers."
      },
      {
        "prop": "title",
        "type": "string",
        "required": false,
        "description": "Optional page title."
      },
      {
        "prop": "description",
        "type": "string",
        "required": false,
        "description": "Optional page description."
      },
      {
        "prop": "tabs",
        "type": "TabsItem[]",
        "required": false,
        "description": "Tabs shown in the lower header row."
      },
      {
        "prop": "defaultTab",
        "type": "string",
        "required": false,
        "description": "Initial selected tab value."
      },
      {
        "prop": "activeTab",
        "type": "string",
        "required": false,
        "description": "Bindable selected tab value."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback fired when the active tab changes."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Action content rendered on the right side of the tabs row."
      },
      {
        "prop": "spacing",
        "type": "'compact' | 'base' | 'relaxed'",
        "required": false,
        "default": "\"base\"",
        "description": "Spacing preset between header rows."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Button": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      },
      {
        "prop": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Loading state."
      },
      {
        "prop": "title",
        "type": "string",
        "required": false,
        "description": "Title content."
      },
      {
        "prop": "shape",
        "type": "'base' | 'square' | 'circle'",
        "required": false,
        "default": "\"base\"",
        "description": "Shape preset."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "variant",
        "type": "'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline'",
        "required": false,
        "default": "\"secondary\"",
        "description": "Visual variant."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "type",
        "type": "'button' | 'submit' | 'reset'",
        "required": false,
        "default": "\"button\"",
        "description": "Element or semantic type."
      },
      {
        "prop": "href",
        "type": "string",
        "required": false,
        "description": "Destination URL."
      },
      {
        "prop": "external",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Opens links in a new tab with safe rel attributes."
      }
    ],
    "Button.LinkButton": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "href",
        "type": "string",
        "required": false,
        "description": "Destination URL."
      },
      {
        "prop": "shape",
        "type": "'base' | 'square' | 'circle'",
        "required": false,
        "description": "Shape preset."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "description": "Size preset."
      },
      {
        "prop": "variant",
        "type": "'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline'",
        "required": false,
        "description": "Visual variant."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      },
      {
        "prop": "external",
        "type": "boolean",
        "required": false,
        "description": "Opens links in a new tab with safe rel attributes."
      },
      {
        "prop": "linksExternal",
        "type": "boolean",
        "required": false,
        "description": "Treats links as external."
      }
    ],
    "Badge": [
      {
        "prop": "variant",
        "type": "'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'destructive' | 'info' | 'beta' | 'outline' | 'red' | 'green' | 'neutral' | 'orange' | 'purple' | 'teal' | 'teal-subtle' | 'blue'",
        "required": false,
        "default": "\"primary\"",
        "description": "Visual variant."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      }
    ],
    "Banner": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "action",
        "type": "Snippet",
        "required": false,
        "description": "Action snippet rendered with the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      },
      {
        "prop": "variant",
        "type": "'default' | 'alert' | 'error'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual variant."
      },
      {
        "prop": "title",
        "type": "string",
        "required": false,
        "description": "Title content."
      },
      {
        "prop": "description",
        "type": "string | Snippet",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "text",
        "type": "string",
        "required": false,
        "description": "Text content."
      }
    ],
    "Grid": [
      {
        "prop": "gap",
        "type": "'none' | 'sm' | 'base' | 'lg'",
        "required": false,
        "description": "Grid gap scale.",
        "default": "\"base\""
      },
      {
        "prop": "variant",
        "type": "'2up' | 'side-by-side' | '2-1' | '1-2' | '1-3up' | '3up' | '4up' | '6up' | '1-2-4up'",
        "required": false,
        "description": "Visual variant."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "mobileDivider",
        "type": "boolean",
        "required": false,
        "description": "Adds mobile dividers for dense grid layouts."
      }
    ],
    "Grid.Item": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Input": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "variant",
        "type": "'default' | 'error'",
        "required": false,
        "description": "Visual variant."
      },
      {
        "prop": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Forces invalid styling and ARIA state."
      },
      {
        "prop": "label",
        "type": "string | Snippet",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "labelTooltip",
        "type": "string | Snippet",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "description",
        "type": "string",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "FieldError",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "passwordManagerIgnore",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds password-manager ignore attributes."
      },
      {
        "prop": "value",
        "type": "string | number",
        "required": false,
        "default": "\"\"",
        "description": "Controlled value."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "oninput",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Input event handler."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      }
    ],
    "InputArea": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "variant",
        "type": "'default' | 'error'",
        "required": false,
        "description": "Visual variant."
      },
      {
        "prop": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Forces invalid styling and ARIA state."
      },
      {
        "prop": "label",
        "type": "string | Snippet",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "labelTooltip",
        "type": "string | Snippet",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "description",
        "type": "string",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "FieldError",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Controlled value."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "oninput",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Input event handler."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      }
    ],
    "Textarea": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "variant",
        "type": "'default' | 'error'",
        "required": false,
        "description": "Visual variant."
      },
      {
        "prop": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Forces invalid styling and ARIA state."
      },
      {
        "prop": "label",
        "type": "string | Snippet",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "labelTooltip",
        "type": "string | Snippet",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "description",
        "type": "string",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "FieldError",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Controlled value."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "oninput",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Input event handler."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      }
    ],
    "Select": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "options",
        "type": "Option[]",
        "required": false,
        "default": "[]",
        "description": "Options rendered by the component."
      },
      {
        "prop": "items",
        "type": "Items",
        "required": false,
        "description": "Items rendered by the component."
      },
      {
        "prop": "value",
        "type": "Value",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "defaultValue",
        "type": "Value",
        "required": false,
        "description": "Initial uncontrolled value."
      },
      {
        "prop": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Select...\"",
        "description": "Placeholder text."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Loading state."
      },
      {
        "prop": "multiple",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Enables multiple selection."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "label",
        "type": "string",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "hideLabel",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "hideLabel prop."
      },
      {
        "prop": "labelTooltip",
        "type": "string",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "description",
        "type": "string",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "string | { message?: string }",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "name",
        "type": "string",
        "required": false,
        "description": "Form field name."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "renderValue",
        "type": "(value: Value) => unknown",
        "required": false,
        "description": "Custom selected-value renderer."
      }
    ],
    "Dialog": [
      {
        "prop": "size",
        "type": "'sm' | 'base' | 'lg' | 'xl'",
        "required": false,
        "default": "\"base\"",
        "description": "Dialog width preset."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the dialog content."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": true,
        "description": "Dialog content, typically title, description, close, and action buttons."
      },
      {
        "prop": "style",
        "type": "string",
        "required": false,
        "description": "Inline styles for the dialog content."
      },
      {
        "prop": "container",
        "type": "HTMLElement",
        "required": false,
        "default": "document.body (or KumoPortalProvider container)",
        "description": "Portal container for custom roots or Shadow DOM."
      }
    ],
    "DropdownMenu": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Controlled open state."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when open state changes."
      }
    ],
    "DropdownMenu.Trigger": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "child",
        "type": "Snippet<[{ props: Record<string, unknown> }]>",
        "required": false,
        "description": "child prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "type",
        "type": "'button' | 'submit' | 'reset'",
        "required": false,
        "default": "\"button\"",
        "description": "Element or semantic type."
      }
    ],
    "DropdownMenu.Content": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "sideOffset",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Distance from the anchor."
      },
      {
        "prop": "side",
        "type": "'top' | 'right' | 'bottom' | 'left'",
        "required": false,
        "description": "Preferred floating side."
      },
      {
        "prop": "align",
        "type": "'start' | 'center' | 'end'",
        "required": false,
        "description": "Floating alignment."
      }
    ],
    "DropdownMenu.SubContent": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "sideOffset",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Distance from the anchor."
      },
      {
        "prop": "side",
        "type": "'top' | 'right' | 'bottom' | 'left'",
        "required": false,
        "description": "Preferred floating side."
      },
      {
        "prop": "align",
        "type": "'start' | 'center' | 'end'",
        "required": false,
        "description": "Floating alignment."
      }
    ],
    "DropdownMenu.Item": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "inset",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "inset prop."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      },
      {
        "prop": "selected",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "selected prop."
      },
      {
        "prop": "variant",
        "type": "'default' | 'danger'",
        "required": false,
        "description": "Visual variant.",
        "default": "\"default\""
      },
      {
        "prop": "href",
        "type": "string",
        "required": false,
        "description": "Destination URL."
      },
      {
        "prop": "target",
        "type": "string",
        "required": false,
        "description": "target prop."
      },
      {
        "prop": "rel",
        "type": "string",
        "required": false,
        "description": "rel prop."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the component."
      }
    ],
    "DropdownMenu.CheckboxItem": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "checked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Checked state."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when checked changes."
      }
    ],
    "DropdownMenu.SubTrigger": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "inset",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "inset prop."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      }
    ],
    "DropdownMenu.Separator": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "DropdownMenu.RadioItem": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "inset",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "inset prop."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      },
      {
        "prop": "value",
        "type": "string",
        "required": true,
        "description": "Controlled value."
      }
    ],
    "DropdownMenu.RadioItemIndicator": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Tooltip": [
      {
        "prop": "trigger",
        "type": "Snippet<[Record<string, unknown>]>",
        "required": false,
        "description": "trigger prop."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "content",
        "type": "string",
        "required": false,
        "description": "content prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when open state changes."
      },
      {
        "prop": "side",
        "type": "KumoTooltipSide",
        "required": false,
        "description": "Preferred floating side.",
        "default": "\"top\""
      },
      {
        "prop": "align",
        "type": "'start' | 'center'",
        "required": false,
        "description": "Floating alignment."
      },
      {
        "prop": "delay",
        "type": "number",
        "required": false,
        "default": "600",
        "description": "delay prop."
      },
      {
        "prop": "closeDelay",
        "type": "number",
        "required": false,
        "description": "closeDelay prop."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the component."
      }
    ],
    "Tabs": [
      {
        "prop": "tabs",
        "type": "TabsItem[]",
        "required": false,
        "description": "tabs prop."
      },
      {
        "prop": "items",
        "type": "TabsItem[]",
        "required": false,
        "description": "Items rendered by the component."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "selectedValue",
        "type": "string",
        "required": false,
        "description": "selectedValue prop."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "activateOnFocus",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "activateOnFocus prop."
      },
      {
        "prop": "variant",
        "type": "(typeof KUMO_TABS_VARIANTS.variant)[number]",
        "required": false,
        "description": "Visual variant.",
        "default": "\"segmented\""
      },
      {
        "prop": "size",
        "type": "(typeof KUMO_TABS_VARIANTS.size)[number]",
        "required": false,
        "description": "Size preset.",
        "default": "\"base\""
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "className",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "listClassName",
        "type": "string",
        "required": false,
        "description": "listClassName prop."
      },
      {
        "prop": "indicatorClassName",
        "type": "string",
        "required": false,
        "description": "Class for the meter indicator."
      },
      {
        "prop": "listClass",
        "type": "string",
        "required": false,
        "description": "listClass prop."
      },
      {
        "prop": "triggerClass",
        "type": "string",
        "required": false,
        "description": "triggerClass prop."
      },
      {
        "prop": "contentClass",
        "type": "string",
        "required": false,
        "description": "contentClass prop."
      }
    ],
    "Radio": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "options",
        "type": "Option[]",
        "required": false,
        "default": "[]",
        "description": "Options rendered by the component."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initial uncontrolled value."
      },
      {
        "prop": "name",
        "type": "string",
        "required": false,
        "description": "Form field name."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "orientation",
        "type": "'vertical' | 'horizontal'",
        "required": false,
        "default": "\"vertical\"",
        "description": "Layout orientation."
      },
      {
        "prop": "appearance",
        "type": "'default' | 'card'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual appearance preset."
      },
      {
        "prop": "variant",
        "type": "'default' | 'error'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual variant."
      },
      {
        "prop": "controlPosition",
        "type": "'start' | 'end'",
        "required": false,
        "description": "Control position relative to label."
      },
      {
        "prop": "legend",
        "type": "string",
        "required": false,
        "description": "legend prop."
      },
      {
        "prop": "description",
        "type": "string | Snippet",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "string",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      }
    ],
    "Radio.Group": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "legend",
        "type": "string",
        "required": false,
        "description": "legend prop."
      },
      {
        "prop": "orientation",
        "type": "'vertical' | 'horizontal'",
        "required": false,
        "default": "\"vertical\"",
        "description": "Layout orientation."
      },
      {
        "prop": "appearance",
        "type": "'default' | 'card'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual appearance preset."
      },
      {
        "prop": "error",
        "type": "string",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "description",
        "type": "string | Snippet",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initial uncontrolled value."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "controlPosition",
        "type": "'start' | 'end'",
        "required": false,
        "description": "Control position relative to label."
      },
      {
        "prop": "name",
        "type": "string",
        "required": false,
        "description": "Form field name."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      }
    ],
    "Radio.Legend": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Radio.Item": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "variant",
        "type": "'default' | 'error'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual variant."
      },
      {
        "prop": "appearance",
        "type": "'default' | 'card'",
        "required": false,
        "description": "Visual appearance preset."
      },
      {
        "prop": "label",
        "type": "string | Snippet",
        "required": true,
        "description": "Visible label content."
      },
      {
        "prop": "description",
        "type": "string | Snippet",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "value",
        "type": "string",
        "required": true,
        "description": "Controlled value."
      }
    ],
    "Checkbox": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "checked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Checked state."
      },
      {
        "prop": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Indeterminate checked state."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "variant",
        "type": "'default' | 'error'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual variant."
      },
      {
        "prop": "label",
        "type": "string",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "labelTooltip",
        "type": "Snippet",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "controlFirst",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Renders the control before label content."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "name",
        "type": "string",
        "required": false,
        "description": "Form field name."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      },
      {
        "prop": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label."
      },
      {
        "prop": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Accessible labelled-by reference."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when checked changes."
      },
      {
        "prop": "onIndeterminateChange",
        "type": "(indeterminate: boolean) => void",
        "required": false,
        "description": "Called when indeterminate changes."
      }
    ],
    "Checkbox.Group": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "legend",
        "type": "string",
        "required": false,
        "description": "legend prop."
      },
      {
        "prop": "description",
        "type": "string | Snippet",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "string",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "value",
        "type": "string[]",
        "required": false,
        "default": "[]",
        "description": "Controlled value."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "name",
        "type": "string",
        "required": false,
        "description": "Form field name."
      },
      {
        "prop": "controlFirst",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Renders the control before label content."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string[]) => void",
        "required": false,
        "description": "Called when the value changes."
      }
    ],
    "Checkbox.Legend": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Checkbox.Item": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "checked",
        "type": "boolean",
        "required": false,
        "description": "Checked state."
      },
      {
        "prop": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Indeterminate checked state."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "variant",
        "type": "'default' | 'error'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual variant."
      },
      {
        "prop": "label",
        "type": "string",
        "required": true,
        "description": "Visible label content."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "name",
        "type": "string",
        "required": false,
        "description": "Form field name."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when checked changes."
      },
      {
        "prop": "onIndeterminateChange",
        "type": "(indeterminate: boolean) => void",
        "required": false,
        "description": "Called when indeterminate changes."
      }
    ],
    "Switch": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "checked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Checked state."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "size",
        "type": "'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "variant",
        "type": "'default' | 'neutral'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual variant."
      },
      {
        "prop": "label",
        "type": "string",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "labelTooltip",
        "type": "string | Snippet",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "controlFirst",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Renders the control before label content."
      },
      {
        "prop": "transitioning",
        "type": "boolean",
        "required": false,
        "description": "transitioning prop."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      },
      {
        "prop": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "onchange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Change event handler."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when checked changes."
      }
    ],
    "Switch.Group": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "legend",
        "type": "string",
        "required": false,
        "description": "legend prop."
      },
      {
        "prop": "description",
        "type": "string",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "string",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "controlFirst",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Renders the control before label content."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Switch.Legend": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Switch.Item": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "checked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Checked state."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "size",
        "type": "'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "variant",
        "type": "'default' | 'neutral'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual variant."
      },
      {
        "prop": "label",
        "type": "string",
        "required": true,
        "description": "Visible label content."
      },
      {
        "prop": "transitioning",
        "type": "boolean",
        "required": false,
        "description": "transitioning prop."
      },
      {
        "prop": "onchange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Change event handler."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when checked changes."
      }
    ],
    "Table": [
      {
        "prop": "layout",
        "type": "KumoTableLayout",
        "required": false,
        "description": "Table layout strategy.",
        "default": "\"auto\""
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      }
    ],
    "Table.Row": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "variant",
        "type": "'default' | 'selected'",
        "required": false,
        "description": "Visual variant."
      }
    ],
    "Table.CheckHead": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "checked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Checked state."
      },
      {
        "prop": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Indeterminate checked state."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when checked changes."
      },
      {
        "prop": "onValueChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "label",
        "type": "string",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      }
    ],
    "Table.CheckCell": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "checked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Checked state."
      },
      {
        "prop": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Indeterminate checked state."
      },
      {
        "prop": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when checked changes."
      },
      {
        "prop": "onValueChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "label",
        "type": "string",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      }
    ],
    "Table.Header": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "variant",
        "type": "'default' | 'compact'",
        "required": false,
        "default": "\"default\"",
        "description": "Visual variant."
      },
      {
        "prop": "sticky",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Sticky column or header setting."
      }
    ],
    "Table.Head": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "sticky",
        "type": "KumoTableStickyColumn",
        "required": false,
        "description": "Sticky column or header setting."
      }
    ],
    "Table.Cell": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "sticky",
        "type": "KumoTableStickyColumn",
        "required": false,
        "description": "Sticky column or header setting."
      }
    ],
    "Table.Body": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      }
    ],
    "Table.Footer": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      }
    ],
    "DatePicker": [
      {
        "prop": "mode",
        "type": "DatePickerMode",
        "required": false,
        "default": "\"single\"",
        "description": "mode prop."
      },
      {
        "prop": "selected",
        "type": "DatePickerSelection",
        "required": false,
        "description": "selected prop."
      },
      {
        "prop": "onChange",
        "type": "(selection: DatePickerSelection) => void",
        "required": false,
        "description": "onChange prop."
      },
      {
        "prop": "month",
        "type": "Date",
        "required": false,
        "description": "month prop."
      },
      {
        "prop": "onMonthChange",
        "type": "(month: Date) => void",
        "required": false,
        "description": "onMonthChange prop."
      },
      {
        "prop": "numberOfMonths",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "numberOfMonths prop."
      },
      {
        "prop": "min",
        "type": "number",
        "required": false,
        "description": "Minimum value."
      },
      {
        "prop": "max",
        "type": "number",
        "required": false,
        "description": "Maximum value."
      },
      {
        "prop": "disabled",
        "type": "boolean | DisabledMatcher",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "footer",
        "type": "Snippet | string",
        "required": false,
        "description": "footer prop."
      },
      {
        "prop": "fixedWeeks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "fixedWeeks prop."
      },
      {
        "prop": "locale",
        "type": "string",
        "required": false,
        "default": "\"en-US\"",
        "description": "locale prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "className",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "classNames",
        "type": "Record<string, string | undefined>",
        "required": false,
        "description": "classNames prop."
      }
    ],
    "Chart": [
      {
        "prop": "echarts",
        "type": "any",
        "required": true,
        "description": "ECharts module instance."
      },
      {
        "prop": "options",
        "type": "KumoChartOption",
        "required": true,
        "description": "Options rendered by the component."
      },
      {
        "prop": "optionUpdateBehavior",
        "type": "SetOptionOpts",
        "required": false,
        "description": "optionUpdateBehavior prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "isDarkMode",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "isDarkMode prop."
      },
      {
        "prop": "height",
        "type": "number",
        "required": false,
        "default": "350",
        "description": "Chart height in pixels."
      },
      {
        "prop": "onEvents",
        "type": "Partial<ChartEvents>",
        "required": false,
        "default": "{}",
        "description": "onEvents prop."
      },
      {
        "prop": "chartRef",
        "type": "EChartsType | null",
        "required": false,
        "default": "null",
        "description": "chartRef prop."
      }
    ],
    "TimeseriesChart": [
      {
        "prop": "echarts",
        "type": "any",
        "required": true,
        "description": "ECharts module instance."
      },
      {
        "prop": "type",
        "type": "'line' | 'bar'",
        "required": false,
        "default": "\"line\"",
        "description": "Element or semantic type."
      },
      {
        "prop": "data",
        "type": "TimeseriesData[]",
        "required": true,
        "description": "Chart data."
      },
      {
        "prop": "xAxisName",
        "type": "string",
        "required": false,
        "description": "xAxisName prop."
      },
      {
        "prop": "xAxisTickCount",
        "type": "number",
        "required": false,
        "description": "xAxisTickCount prop."
      },
      {
        "prop": "xAxisTickFormat",
        "type": "(value: number) => string",
        "required": false,
        "description": "xAxisTickFormat prop."
      },
      {
        "prop": "yAxisTickFormat",
        "type": "(value: number) => string",
        "required": false,
        "description": "yAxisTickFormat prop."
      },
      {
        "prop": "yAxisTickLabelFormat",
        "type": "(value: number) => string",
        "required": false,
        "description": "yAxisTickLabelFormat prop."
      },
      {
        "prop": "yAxisName",
        "type": "string",
        "required": false,
        "description": "yAxisName prop."
      },
      {
        "prop": "yAxisTickCount",
        "type": "number",
        "required": false,
        "description": "yAxisTickCount prop."
      },
      {
        "prop": "tooltipValueFormat",
        "type": "(value: number) => string",
        "required": false,
        "description": "tooltipValueFormat prop."
      },
      {
        "prop": "incomplete",
        "type": "{ before?: number; after?: number }",
        "required": false,
        "description": "incomplete prop."
      },
      {
        "prop": "height",
        "type": "number",
        "required": false,
        "default": "350",
        "description": "Chart height in pixels."
      },
      {
        "prop": "onTimeRangeChange",
        "type": "(from: number, to: number) => void",
        "required": false,
        "description": "onTimeRangeChange prop."
      },
      {
        "prop": "isDarkMode",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "isDarkMode prop."
      },
      {
        "prop": "gradient",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "gradient prop."
      },
      {
        "prop": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Loading state."
      },
      {
        "prop": "ariaDescription",
        "type": "string",
        "required": false,
        "description": "ariaDescription prop."
      },
      {
        "prop": "animation",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "animation prop."
      },
      {
        "prop": "animationDuration",
        "type": "number",
        "required": false,
        "default": "600",
        "description": "animationDuration prop."
      },
      {
        "prop": "optionUpdateBehavior",
        "type": "Record<string, unknown>",
        "required": false,
        "description": "optionUpdateBehavior prop."
      }
    ],
    "ChartLegend": [
      {
        "prop": "variant",
        "type": "'large' | 'small'",
        "required": false,
        "default": "\"small\"",
        "description": "Visual variant."
      },
      {
        "prop": "name",
        "type": "string",
        "required": true,
        "description": "Form field name."
      },
      {
        "prop": "color",
        "type": "string",
        "required": true,
        "description": "color prop."
      },
      {
        "prop": "value",
        "type": "string",
        "required": true,
        "description": "Controlled value."
      },
      {
        "prop": "unit",
        "type": "string",
        "required": false,
        "description": "unit prop."
      },
      {
        "prop": "inactive",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "inactive prop."
      }
    ],
    "SankeyChart": [
      {
        "prop": "echarts",
        "type": "any",
        "required": true,
        "description": "ECharts module instance."
      },
      {
        "prop": "nodes",
        "type": "SankeyNodeData[]",
        "required": true,
        "description": "Sankey nodes."
      },
      {
        "prop": "links",
        "type": "SankeyLinkData[]",
        "required": true,
        "description": "Sankey links."
      },
      {
        "prop": "height",
        "type": "number",
        "required": false,
        "default": "400",
        "description": "Chart height in pixels."
      },
      {
        "prop": "showNodeValues",
        "type": "boolean",
        "required": false,
        "description": "showNodeValues prop."
      },
      {
        "prop": "formatValue",
        "type": "(value: number) => string",
        "required": false,
        "description": "formatValue prop."
      },
      {
        "prop": "tooltipFormatter",
        "type": "(params: SankeyTooltipParams) => string",
        "required": false,
        "description": "tooltipFormatter prop."
      },
      {
        "prop": "nodeWidth",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "nodeWidth prop."
      },
      {
        "prop": "nodePadding",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "nodePadding prop."
      },
      {
        "prop": "showTooltip",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "showTooltip prop."
      },
      {
        "prop": "defaultNodeColor",
        "type": "string",
        "required": false,
        "description": "defaultNodeColor prop."
      },
      {
        "prop": "left",
        "type": "number | string",
        "required": false,
        "description": "left prop."
      },
      {
        "prop": "right",
        "type": "number | string",
        "required": false,
        "description": "right prop."
      },
      {
        "prop": "linkColor",
        "type": "'gradient' | 'gray'",
        "required": false,
        "default": "\"gradient\"",
        "description": "linkColor prop."
      },
      {
        "prop": "linkOpacity",
        "type": "number",
        "required": false,
        "default": "0.5",
        "description": "linkOpacity prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "isDarkMode",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "isDarkMode prop."
      },
      {
        "prop": "onNodeClick",
        "type": "(node: SankeyNodeData) => void",
        "required": false,
        "description": "onNodeClick prop."
      },
      {
        "prop": "onLinkClick",
        "type": "(link: SankeyLinkData) => void",
        "required": false,
        "description": "onLinkClick prop."
      }
    ],
    "Autocomplete": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "items",
        "type": "AutocompleteItem[]",
        "required": false,
        "default": "[]",
        "description": "Items rendered by the component."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initial uncontrolled value."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Controlled open state."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "label",
        "type": "string | Snippet",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "description",
        "type": "string | Snippet",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "FieldError",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "filter",
        "type": "((item: AutocompleteItem, query: string) => boolean) | null",
        "required": false,
        "description": "Custom item filter."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when open state changes."
      }
    ],
    "Autocomplete.InputGroup": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder text."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "description": "Size preset."
      }
    ],
    "Autocomplete.Content": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Autocomplete.List": [
      {
        "prop": "children",
        "type": "ItemSnippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Autocomplete.Item": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "value",
        "type": "AutocompleteItem",
        "required": true,
        "description": "Controlled value."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the component."
      }
    ],
    "Autocomplete.Group": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "items",
        "type": "AutocompleteItem[]",
        "required": false,
        "default": "[]",
        "description": "Items rendered by the component."
      }
    ],
    "Autocomplete.GroupLabel": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Autocomplete.Collection": [
      {
        "prop": "children",
        "type": "ItemSnippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Autocomplete.Separator": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Combobox": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "items",
        "type": "ComboboxItem[]",
        "required": false,
        "description": "Items rendered by the component."
      },
      {
        "prop": "options",
        "type": "ComboboxItem[]",
        "required": false,
        "default": "[]",
        "description": "Options rendered by the component."
      },
      {
        "prop": "value",
        "type": "unknown",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "defaultValue",
        "type": "unknown",
        "required": false,
        "description": "Initial uncontrolled value."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Controlled open state."
      },
      {
        "prop": "multiple",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Enables multiple selection."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "label",
        "type": "string | Snippet",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "labelTooltip",
        "type": "string | Snippet",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "description",
        "type": "string | Snippet",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "FieldError",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "filter",
        "type": "((item: ComboboxItem, query: string) => boolean) | null",
        "required": false,
        "description": "Custom item filter."
      },
      {
        "prop": "isItemEqualToValue",
        "type": "(item: unknown, value: unknown) => boolean",
        "required": false,
        "description": "isItemEqualToValue prop."
      },
      {
        "prop": "onValueChange",
        "type": "(value: unknown) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when open state changes."
      }
    ],
    "Combobox.Content": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Combobox.Item": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "value",
        "type": "ComboboxItem",
        "required": true,
        "description": "Controlled value."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the component."
      }
    ],
    "Combobox.Input": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder text."
      }
    ],
    "Combobox.Trigger": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Combobox.Value": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      }
    ],
    "ClipboardText": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "text",
        "type": "string",
        "required": false,
        "description": "Text content."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "textToCopy",
        "type": "string",
        "required": false,
        "description": "Alternate text copied to the clipboard."
      },
      {
        "prop": "size",
        "type": "'sm' | 'base' | 'lg'",
        "required": false,
        "description": "Size preset.",
        "default": "\"lg\""
      },
      {
        "prop": "onCopy",
        "type": "() => void",
        "required": false,
        "description": "Called after copying succeeds."
      },
      {
        "prop": "tooltip",
        "type": "{ text?: string; copiedText?: string; side?: TooltipSide; }",
        "required": false,
        "description": "Tooltip content."
      },
      {
        "prop": "labels",
        "type": "{ copyAction?: string; }",
        "required": false,
        "default": "{}",
        "description": "labels prop."
      }
    ],
    "Empty": [
      {
        "prop": "size",
        "type": "'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "contents",
        "type": "Snippet",
        "required": false,
        "description": "Custom empty-state content."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "icon",
        "type": "Snippet",
        "required": false,
        "description": "Icon rendered by the component."
      },
      {
        "prop": "title",
        "type": "string",
        "required": true,
        "description": "Title content."
      },
      {
        "prop": "description",
        "type": "string",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "commandLine",
        "type": "string",
        "required": false,
        "description": "commandLine prop."
      }
    ],
    "LayerCard": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "as",
        "type": "string",
        "required": false,
        "default": "\"div\"",
        "description": "as prop."
      }
    ],
    "Loader": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "size",
        "type": "KumoLoaderSize | number",
        "required": false,
        "description": "Size preset.",
        "default": "\"base\""
      },
      {
        "prop": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label."
      }
    ],
    "SkeletonLine": [
      {
        "prop": "minWidth",
        "type": "number",
        "required": false,
        "default": "30",
        "description": "minWidth prop."
      },
      {
        "prop": "maxWidth",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "maxWidth prop."
      },
      {
        "prop": "minDuration",
        "type": "number",
        "required": false,
        "default": "1.3",
        "description": "minDuration prop."
      },
      {
        "prop": "maxDuration",
        "type": "number",
        "required": false,
        "default": "1.7",
        "description": "maxDuration prop."
      },
      {
        "prop": "minDelay",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "minDelay prop."
      },
      {
        "prop": "maxDelay",
        "type": "number",
        "required": false,
        "default": "0.5",
        "description": "maxDelay prop."
      },
      {
        "prop": "blockHeight",
        "type": "string | number",
        "required": false,
        "description": "blockHeight prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Meter": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "value",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Controlled value."
      },
      {
        "prop": "min",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Minimum value."
      },
      {
        "prop": "max",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "Maximum value."
      },
      {
        "prop": "customValue",
        "type": "string",
        "required": false,
        "description": "Custom value label."
      },
      {
        "prop": "label",
        "type": "string",
        "required": true,
        "description": "Visible label content."
      },
      {
        "prop": "showValue",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the current value."
      },
      {
        "prop": "trackClassName",
        "type": "string",
        "required": false,
        "description": "Class for the meter track."
      },
      {
        "prop": "indicatorClassName",
        "type": "string",
        "required": false,
        "description": "Class for the meter indicator."
      }
    ],
    "Text": [
      {
        "prop": "variant",
        "type": "'heading1' | 'heading2' | 'heading3' | 'body' | 'secondary' | 'mono' | 'mono-secondary' | 'success' | 'error'",
        "required": false,
        "description": "Visual variant.",
        "default": "\"body\""
      },
      {
        "prop": "color",
        "type": "'default' | 'subtle' | 'success' | 'error'",
        "required": false,
        "description": "color prop."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "description": "Size preset.",
        "default": "\"base\""
      },
      {
        "prop": "bold",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "bold prop."
      },
      {
        "prop": "truncate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "truncate prop."
      },
      {
        "prop": "as",
        "type": "TextElement",
        "required": false,
        "description": "as prop."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "DANGEROUS_className",
        "type": "string",
        "required": false,
        "description": "DANGEROUS_className prop."
      },
      {
        "prop": "DANGEROUS_style",
        "type": "string",
        "required": false,
        "description": "DANGEROUS_style prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "style",
        "type": "string",
        "required": false,
        "description": "Inline style string."
      }
    ],
    "Toasty": [
      {
        "prop": "children",
        "type": "Snippet<[KumoToastManager]>",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "toastManager",
        "type": "KumoToastManager",
        "required": false,
        "description": "Toast manager instance."
      },
      {
        "prop": "visibleToasts",
        "type": "number",
        "required": false,
        "description": "Number of visible toasts."
      }
    ],
    "TableOfContents": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "items",
        "type": "Item[]",
        "required": false,
        "default": "[]",
        "description": "Items rendered by the component."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label."
      }
    ],
    "TableOfContents.Title": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "TableOfContents.List": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "TableOfContents.Item": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "active",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "active prop."
      },
      {
        "prop": "href",
        "type": "string",
        "required": false,
        "description": "Destination URL."
      },
      {
        "prop": "as",
        "type": "'a' | 'button'",
        "required": false,
        "default": "\"a\"",
        "description": "as prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "TableOfContents.Group": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "label",
        "type": "string",
        "required": true,
        "description": "Visible label content."
      },
      {
        "prop": "href",
        "type": "string",
        "required": false,
        "description": "Destination URL."
      },
      {
        "prop": "active",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "active prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Sidebar": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "items",
        "type": "Item[]",
        "required": false,
        "default": "[]",
        "description": "Items rendered by the component."
      }
    ],
    "SensitiveInput": [
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "defaultValue",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Initial uncontrolled value."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "onCopy",
        "type": "() => void",
        "required": false,
        "description": "Called after copying succeeds."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "description": "Size preset.",
        "default": "\"base\""
      },
      {
        "prop": "variant",
        "type": "'default' | 'error'",
        "required": false,
        "description": "Visual variant.",
        "default": "\"default\""
      },
      {
        "prop": "label",
        "type": "FieldText",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "labelTooltip",
        "type": "FieldText",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "description",
        "type": "FieldText",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "FieldError",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the input read-only."
      },
      {
        "prop": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the input read-only."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "autocomplete",
        "type": "string",
        "required": false,
        "description": "Autocomplete attribute."
      },
      {
        "prop": "autoComplete",
        "type": "string",
        "required": false,
        "default": "\"off\"",
        "description": "Autocomplete attribute."
      },
      {
        "prop": "oninput",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Input event handler."
      },
      {
        "prop": "onchange",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Change event handler."
      },
      {
        "prop": "onblur",
        "type": "(event: FocusEvent) => void",
        "required": false,
        "description": "Blur event handler."
      },
      {
        "prop": "onkeydown",
        "type": "(event: KeyboardEvent) => void",
        "required": false,
        "description": "Keydown event handler."
      }
    ],
    "MenuBar": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "isActive",
        "type": "number | boolean | string",
        "required": false,
        "description": "isActive prop."
      },
      {
        "prop": "options",
        "type": "MenuOptionProps[]",
        "required": false,
        "default": "[]",
        "description": "Options rendered by the component."
      },
      {
        "prop": "optionIds",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "optionIds prop."
      }
    ],
    "InputGroup": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "default": "\"base\"",
        "description": "Size preset."
      },
      {
        "prop": "focusMode",
        "type": "InputGroupFocusMode",
        "required": false,
        "default": "\"container\"",
        "description": "focusMode prop."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "label",
        "type": "string | Snippet",
        "required": false,
        "description": "Visible label content."
      },
      {
        "prop": "labelTooltip",
        "type": "string | Snippet",
        "required": false,
        "description": "Optional help content for the label."
      },
      {
        "prop": "description",
        "type": "string",
        "required": false,
        "description": "Supporting description text."
      },
      {
        "prop": "error",
        "type": "FieldError",
        "required": false,
        "description": "Validation error message or matcher."
      },
      {
        "prop": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the field as required."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      }
    ],
    "InputGroupInput": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "value",
        "type": "string | number",
        "required": false,
        "default": "\"\"",
        "description": "Controlled value."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "oninput",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Input event handler."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the component."
      }
    ],
    "InputGroupAddon": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "align",
        "type": "'start' | 'end'",
        "required": false,
        "default": "\"start\"",
        "description": "Floating alignment."
      },
      {
        "prop": "containsButton",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "containsButton prop."
      }
    ],
    "InputGroupButton": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      },
      {
        "prop": "variant",
        "type": "'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline'",
        "required": false,
        "default": "\"ghost\"",
        "description": "Visual variant."
      },
      {
        "prop": "size",
        "type": "'xs' | 'sm' | 'base' | 'lg'",
        "required": false,
        "description": "Size preset."
      },
      {
        "prop": "shape",
        "type": "'base' | 'square' | 'circle'",
        "required": false,
        "description": "Shape preset."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the component."
      },
      {
        "prop": "tooltip",
        "type": "string",
        "required": false,
        "description": "Tooltip content."
      },
      {
        "prop": "tooltipSide",
        "type": "string",
        "required": false,
        "description": "tooltipSide prop."
      }
    ],
    "InputGroupSuffix": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Popover": [
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state."
      },
      {
        "prop": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state for uncontrolled usage."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the open state changes."
      },
      {
        "prop": "modal",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Whether the popover is modal."
      }
    ],
    "PopoverRoot": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Controlled open state."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when open state changes."
      },
      {
        "prop": "onOpenChangeComplete",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called after the open-state transition completes."
      }
    ],
    "PopoverTrigger": [
      {
        "prop": "render",
        "type": "Snippet | Component",
        "required": false,
        "description": "Custom trigger render target."
      },
      {
        "prop": "openOnHover",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Opens the popover on hover."
      },
      {
        "prop": "delay",
        "type": "number",
        "required": false,
        "default": "700",
        "description": "Delay before opening on hover, in milliseconds."
      }
    ],
    "PopoverContent": [
      {
        "prop": "side",
        "type": "'top' | 'right' | 'bottom' | 'left'",
        "required": false,
        "default": "\"bottom\"",
        "description": "Preferred side of the trigger."
      },
      {
        "prop": "anchor",
        "type": "HTMLElement | null",
        "required": false,
        "description": "Custom anchor element."
      },
      {
        "prop": "align",
        "type": "'start' | 'center' | 'end'",
        "required": false,
        "default": "\"center\"",
        "description": "Alignment relative to the anchor."
      },
      {
        "prop": "sideOffset",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Distance from the anchor side."
      },
      {
        "prop": "alignOffset",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Offset along the alignment axis."
      },
      {
        "prop": "positionMethod",
        "type": "'absolute' | 'fixed'",
        "required": false,
        "default": "\"absolute\"",
        "description": "CSS positioning strategy."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the content."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Popover content."
      },
      {
        "prop": "container",
        "type": "HTMLElement",
        "required": false,
        "default": "document.body (or KumoPortalProvider container)",
        "description": "Portal container for custom roots or Shadow DOM."
      }
    ],
    "PopoverTitle": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the title."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Title content."
      }
    ],
    "PopoverDescription": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the description."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Description content."
      }
    ],
    "PopoverClose": [
      {
        "prop": "render",
        "type": "Snippet | Component",
        "required": false,
        "description": "Custom close render target."
      },
      {
        "prop": "asChild",
        "type": "boolean",
        "required": false,
        "description": "Render as a child element."
      }
    ],
    "Breadcrumbs": [
      {
        "prop": "size",
        "type": "'sm' | 'base'",
        "required": false,
        "description": "Size preset.",
        "default": "\"base\""
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "className",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "items",
        "type": "BreadcrumbsItem[]",
        "required": false,
        "default": "[]",
        "description": "Items rendered by the component."
      }
    ],
    "Breadcrumbs.Link": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "href",
        "type": "string",
        "required": true,
        "description": "Destination URL."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      }
    ],
    "Breadcrumbs.Current": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "icon",
        "type": "Component",
        "required": false,
        "description": "Icon rendered by the component."
      },
      {
        "prop": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Loading state."
      }
    ],
    "Breadcrumbs.Separator": [],
    "Breadcrumbs.Clipboard": [
      {
        "prop": "text",
        "type": "string",
        "required": true,
        "description": "Text content."
      }
    ],
    "CloudflareLogo": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "variant",
        "type": "'glyph' | 'full'",
        "required": false,
        "description": "Visual variant.",
        "default": "\"full\""
      },
      {
        "prop": "color",
        "type": "CloudflareLogoColor",
        "required": false,
        "description": "color prop.",
        "default": "\"color\""
      },
      {
        "prop": "href",
        "type": "string",
        "required": false,
        "default": "\"https://www.cloudflare.com\"",
        "description": "Destination URL."
      },
      {
        "prop": "poweredBy",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "poweredBy prop."
      }
    ],
    "CloudflareLogo.PoweredByCloudflare": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "color",
        "type": "CloudflareLogoColor",
        "required": false,
        "description": "color prop."
      },
      {
        "prop": "href",
        "type": "string",
        "required": false,
        "description": "Destination URL."
      }
    ],
    "Label": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "for",
        "type": "string",
        "required": false,
        "description": "for prop."
      },
      {
        "prop": "htmlFor",
        "type": "string",
        "required": false,
        "description": "htmlFor prop."
      },
      {
        "prop": "showOptional",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "showOptional prop."
      },
      {
        "prop": "tooltip",
        "type": "string | Snippet",
        "required": false,
        "description": "Tooltip content."
      },
      {
        "prop": "asContent",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "asContent prop."
      }
    ],
    "Collapsible": [
      {
        "prop": "trigger",
        "type": "Snippet",
        "required": false,
        "description": "trigger prop."
      },
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state."
      },
      {
        "prop": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial uncontrolled open state."
      },
      {
        "prop": "title",
        "type": "string",
        "required": false,
        "description": "Title content."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when open state changes."
      },
      {
        "prop": "onOpenChangeComplete",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called after the open-state transition completes."
      }
    ],
    "Collapsible.Root": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state."
      },
      {
        "prop": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial uncontrolled open state."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when open state changes."
      },
      {
        "prop": "onOpenChangeComplete",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called after the open-state transition completes."
      }
    ],
    "Collapsible.Trigger": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "type",
        "type": "'button' | 'submit' | 'reset'",
        "required": false,
        "default": "\"button\"",
        "description": "Element or semantic type."
      }
    ],
    "Collapsible.Panel": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "keepMounted",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "keepMounted prop."
      },
      {
        "prop": "forceMount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "forceMount prop."
      },
      {
        "prop": "hiddenUntilFound",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "hiddenUntilFound prop."
      }
    ],
    "Collapsible.DefaultTrigger": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      }
    ],
    "Collapsible.DefaultPanel": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "keepMounted",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "keepMounted prop."
      },
      {
        "prop": "forceMount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "forceMount prop."
      },
      {
        "prop": "hiddenUntilFound",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "hiddenUntilFound prop."
      }
    ],
    "Flow": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "orientation",
        "type": "FlowOrientation",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Layout orientation."
      },
      {
        "prop": "align",
        "type": "'start' | 'center' | 'end'",
        "required": false,
        "default": "\"start\"",
        "description": "Floating alignment."
      },
      {
        "prop": "canvas",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "canvas prop."
      },
      {
        "prop": "padding",
        "type": "{ x?: number; y?: number }",
        "required": false,
        "description": "padding prop."
      }
    ],
    "Flow.Node": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "id",
        "type": "string",
        "required": false,
        "description": "Element id."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the component."
      },
      {
        "prop": "bare",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "bare prop."
      }
    ],
    "Flow.Anchor": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "type",
        "type": "'start' | 'end'",
        "required": false,
        "description": "Element or semantic type."
      }
    ],
    "Flow.Parallel": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "align",
        "type": "'start' | 'end'",
        "required": false,
        "default": "\"start\"",
        "description": "Floating alignment."
      }
    ],
    "Flow.List": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Pagination": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "page",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "page prop."
      },
      {
        "prop": "setPage",
        "type": "(page: number) => void",
        "required": false,
        "description": "setPage prop."
      },
      {
        "prop": "perPage",
        "type": "number",
        "required": false,
        "description": "perPage prop."
      },
      {
        "prop": "totalCount",
        "type": "number",
        "required": false,
        "description": "totalCount prop."
      },
      {
        "prop": "pages",
        "type": "number",
        "required": false,
        "description": "pages prop."
      },
      {
        "prop": "controls",
        "type": "Controls",
        "required": false,
        "description": "controls prop.",
        "default": "\"full\""
      },
      {
        "prop": "text",
        "type": "(props: InfoTextProps) => unknown",
        "required": false,
        "description": "Text content."
      },
      {
        "prop": "labels",
        "type": "PaginationLabels",
        "required": false,
        "description": "labels prop."
      }
    ],
    "Pagination.Controls": [
      {
        "prop": "controls",
        "type": "Controls",
        "required": false,
        "default": "\"full\"",
        "description": "controls prop."
      },
      {
        "prop": "pageSelector",
        "type": "PageSelector",
        "required": false,
        "default": "\"input\"",
        "description": "pageSelector prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Pagination.Info": [
      {
        "prop": "children",
        "type": "Snippet<[RenderProps]>",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "text",
        "type": "(props: RenderProps) => unknown",
        "required": false,
        "description": "Text content."
      }
    ],
    "Pagination.PageSize": [
      {
        "prop": "value",
        "type": "number",
        "required": true,
        "description": "Controlled value."
      },
      {
        "prop": "onChange",
        "type": "(size: number) => void",
        "required": true,
        "description": "onChange prop."
      },
      {
        "prop": "options",
        "type": "number[]",
        "required": false,
        "description": "Options rendered by the component."
      },
      {
        "prop": "label",
        "type": "string | Snippet",
        "required": false,
        "default": "\"Per page:\"",
        "description": "Visible label content."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "Pagination.Separator": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "CodeHighlighted": [
      {
        "prop": "code",
        "type": "string",
        "required": true,
        "description": "Code string to render."
      },
      {
        "prop": "lang",
        "type": "CodeHighlightedLang",
        "required": false,
        "default": "\"typescript\"",
        "description": "Code language."
      },
      {
        "prop": "showCopyButton",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the copy button."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "style",
        "type": "string",
        "required": false,
        "description": "Inline style string."
      }
    ],
    "CommandPalette": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "commands",
        "type": "CommandPaletteCommand[]",
        "required": false,
        "default": "[]",
        "description": "commands prop."
      },
      {
        "prop": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Type a command...\"",
        "description": "Placeholder text."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Controlled value."
      },
      {
        "prop": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the value changes."
      },
      {
        "prop": "onSelect",
        "type": "(command: CommandPaletteCommand, options: { newTab: boolean }) => void",
        "required": false,
        "description": "onSelect prop."
      },
      {
        "prop": "label",
        "type": "string",
        "required": false,
        "default": "\"Command menu\"",
        "description": "Visible label content."
      },
      {
        "prop": "loop",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "loop prop."
      },
      {
        "prop": "shouldFilter",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "shouldFilter prop."
      },
      {
        "prop": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Loading state."
      },
      {
        "prop": "loadingText",
        "type": "string",
        "required": false,
        "default": "\"Loading...\"",
        "description": "loadingText prop."
      },
      {
        "prop": "emptyText",
        "type": "string",
        "required": false,
        "default": "\"No results found.\"",
        "description": "emptyText prop."
      },
      {
        "prop": "inputClass",
        "type": "string",
        "required": false,
        "description": "inputClass prop."
      },
      {
        "prop": "listClass",
        "type": "string",
        "required": false,
        "description": "listClass prop."
      },
      {
        "prop": "itemClass",
        "type": "string",
        "required": false,
        "description": "itemClass prop."
      },
      {
        "prop": "inputProps",
        "type": "Record<string, unknown>",
        "required": false,
        "description": "inputProps prop."
      }
    ],
    "CommandPalette.Dialog": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "trigger",
        "type": "Snippet<[Record<string, unknown>]>",
        "required": false,
        "description": "trigger prop."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Controlled open state."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when open state changes."
      }
    ],
    "CommandPalette.Input": [
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Controlled value."
      },
      {
        "prop": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Type a command...\"",
        "description": "Placeholder text."
      }
    ],
    "CommandPalette.Item": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "keywords",
        "type": "string[]",
        "required": false,
        "description": "keywords prop."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the component."
      },
      {
        "prop": "forceMount",
        "type": "boolean",
        "required": false,
        "description": "forceMount prop."
      },
      {
        "prop": "onSelect",
        "type": "() => void",
        "required": false,
        "description": "onSelect prop."
      }
    ],
    "CommandPalette.ResultItem": [],
    "CommandPalette.Footer": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "CommandPalette.List": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "CommandPalette.Group": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "value",
        "type": "string",
        "required": false,
        "description": "Controlled value."
      },
      {
        "prop": "forceMount",
        "type": "boolean",
        "required": false,
        "description": "forceMount prop."
      }
    ],
    "CommandPalette.GroupLabel": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      }
    ],
    "CommandPalette.Empty": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "forceMount",
        "type": "boolean",
        "required": false,
        "description": "forceMount prop."
      }
    ],
    "CommandPalette.Loading": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "progress",
        "type": "number",
        "required": false,
        "description": "progress prop."
      }
    ],
    "Surface": [
      {
        "prop": "children",
        "type": "Snippet",
        "required": false,
        "description": "Child snippet rendered by the component."
      },
      {
        "prop": "class",
        "type": "string",
        "required": false,
        "description": "Additional classes merged onto the root element."
      },
      {
        "prop": "as",
        "type": "string",
        "required": false,
        "default": "\"div\"",
        "description": "as prop."
      },
      {
        "prop": "color",
        "type": "SurfaceColor",
        "required": false,
        "default": "\"primary\"",
        "description": "color prop."
      }
    ],
    "Dialog.Root": [
      {
        "prop": "role",
        "type": "'dialog' | 'alertdialog'",
        "required": false,
        "default": "\"dialog\"",
        "description": "ARIA role for the dialog."
      },
      {
        "prop": "disablePointerDismissal",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Prevents pointer dismissal when true."
      },
      {
        "prop": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state."
      },
      {
        "prop": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state for uncontrolled usage."
      },
      {
        "prop": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the open state changes."
      },
      {
        "prop": "modal",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Whether the dialog is modal."
      },
      {
        "prop": "dismissible",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Whether the dialog can be dismissed."
      }
    ],
    "Dialog.Trigger": [
      {
        "prop": "render",
        "type": "Snippet | Component",
        "required": false,
        "description": "Custom trigger render target."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the trigger."
      }
    ],
    "Dialog.Title": [
      {
        "prop": "render",
        "type": "Snippet | Component",
        "required": false,
        "description": "Custom title render target."
      }
    ],
    "Dialog.Description": [
      {
        "prop": "render",
        "type": "Snippet | Component",
        "required": false,
        "description": "Custom description render target."
      }
    ],
    "Dialog.Close": [
      {
        "prop": "render",
        "type": "Snippet | Component",
        "required": false,
        "description": "Custom close render target."
      },
      {
        "prop": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the close control."
      }
    ]
  };

  const aliases: Record<string, string> = {
    'DropdownMenu.LinkItem': 'DropdownMenu.Item',
    'DropdownMenu.Sub': 'DropdownMenu',
    'InputGroup.Input': 'InputGroupInput',
    'InputGroup.Addon': 'InputGroupAddon',
    'InputGroup.Button': 'InputGroupButton',
    'InputGroup.Suffix': 'InputGroupSuffix',
    'Popover.Root': 'Popover',
    'Popover.Trigger': 'PopoverTrigger',
    'Popover.Content': 'PopoverContent',
    'Popover.Title': 'PopoverTitle',
    'Popover.Description': 'PopoverDescription',
    'Popover.Close': 'PopoverClose',
    'Tooltip.Provider': 'Tooltip',
    'Select.Option': 'Select',
    LinkButton: 'Button.LinkButton',
    PoweredByCloudflare: 'CloudflareLogo.PoweredByCloudflare'
  };

  const omittedProps: Record<string, string[]> = {
    Button: ['href', 'external'],
    Input: ['children'],
    Checkbox: ['children', 'description', 'error'],
    Switch: ['children', 'description', 'error'],
    Tabs: ['children', 'items', 'class', 'className', 'triggerClass', 'contentClass'],
    TableOfContents: ['items'],
    Sidebar: ['items'],
    Empty: ['children'],
    CloudflareLogo: ['children', 'href', 'poweredBy'],
    Label: ['for']
  };

  const requiredProps: Record<string, string[]> = {
    Meter: ['label'],
    Empty: ['title'],
    Label: ['children'],
    ClipboardText: ['text'],
    CodeHighlighted: ['code', 'lang'],
    DatePicker: ['mode'],
    'Collapsible.DefaultTrigger': ['children'],
    'Collapsible.DefaultPanel': ['children'],
    'Flow.Parallel': ['children'],
    'Flow.List': ['children'],
    'Checkbox.Group': ['children'],
    'Checkbox.Legend': ['children'],
    'Checkbox.Item': ['label'],
    'Radio.Group': ['children'],
    'Radio.Legend': ['children'],
    'Radio.Item': ['label', 'value'],
    'Switch.Group': ['children'],
    'Switch.Legend': ['children'],
    'Switch.Item': ['label'],
    'DropdownMenu.RadioItem': ['value'],
    'Breadcrumbs.Link': ['href'],
    'Breadcrumbs.Clipboard': ['text'],
    'MenuBar': ['isActive', 'options'],
    'Pagination': ['setPage'],
    'Pagination.PageSize': ['value', 'onChange'],
    'TableOfContents.Group': ['label'],
    Tooltip: ['content'],
    Autocomplete: ['items'],
    Combobox: ['items']
  };

  const snippetPropsOmittedByComponent: Record<string, string[]> = {
    'Dialog.Root': ['class'],
    'Dialog.Title': ['children'],
    'Dialog.Description': ['children'],
    'Dialog.Close': ['class'],
    'PopoverTitle': ['children'],
    'PopoverDescription': ['children'],
    'Table.Row': ['children'],
    'Table.Header': ['children'],
    'Table.Head': ['children'],
    'Table.Cell': ['children'],
    'Table.Body': ['children'],
    'Table.Footer': ['children'],
    'TableOfContents.Title': ['children'],
    'TableOfContents.List': ['children'],
    'DropdownMenu.Separator': ['children'],
    'Pagination.Controls': ['children'],
    'Pagination.PageSize': ['children'],
    'Pagination.Separator': ['children'],
    'CommandPalette.Input': ['children'],
    'CommandPalette.ResultItem': ['class', 'children']
  };

  const topLevelComponentKeys = new Set([
    'Autocomplete',
    'Badge',
    'Banner',
    'Breadcrumbs',
    'Button',
    'Chart',
    'Checkbox',
    'ClipboardText',
    'CloudflareLogo',
    'CodeHighlighted',
    'Collapsible',
    'Combobox',
    'CommandPalette',
    'DatePicker',
    'DeleteResource',
    'Dialog',
    'DropdownMenu',
    'Empty',
    'Flow',
    'Grid',
    'Input',
    'InputArea',
    'InputGroup',
    'Label',
    'LayerCard',
    'Link',
    'Button.LinkButton',
    'Loader',
    'MenuBar',
    'Meter',
    'PageHeader',
    'Pagination',
    'Popover',
    'Radio',
    'SankeyChart',
    'Select',
    'SensitiveInput',
    'Sidebar',
    'SkeletonLine',
    'Surface',
    'Switch',
    'Table',
    'TableOfContents',
    'Tabs',
    'Text',
    'TimeseriesChart',
    'Toasty',
    'Tooltip'
  ]);

  const key = $derived(component ?? sourceFile ?? 'Component');
  const resolvedKey = $derived(aliases[key] ?? key);
  const rows = $derived.by(() => {
    const isTopLevelComponent = topLevelComponentKeys.has(key);
    const omitted = new Set([
      ...(omittedProps[key] ?? omittedProps[resolvedKey] ?? []),
      ...(snippetPropsOmittedByComponent[key] ?? snippetPropsOmittedByComponent[resolvedKey] ?? []),
      ...(isTopLevelComponent ? [] : ['class', 'children'])
    ]);
    const required = new Set(requiredProps[key] ?? requiredProps[resolvedKey] ?? []);
    return (rowsByComponent[resolvedKey] ?? [])
      .filter((row) => !omitted.has(row.prop))
      .map((row) => ({ ...row, required: row.required || required.has(row.prop) }));
  });
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
      {:else}
        <tr>
          <td class="px-4 py-3 text-sm text-kumo-subtle" colspan="4">
            No component-specific props. Accepts standard HTML attributes.
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
