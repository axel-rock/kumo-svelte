import { kumoRegistryJson } from 'virtual:kumo-registry';

export interface PropInfo {
  type?: string;
  optional?: boolean;
  required?: boolean;
  values?: string[];
  descriptions?: Record<string, string>;
  default?: string;
  description?: string;
}

export interface SubComponentData {
  description?: string;
  props?: Record<string, PropInfo>;
  renderElement?: string;
}

export interface ComponentData {
  name: string;
  type?: string;
  category: string;
  description: string;
  importPath?: string;
  sourceFile?: string;
  props?: Record<string, PropInfo> | PropInfo[];
  examples?: string[];
  colors?: string[];
  subComponents?: Record<string, SubComponentData>;
}

export interface BlockData {
  name: string;
  type?: string;
  category: string;
  description: string;
  files?: string[];
  dependencies?: string[];
}

export interface ComponentRegistry {
  version: string;
  components: Record<string, ComponentData>;
  blocks?: Record<string, BlockData>;
  search?: {
    byName?: string[];
    byCategory?: Record<string, string[]>;
    byType?: Record<string, string[]>;
  };
}

export const typedRegistry = kumoRegistryJson as ComponentRegistry;

export function getComponentData(componentName: string): {
  name: string;
  description: string;
  props: Record<string, PropInfo> | PropInfo[] | undefined;
  isSubComponent: boolean;
  parentName?: string;
} | null {
  if (componentName.includes('.')) {
    const [parentName, subName] = componentName.split('.');
    const parent = typedRegistry.components[parentName];
    const sub = parent?.subComponents?.[subName];

    if (!sub) return null;

    return {
      name: `${parentName}.${subName}`,
      description: sub.description ?? '',
      props: sub.props,
      isSubComponent: true,
      parentName
    };
  }

  const component = typedRegistry.components[componentName] ?? typedRegistry.blocks?.[componentName];
  if (!component) return null;

  return {
    name: component.name,
    description: component.description,
    props: component.props,
    isSubComponent: false
  };
}

export function getSubComponentNames(componentName: string): string[] {
  return Object.keys(typedRegistry.components[componentName]?.subComponents ?? {});
}

export function hasSubComponents(componentName: string): boolean {
  return getSubComponentNames(componentName).length > 0;
}

export function formatPropType(prop: PropInfo): string {
  if (prop.type === 'enum' && prop.values) {
    return prop.values.map((value) => `"${value}"`).join(' | ');
  }
  return prop.type ?? '';
}

export function formatDefault(prop: PropInfo): string {
  if (prop.default === undefined) return '-';
  if (prop.type === 'enum' || prop.type === 'string') return `"${prop.default}"`;
  return String(prop.default);
}
