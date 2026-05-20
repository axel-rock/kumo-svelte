import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "code",
    "type": "string",
    "required": true,
    "description": "Code string to display."
  },
  {
    "prop": "lang",
    "type": "'ts' | 'tsx' | 'jsonc' | 'bash' | 'css'",
    "required": false,
    "default": "\"ts\"",
    "description": "Language hint for the code content."
  },
  {
    "prop": "values",
    "type": "Record<string, { value: string; highlight?: boolean; }>",
    "required": false,
    "description": "Template values for interpolation."
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
    "description": "Inline styles."
  }
];

export default rows;
