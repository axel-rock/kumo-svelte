import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export type FlowOrientation = 'horizontal' | 'vertical';
export type FlowAlign = 'start' | 'center';

export interface FlowContextValue {
  orientation: FlowOrientation;
  align: FlowAlign;
}

export type RectLike = {
  x: number;
  y: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

export type FlowNodeData = {
  parallel?: boolean;
  disabled?: boolean;
  start?: RectLike | null;
  end?: RectLike | null;
};

export type DescendantInfo<T = FlowNodeData> = {
  id: string;
  props: T;
  order: number;
};

export interface DescendantGroup<T = FlowNodeData> {
  descendants: Writable<DescendantInfo<T>[]>;
  epoch: Writable<number>;
  register: (id: string, props: T) => () => void;
  update: (id: string, props: T) => void;
  notifySizeChange: () => void;
  getSnapshot: () => DescendantInfo<T>[];
}

export interface FlowAnchorContextValue {
  registerStartAnchor: (node: HTMLElement | null) => void;
  registerEndAnchor: (node: HTMLElement | null) => void;
}

const FLOW_CONTEXT = 'kumo-flow';
const FLOW_NODE_GROUP_CONTEXT = 'kumo-flow-node-group';
const FLOW_ANCHOR_CONTEXT = 'kumo-flow-anchor';

export function setFlowContext(context: FlowContextValue) {
  setContext(FLOW_CONTEXT, context);
}

export function getFlowContext() {
  return getContext<FlowContextValue | undefined>(FLOW_CONTEXT);
}

export function createDescendantGroup<T = FlowNodeData>(): DescendantGroup<T> {
  const descendants = writable<DescendantInfo<T>[]>([]);
  const epoch = writable(0);
  const nodes = new Map<string, DescendantInfo<T>>();
  let order = 0;

  const propsEqual = (a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

  const publish = () => {
    descendants.set(Array.from(nodes.values()).sort((a, b) => a.order - b.order));
  };

  const notifySizeChange = () => {
    epoch.update((value) => value + 1);
  };

  return {
    descendants,
    epoch,
    register(id, props) {
      if (!nodes.has(id)) {
        nodes.set(id, { id, props, order: order++ });
        publish();
        notifySizeChange();
      } else if (!propsEqual(nodes.get(id)!.props, props)) {
        nodes.set(id, { ...nodes.get(id)!, props });
        publish();
      }

      return () => {
        if (!nodes.has(id)) return;
        nodes.delete(id);
        publish();
        notifySizeChange();
      };
    },
    update(id, props) {
      const existing = nodes.get(id);
      if (!existing) {
        nodes.set(id, { id, props, order: order++ });
        publish();
        notifySizeChange();
        return;
      }

      if (!propsEqual(existing.props, props)) {
        nodes.set(id, { ...existing, props });
        publish();
      }
    },
    notifySizeChange,
    getSnapshot() {
      return Array.from(nodes.values()).sort((a, b) => a.order - b.order);
    }
  };
}

export function setNodeGroupContext<T = FlowNodeData>(group: DescendantGroup<T>) {
  setContext(FLOW_NODE_GROUP_CONTEXT, group);
}

export function getNodeGroupContext<T = FlowNodeData>() {
  const group = getContext<DescendantGroup<T> | undefined>(FLOW_NODE_GROUP_CONTEXT);
  if (!group) {
    throw new Error('Flow.Node must be used within Flow');
  }
  return group;
}

export function getOptionalNodeGroupContext<T = FlowNodeData>() {
  return getContext<DescendantGroup<T> | undefined>(FLOW_NODE_GROUP_CONTEXT);
}

export function setFlowAnchorContext(context: FlowAnchorContextValue) {
  setContext(FLOW_ANCHOR_CONTEXT, context);
}

export function getFlowAnchorContext() {
  const context = getContext<FlowAnchorContextValue | undefined>(FLOW_ANCHOR_CONTEXT);
  if (!context) {
    throw new Error('Flow.Anchor must be used within Flow.Node');
  }
  return context;
}
