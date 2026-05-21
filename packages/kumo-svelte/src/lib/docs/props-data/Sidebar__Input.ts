import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'placeholder', type: 'string', default: '"Search..."', description: 'Placeholder text displayed inside the search trigger.' },
  { prop: 'shortcut', type: 'string', description: 'Keyboard shortcut hint, such as "⌘K".' },
  { prop: 'children', type: 'Snippet', description: 'Custom visible label. Falls back to placeholder.' },
  { prop: 'class', type: 'string', description: 'Additional classes.' }
];

export default rows;
