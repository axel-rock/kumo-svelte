import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Node content rendered inside the default styled node."
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
    "description": "Optional identifier used as the data-node-id attribute."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "When true, connectors linking to this node are greyed out."
  }
];

export default rows;
