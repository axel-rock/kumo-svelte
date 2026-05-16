import { getContext, setContext } from 'svelte';

export type FlowOrientation = 'horizontal' | 'vertical';
export type FlowAlign = 'start' | 'center';

export interface FlowContextValue {
  orientation: FlowOrientation;
  align: FlowAlign;
}

const FLOW_CONTEXT = 'kumo-flow';

export function setFlowContext(context: FlowContextValue) {
  setContext(FLOW_CONTEXT, context);
}

export function getFlowContext() {
  return getContext<FlowContextValue | undefined>(FLOW_CONTEXT);
}
