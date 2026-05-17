export type VariantConfig = Record<string, Record<string, { classes: string }>>;

export function resolveVariant<T extends VariantConfig>(
  config: T,
  selections: Partial<{ [K in keyof T]: keyof T[K] | string | undefined }>,
  defaults: Partial<{ [K in keyof T]: keyof T[K] | string }>
) {
  return Object.keys(config)
    .map((axis) => {
      const value = selections[axis] ?? defaults[axis];
      return value ? config[axis]?.[String(value)]?.classes : undefined;
    })
    .filter(Boolean)
    .join(' ');
}
