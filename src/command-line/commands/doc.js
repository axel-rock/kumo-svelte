import { formatComponentName, loadRegistry } from '../utils/registry.js';

function printComponent(component) {
  console.log(`# ${component.name}`);
  console.log('');
  console.log(component.description);
  console.log('');
  console.log(`Category: ${component.category}`);
  console.log(`Import: import { ${component.name} } from 'kumo-svelte';`);

  if (component.sourceFile) {
    console.log(`Source: ${component.sourceFile}`);
  }

  if (component.props?.length) {
    console.log('');
    console.log('Props:');
    for (const prop of component.props) {
      const required = prop.required ? ' required' : '';
      const description = prop.description ? ` - ${prop.description}` : '';
      console.log(`  ${prop.name}: ${prop.type}${required}${description}`);
    }
  }

  if (component.examples?.length) {
    console.log('');
    console.log('Examples:');
    for (const example of component.examples) {
      console.log(`  ${example.title}`);
    }
  }
}

export function doc(componentName) {
  const registry = loadRegistry(import.meta.url);

  if (!componentName) {
    for (const component of Object.values(registry.components ?? {})) {
      printComponent(component);
      console.log('\n---\n');
    }
    console.log('Use "kumo-svelte doc <ComponentName>" for detailed docs');
    return;
  }

  const normalized = formatComponentName(componentName);
  const component =
    registry.components?.[normalized] ??
    Object.values(registry.components ?? {}).find(
      (item) => item.name.toLowerCase() === componentName.toLowerCase()
    );

  if (!component) {
    console.error(`Component '${componentName}' not found.`);
    console.log('Run "kumo-svelte ls" to see available components.');
    process.exit(1);
  }

  printComponent(component);
}
