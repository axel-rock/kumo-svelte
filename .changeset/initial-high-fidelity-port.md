---
"@axel-rock/kumo-svelte": minor
---

High-fidelity Svelte port of Cloudflare Kumo.

- All components match upstream Kumo Tailwind classes verbatim (0 class drift, enforced by `pnpm fidelity`).
- Cloudflare-faithful theme tokens with an opt-in `@axel-rock/kumo-svelte/theme-svelte.css` Svelte-orange theme.
- Hybrid visual-regression suite (Playwright) covering static and interacted states — including opened dialogs, popovers, selects, menus, and date pickers — in light and dark, plus a cross-framework parity runner against upstream React Kumo.
- Interaction and accessibility (axe) test coverage across the component suite.
