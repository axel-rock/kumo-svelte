import FlowRoot from './Flow.svelte';
import FlowAnchor from './FlowAnchor.svelte';
import FlowList from './FlowList.svelte';
import FlowNode from './FlowNode.svelte';
import FlowParallel from './FlowParallel.svelte';

export { default as FlowRoot } from './Flow.svelte';
export { default as FlowAnchor } from './FlowAnchor.svelte';
export { default as FlowList } from './FlowList.svelte';
export { default as FlowNode } from './FlowNode.svelte';
export { default as FlowParallel } from './FlowParallel.svelte';

export const Flow = Object.assign(FlowRoot, {
  Node: FlowNode,
  Parallel: FlowParallel,
  List: FlowList,
  Anchor: FlowAnchor
}) as typeof FlowRoot & {
  Node: typeof FlowNode;
  Parallel: typeof FlowParallel;
  List: typeof FlowList;
  Anchor: typeof FlowAnchor;
};

export type { FlowAlign, FlowOrientation } from './context';
