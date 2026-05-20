import { loadRegistry, type RegistryComponent, type RegistryProp } from '../utils/registry.js';

type RegistrySubComponent = {
  description?: string;
  props?: Record<string, RegistryProp>;
  renderElement?: string;
};

type ComponentWithDetails = RegistryComponent & {
  importPath?: string;
  props?: RegistryProp[] | Record<string, RegistryProp>;
  examples?: Array<{ title?: string; code?: string } | string>;
  colors?: string[];
  subComponents?: Record<string, RegistrySubComponent>;
};

function findComponent(registry: ReturnType<typeof loadRegistry>, name: string): ComponentWithDetails | null {
  const lowerName = name.toLowerCase();

  for (const [key, component] of Object.entries(registry.components ?? {})) {
    if (key.toLowerCase() === lowerName || component.name.toLowerCase() === lowerName) {
      return component as ComponentWithDetails;
    }
  }

  return null;
}

function findSimilar(registry: ReturnType<typeof loadRegistry>, name: string): string[] {
  const lowerName = name.toLowerCase();
  const componentNames = Object.keys(registry.components ?? {});

  return componentNames
    .filter((componentName) => {
      const normalized = componentName.toLowerCase();
      return normalized.includes(lowerName) || lowerName.includes(normalized);
    })
    .slice(0, 5);
}

function normalizeProps(props: ComponentWithDetails['props']): Array<[string, RegistryProp]> {
  if (!props) return [];
  if (Array.isArray(props)) {
    return props.map((prop) => [prop.name, prop]);
  }
  return Object.entries(props);
}

function formatProp(name: string, prop: RegistryProp & { values?: string[]; descriptions?: Record<string, string>; default?: string }): string {
  const parts: string[] = [];
  let typeStr = prop.type;

  if (prop.values && prop.values.length > 0) {
    typeStr = prop.values.map((value) => `"${value}"`).join(' | ');
  }

  const required = prop.required === true || prop.optional === false;
  const requiredStr = required ? '(required)' : '';
  const defaultStr = prop.default ? `[default: ${prop.default}]` : '';

  parts.push(`  ${name}: ${typeStr} ${requiredStr} ${defaultStr}`.trim());

  if (prop.description) {
    parts.push(`    ${prop.description}`);
  }

  if (prop.descriptions && Object.keys(prop.descriptions).length > 0) {
    for (const [value, description] of Object.entries(prop.descriptions)) {
      parts.push(`    - "${value}": ${description}`);
    }
  }

  return parts.join('\n');
}

function formatExample(example: { title?: string; code?: string } | string): string {
  if (typeof example === 'string') return example;
  return example.code ?? example.title ?? '';
}

function formatComponentDoc(component: ComponentWithDetails): string {
  const lines: string[] = [];

  lines.push(`# ${component.name}\n`);
  lines.push(`${component.description}\n`);
  lines.push(`**Import:** \`import { ${component.name} } from "${component.importPath ?? 'kumo-svelte'}";\`\n`);
  lines.push(`**Category:** ${component.category}\n`);

  const propEntries = normalizeProps(component.props);
  if (propEntries.length > 0) {
    lines.push('## Props\n');
    for (const [propName, propInfo] of propEntries) {
      lines.push(formatProp(propName, propInfo));
      lines.push('');
    }
  }

  if (component.subComponents) {
    lines.push('## Sub-Components\n');
    for (const [subName, subInfo] of Object.entries(component.subComponents)) {
      lines.push(`### ${component.name}.${subName}`);
      if (subInfo.description) {
        lines.push(subInfo.description);
      }
      if (subInfo.renderElement) {
        lines.push(`Renders: ${subInfo.renderElement}`);
      }
      if (subInfo.props) {
        lines.push('Props:');
        for (const [propName, propInfo] of Object.entries(subInfo.props)) {
          const required = propInfo.required ? '(required)' : '';
          lines.push(`  - ${propName}: ${propInfo.type} ${required}`);
        }
      }
      lines.push('');
    }
  }

  if (component.examples && component.examples.length > 0) {
    lines.push('## Examples\n');
    for (const example of component.examples.slice(0, 3)) {
      const formatted = formatExample(example);
      lines.push('```svelte');
      lines.push(formatted);
      lines.push('```\n');
    }
    if (component.examples.length > 3) {
      lines.push(`(${component.examples.length - 3} more examples available in the docs)`);
    }
  }

  if (component.colors && component.colors.length > 0) {
    lines.push('\n## Semantic Tokens Used\n');
    lines.push(component.colors.join(', '));
  }

  return lines.join('\n');
}

export function docs(): void {
  const registry = loadRegistry(import.meta.url);
  const components = Object.values(registry.components ?? {}) as ComponentWithDetails[];

  console.log(`# Kumo Svelte Component Documentation\n`);
  console.log(`${components.length} components available\n`);
  console.log('---\n');

  for (const component of components) {
    console.log(formatComponentDoc(component));
    console.log('\n---\n');
  }
}

export function doc(componentName?: string): void {
  if (!componentName) {
    docs();
    return;
  }

  const registry = loadRegistry(import.meta.url);
  const component = findComponent(registry, componentName);

  if (!component) {
    const similar = findSimilar(registry, componentName);
    console.error(`Component "${componentName}" not found.`);
    if (similar.length > 0) {
      console.error(`\nDid you mean: ${similar.join(', ')}?`);
    }
    console.error('\nRun "kumo-svelte ls" to see all available components.');
    process.exit(1);
  }

  console.log(formatComponentDoc(component));
}
