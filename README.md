# iSeatz Senior Design Engineer Assessment — Mirabelle Doiron

## Running the project

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run test:run   # unit tests
npm run lint       # zero violations
npm run build      # production build

# Lighthouse (requires the preview server to be running on :4173)
npm run preview -- --port 4173
npm run lighthouse # Lighthouse accessibility + best-practices report
```

---

## What I prioritized

**Accessibility first, visual second.** 

Every decision started with semantics and keyboard behavior before CSS. A visually perfect component that a screen reader can't navigate fails the brief.

- Native `<input type="radio">` and `<input type="checkbox">` with `appearance: none` — no ARIA roles pretending to be form controls. `<fieldset>/<legend>` groups each option set: native HTML, zero ARIA needed, screen readers announce the group label automatically.
- `<ul>/<li>` for accordion items and option lists — screen readers announce item count, which is meaningful for a "pick one of five" interaction.
- `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-pressed`, `aria-describedby` — all wired to real DOM relationships, not decorative.
- Full keyboard navigation: `Tab`, `Enter`, `Space`, `ArrowUp`/`ArrowDown` with wrap-around on the accordion.

**A real token system, not variables.** 

Three-tier structure modelled after Polaris: primitive colors → typed semantic theme objects (light/dark) → scale + typography. Token names match the Figma variable names exactly — no translation layer between design and code. Themes are TypeScript objects injected as CSS custom properties before React mounts, so there is no flash of unstyled content and the token system stays type-safe.

**Correct semantics over clever abstractions.** 

`<header>`, `<main>`, `<button>`, `<ul>`, `<li>` — the right element for the right job. Class names match Figma layer names (`.accordion__header`, `.accordion__panel-content`) so a designer reading the code recognizes the structure immediately.

---

## Styling approach

Component styles are intentionally consolidated in `src/styles/main.css` for this assessment so reviewers can audit layout, states, and token usage in one place without jumping between files. Design tokens are still separated and source-controlled (`src/styles/tokens/*`), and themes are applied before React mounts to avoid a flash of incorrect styling.

In a production codebase I'd typically co-locate styles with components (CSS Modules or vanilla-extract) while keeping the token system global, to reduce merge conflicts and improve component ownership as the UI grows.

---

## Tradeoffs

**All styles in `main.css` vs. co-located CSS**
Consolidating styles into one file trades long-term component ownership (harder in a real team) for immediate reviewability — every layout rule, state, and token usage is visible in one place without jumping files. The right call for an assessment; wrong call for a production codebase at scale.

**Native `<input>` with `appearance: none` vs. fully custom controls**
Using real `<input type="radio">` and `<input type="checkbox">` elements with custom visual layers gives correct accessible semantics for free but demands more CSS precision for the visual states. The tradeoff paid off on keyboard and screen-reader behavior; it cost time on the visual layer.

**Checkbox checked state — known visual gap**
The `checked` state is wired correctly in the DOM and announced properly by screen readers, but the custom visual indicator doesn't look right. The checked background and checkmark icon don't match the Figma design closely enough. I ran out of time to resolve it cleanly and made the deliberate call to leave it rather than ship a half-fix that risked breaking the accessible behavior that was already working. This is the one visual state I would go back and fix first.

**No form submission**
Selection state is tracked correctly in React but there is no submit button or validation. Given the time constraint I prioritized getting the selection controls semantically and accessibly correct over wiring up a summary panel and required-field states.

---

## What I would improve with more time

**SEO and shareability**

Lighthouse is only getting a 56% score. That would not be how I pushed this to prod. But not a priority right now since this won't go to prod. 

But if I had time: 
- `og:image` — a 1200×630 social preview image; without it, link previews show a blank card
- `<link rel="canonical">` — prevents duplicate-content penalties if the app is served from multiple URLs
- `robots.txt` — site-wide crawl rules (the `noindex` meta tag only covers this page)
- `sitemap.xml` — tells crawlers every indexable URL; matters once the app has multiple routes
- JSON-LD structured data — `@type: Restaurant` + `hasMenu` markup so Google can surface menu items as rich results
- `<link rel="apple-touch-icon">` + `manifest.json` — makes the app installable as a PWA with a proper icon
- Per-route `<title>` and `<meta name="description">` with `react-helmet-async` — each route gets its own metadata instead of one global value
- `<link rel="preload">` for critical fonts — fetches `IBMPlexMono-Regular.ttf` in parallel with the JS bundle rather than after it executes

**Design system**

- **Storybook** — isolated stories for each component with all variant states documented; this is how a real team would consume the design system
- **Visual regression tests** — Chromatic or Playwright screenshot tests on the Storybook stories so a token change that breaks visuals fails the build before review

**Component architecture**

- **Extract an `OptionGroup` component** — `App.tsx` is clean at this size, but the four bowl sections (base, protein, toppings, sauce) share an identical structure: `<fieldset>`, `<legend>`, `<ul>`, and a mapped input list. A generic `OptionGroup` that accepts a legend, options array, and renderer would remove that repetition and make adding new sections trivial
- **Unify selection state with a reducer** — radio and checkbox state are currently managed as separate `useState` calls. If the form grows, a `useReducer` with a unified `{ [sectionId]: string | Set<string> }` shape would be easier to serialize, validate, and submit

**Product**

- **Form submit + validation** — a summary panel showing the current selection and required-field states for sections where nothing has been chosen
- **More component tests** — Radio and Checkbox rely on integration-level coverage through the Accordion panel; dedicated tests for checked state, `aria-describedby` wiring, and help text rendering would close that gap
