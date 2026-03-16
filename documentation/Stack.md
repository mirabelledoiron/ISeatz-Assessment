# Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Vanilla CSS — BEM, CSS custom properties |
| Token system | TypeScript (`colors.ts`, themes, `typography.ts`, `scale.css`) |
| Font | IBM Plex Mono — self-hosted via `@font-face` |
| Testing | Vitest + @testing-library/react + jsdom |
| Accessibility audit | Lighthouse accessibility (CI threshold ≥ 90) |
| CI | GitHub Actions — lint, type check, unit tests, Lighthouse |
| Linting | ESLint + TypeScript ESLint |
| Type checking | `tsc --noEmit` |
| No dependencies beyond | No UI library, no CSS framework, no icon library |

---

## Where vanilla CSS is used

Every visual style in the project lives in `src/styles/main.css` and `src/styles/tokens/scale.css`. That covers the reset, layout, all component styles (accordion, header, radio, checkbox), focus ring, dark mode icon inversion, hover states, and transitions. No Tailwind, no CSS Modules, no styled-components — just class names written by hand matching Figma layer names exactly.

The only things not in plain `.css` files are the color tokens and typography. Those are injected via TypeScript at runtime (`applyTheme()` / `injectTypography()`) so they can be theme-aware and type-safe.

---

## Why no UI library or CSS framework

- **No component library** (MUI, shadcn, etc.) — they would make it impossible to evaluate component architecture, semantics, and accessibility decisions. The Accordion, Radio, and Checkbox all have real ARIA and keyboard behavior written from scratch.
- **No CSS framework** (Tailwind, Bootstrap) — token naming and Figma-to-code fidelity can't be demonstrated if a framework is making spacing and color decisions, or if time is spent overwriting default styles.
- **No icon library** — icons come from `src/assets/` as PNGs, inverted in dark mode via `filter: invert(1)`. No dependency, no bundle overhead.

The tradeoff is more code to write. The payoff is that a reviewer can see every decision made.
