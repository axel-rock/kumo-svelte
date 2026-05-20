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
  }
];

export default rows;
