---
"@axelrock/kumo-svelte": patch
---

Fix Button dropping the consumer `onclick` when `title` is set. The bits-ui tooltip trigger props (which include their own `onclick`) were spread after the consumer props, overwriting the handler. Spread the consumer props last so a tooltip-wrapped button still fires its click.
