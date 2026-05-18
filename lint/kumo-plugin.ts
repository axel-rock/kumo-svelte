import { noTailwindDarkVariantRule } from "./no-tailwind-dark-variant.ts";
import { noPrimitiveColorsRule } from "./no-primitive-colors.ts";
import { enforceVariantStandardRule } from "./enforce-variant-standard.ts";
import { noCrossPackageImportsRule } from "./no-cross-package-imports.ts";

const plugin = {
  meta: {
    name: "kumo",
  },
  rules: {
    "no-tailwind-dark-variant": noTailwindDarkVariantRule,
    "no-primitive-colors": noPrimitiveColorsRule,
    "enforce-variant-standard": enforceVariantStandardRule,
    "no-cross-package-imports": noCrossPackageImportsRule,
  },
};

export default plugin;
