# Design decisions

Tradeoffs and intentional choices made during the build. Written so a reviewer can follow the reasoning without reading the git history.

---

## Folder naming mixes conventions

`Header/` uses PascalCase; `Radio-Button/` and `Checkbox-Button/` use kebab-case. This was intentional — the names match the Figma layer names exactly, which makes it easy to trace a component back to its design source. In a real production codebase I would normalize to one convention (PascalCase for component folders is standard in React projects) and align with the team's existing style guide.

---

## Single `main.css` for all component styles

All component styles live in one file, which makes token usage easy to audit and keeps the build simple. The file is organized with named section comments (`/* Accordion */`, `/* Radio */`, `/* Checkbox */`, etc.) so individual component styles are easy to locate. The tradeoff is that the file grows with the project. In production I would move to CSS Modules or scoped files per component — though the right call depends on the scale of the project and whether the team prefers co-located styles or a single stylesheet.

---

## Theme as CSS custom property injection, not a class toggle

Themes are TypeScript objects (`light.ts`, `dark.ts`) applied to `<html>` as CSS custom properties via `applyTheme()`. The alternative — a `.dark` class in CSS — would split token definitions across a `.ts` file and a `.css` file, making the system harder to audit and impossible to type-check.

The tradeoff: styles depend on JavaScript running before paint, which I mitigate by calling `applyTheme()` synchronously in `main.tsx` before `createRoot`. See the FOUC section below.

---

## Theme initialized in two places (intentional)

`main.tsx` applies the saved theme before React mounts. `useTheme` re-applies it after mount. This looks like duplication — it is not.

**Why both exist:**

`main.tsx` runs synchronously before React renders a single pixel. It reads `localStorage` and the OS preference and applies the theme immediately. This is the only way to prevent FOUC — a flash where the page renders in light mode before the hook runs.

`useTheme` runs inside React — it cannot run until the component tree mounts, which is already too late to prevent the flash. Its job is to own the toggle state, react to OS preference changes, and persist the user's choice.

```
main.tsx      →  applies theme synchronously (no React, no flash)
                         ↓
useTheme mounts →  reads same sources, gets same value, takes over ownership
```

They agree because they read the same `localStorage` key and the same media query. If they ever disagreed, you would see a flash — which is exactly what the pattern prevents.

This is standard practice. Next.js, Remix, and every serious dark mode implementation use the same pattern (sometimes as a `<script>` in `<head>`).

---

## Accordion arrow navigation uses DOM queries, not a ref registry

Arrow key navigation works by querying `.accordion__header` buttons within the nearest `[data-accordion]` ancestor. This is explicit and easy to follow, and `data-accordion` is reliably present on the `<ul>` root element. The more robust pattern — storing trigger refs in context and navigating the array directly — avoids the DOM query entirely but adds meaningful complexity for no functional gain at this scale. If the Accordion were to support nested accordions or dynamic item insertion, the ref registry approach would become the right call.

---

## Semantic token set is intentionally narrow

The token system ships with five semantic color tokens: `background`, `surface`, `border`, `content`, `action`. This covers everything needed for the current UI without inventing tokens for states that don't exist yet.

A production design system would expand this to include tokens for states like `contentSubtle` (muted/secondary text), `borderSubtle` (dividers), `actionHover`, `actionPressed`, `surfaceRaised` (elevated cards), and `focus` (focus surface fill). Adding those tokens without real consumers would be premature — the right time to introduce them is when a component actually needs them, so the token name is grounded in a real use case.

---

## Black PNG icons inverted via `filter: invert(1)` in dark mode

The provided assets are solid black PNGs. Rather than ship duplicate dark-mode icon variants, I apply `filter: invert(1)` via a `[data-theme="dark"]` selector on the relevant image elements. This works correctly for pure black icons and avoids extra assets. It would break on multi-color icons — the correct long-term solution is SVG icons with `currentColor` fills.
