import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'active', type: 'boolean', default: 'false', description: 'Marks this sub-item as currently active.' },
  { prop: 'href', type: 'string', description: 'Navigation URL. When set, renders as a link.' },
  { prop: 'children', type: 'Snippet', description: 'Sub-menu button label and inline content.' },
  { prop: 'class', type: 'string', description: 'Additional classes.' }
];

export default rows;
