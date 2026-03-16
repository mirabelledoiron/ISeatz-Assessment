# Code style guide

Conventions for writing consistent, maintainable code in this project. Items enforced by TypeScript, ESLint, or Prettier are not repeated here.

---

## HTML element decisions

Always use the correct native HTML element. ARIA is a fallback, not a replacement for semantics.

| UI pattern    | Element used                     |
| ------------- | -------------------------------- |
| Button        | `<button>`                       |
| Checkbox      | `<input type="checkbox">`        |
| Radio         | `<input type="radio">`           |
| Input group   | `<fieldset>` + `<legend>`        |
| List of items | `<ul>` + `<li>`                  |
| Page regions  | `<header>`, `<main>`             |

Use `<ul>/<li>` when items are conceptually a list — option groups, accordion items. Use `<div>` for generic layout containers that are not navigational or enumerable.

---

## Naming conventions

- **TypeScript**: camelCase for variables and functions, PascalCase for components and types
- **CSS classes**: BEM — `block__element--modifier`
  - Names must match Figma layer names where applicable (e.g. `.accordion__header`, `.accordion__panel-content`)
  - Names describe what the element *is*, not how it looks
  - Avoid `_wrapper`, `_container` unless the element genuinely is a container with no better name
- **HTML IDs**: kebab-case, prefixed with the component block (e.g. `accordion-panel-base`, `accordion-panel-protein`)
  - Derive IDs from meaningful prop values — not from `useId()` output

---

## CSS conventions

- All styles live in `src/styles/main.css` — no per-component CSS files
- Token load order (all injected before React mounts):
  1. `src/styles/tokens/colors.ts` — raw color palette (primitives)
  2. `src/styles/tokens/themes/light.ts` + `dark.ts` — semantic tokens (`--background`, `--content`, `--action`, etc.)
  3. `src/styles/tokens/typography.ts` — font tokens + `.type-*` classes, injected via `injectTypography()`
  4. `src/styles/tokens/scale.css` — spacing (`--xxs` → `--xl`), radius, transitions
- Token names must match Figma variable names exactly
- Use `var(--token-name)` throughout — no hard-coded color, spacing, or font values
- Dark mode via `[data-theme="dark"]` on `<html>` — set by `applyTheme()` before React mounts
- Solid black PNG icons in dark mode are inverted via `filter: invert(1)` — no duplicate icon files

---

## Component structure

- No inline SVG inside components — use `<img>` with asset files from `src/assets/Icon/`
- A single `<img>` with a conditional `src`, not two separate elements in a ternary:

  ```tsx
  // correct
  <img src={isOpen ? xIcon : plusIcon} alt="" aria-hidden="true" />

  // incorrect
  {isOpen ? <img src={xIcon} ... /> : <img src={plusIcon} ... />}
  ```

- Icon-only interactive elements always have an `aria-label`
- Decorative images always have `alt=""` and `aria-hidden="true"`
- No `<span>` wrappers for layout — use CSS on the element itself

---

## Control structures

- Use early returns to reduce nesting
- Keep event handlers close to the element they belong to
- Extract static data to `src/data/` — components do not own option lists
