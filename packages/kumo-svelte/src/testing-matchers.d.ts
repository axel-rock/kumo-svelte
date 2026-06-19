// Makes @testing-library/jest-dom matchers (toBeInTheDocument, toHaveFocus,
// toHaveClass, etc.) visible to svelte-check/tsc. They are registered at runtime
// in tests/setup.ts via `import '@testing-library/jest-dom/vitest'`.
import '@testing-library/jest-dom/vitest';
