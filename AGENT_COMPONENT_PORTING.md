# Compound Component Porting Guide

Use this when porting Kumo React compound components to Svelte.

1. Treat the original `packages/kumo/src/components/<component>/<component>.tsx` file as the source of truth for public API shape, subcomponent names, props, and Tailwind classes.
2. Create one Svelte file per public subcomponent in `src/lib/components/<component>/`.
   Example for autocomplete: `Autocomplete.svelte`, `AutocompleteInputGroup.svelte`, `AutocompleteContent.svelte`, `AutocompleteList.svelte`, `AutocompleteItem.svelte`.
3. Keep the root component responsible for state and shared behavior. Put shared state in a local `context.ts` using `setContext` / `getContext`, with a clear error when a subcomponent is used outside the root.
4. Preserve the original compound usage style as closely as Svelte allows:
   ```svelte
   <Component prop={value}>
     <Component.Subcomponent />
     <Component.Content>
       <Component.List>
         {#snippet children(item)}
           <Component.Item value={item}>{item.label}</Component.Item>
         {/snippet}
       </Component.List>
     </Component.Content>
   </Component>
   ```
5. Export the compound object from `src/lib/components/<component>/index.ts` with `Object.assign(Root, { Subcomponent })`, and also export named subcomponents for direct imports:
   ```ts
   export const Component = Object.assign(Root, { Item, Content });
   export { Root as ComponentRoot, Item as ComponentItem, Content as ComponentContent };
   ```
6. Update every demo renderer and code-preview snippet to use the compound API. Do not replace compound examples with a simplified prop-only wrapper unless the original component was prop-only.
7. Keep exact Kumo Tailwind classes unless Svelte-specific primitives require a small adaptation. Note any intentional API differences in the component docs.
8. Validate with `pnpm check`, then run `pnpm build` when the change affects package exports, docs rendering, or shared component behavior.
