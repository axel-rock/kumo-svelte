import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet<[KumoToastManager]>",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "toastManager",
    "type": "KumoToastManager",
    "required": false,
    "description": "Optional toast manager created by createKumoToastManager()."
  },
  {
    "prop": "container",
    "type": "HTMLElement | string",
    "required": false,
    "default": "document.body",
    "description": "Portal container for custom roots or Shadow DOM."
  }
];

export default rows;
