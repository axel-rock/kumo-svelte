import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Compound component children for custom layouts."
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
    "description": "Current page number (1-indexed)."
  },
  {
    "prop": "setPage",
    "type": "(page: number) => void",
    "required": false,
    "description": "Callback fired when the current page changes. In Svelte, bind:page can be used instead."
  },
  {
    "prop": "perPage",
    "type": "number",
    "required": false,
    "description": "Number of items displayed per page."
  },
  {
    "prop": "totalCount",
    "type": "number",
    "required": false,
    "description": "Total number of items across all pages."
  },
  {
    "prop": "controls",
    "type": "'full' | 'simple'",
    "required": false,
    "description": "Legacy API control density.",
    "default": "\"full\""
  },
  {
    "prop": "text",
    "type": "(props: { page?: number; perPage?: number; totalCount?: number; pageShowingRange: string }) => unknown",
    "required": false,
    "description": "Deprecated legacy render function for the info text. Prefer Pagination.Info children."
  },
  {
    "prop": "labels",
    "type": "PaginationLabels",
    "required": false,
    "description": "Labels for internationalization of aria-labels."
  }
];

export default rows;
