# Accessibility

This project targets Level A and Level AA success criteria of [WCAG 2.1](https://www.w3.org/TR/WCAG21/).

## Implementation

### Semantic HTML

- Native `<input type="radio">` and `<input type="checkbox">` with `appearance: none` — custom styling without ARIA role overrides
- `<fieldset>/<legend>` groups each option set — no `role="radiogroup"` or `aria-label` needed; browsers and screen readers handle group announcements natively
- `<ul>/<li>` for accordion items and option lists — item count is announced, which helps users orient in a "pick one" context
- `<header>`, `<main>`, `<button>`, `<a>` — right element for the right job throughout

### ARIA

Add ARIA only when native semantics are insufficient.

- `aria-expanded` + `aria-controls` on accordion triggers — communicates open/close state and panel relationship
- `aria-labelledby` links each accordion panel to its header button
- `aria-pressed` on the theme toggle — communicates binary toggle state
- `aria-describedby` associates help text with its input (`${name}-${value}-help`)
- `aria-hidden="true"` on decorative images and icons

### Keyboard

- Every interactive element is reachable and operable with keyboard alone
- `Tab` / `Shift+Tab` move focus forward and backward through all controls
- `ArrowUp` / `ArrowDown` navigate between accordion headers with wrap-around
- `Enter` and `Space` activate buttons natively — no extra handlers
- Focus outlines are never suppressed — `:focus-visible` applies `--focus-ring` globally

### Color and contrast

- Color is never the sole means of conveying information
- Text: minimum 4.5:1 contrast against background (WCAG 1.4.3)
- UI components (borders, form field outlines): minimum 3:1 (WCAG 1.4.11)
- Both light and dark themes verified

### Images and icons

- Decorative images: `alt=""` + `aria-hidden="true"`
- Icon-only buttons: `aria-label` describes the action (e.g. "Switch to dark mode")
- PNG icons inverted via `filter: invert(1)` in dark mode — no duplicate files needed for solid black assets

---

## Testing checklist

Automated tools catch ~30–40% of accessibility issues. Use this checklist when adding interactive elements or dynamic behavior.

### Structure
- [ ] Semantic element is correct — see [Code style guide](./Code_style_guide.md) for the UI pattern → element mapping
- [ ] Content order makes sense without CSS
- [ ] Headings follow a logical hierarchy (`<h1>` → `<h2>`)

### Visuals
- [ ] Text contrast ≥ 4.5:1 in both themes
- [ ] UI component contrast ≥ 3:1 in both themes
- [ ] Text reflows at 200% zoom without loss of content

### Keyboard
- [ ] Every interactive element is reachable with `Tab`
- [ ] Every interactive element is operable with `Enter` or `Space`
- [ ] `ArrowUp` / `ArrowDown` navigate accordion items
- [ ] Focus indicator is visible at all times
- [ ] Focus order is logical — no positive `tabindex`

### Dynamic content
- [ ] Accordion trigger reflects `aria-expanded` on open/close
- [ ] Theme toggle reflects `aria-pressed` and updates `aria-label`
- [ ] Radio and checkbox checked state is conveyed natively
- [ ] Activating a control does not cause an unexpected context change

### Screen reader (manual)

Test with VoiceOver + Safari (macOS) or NVDA + Firefox (Windows):

1. Navigate headings — confirm page structure is clear
2. Open and close each accordion with keyboard only
3. Select a radio button — confirm group label and option label are both announced
4. Check a topping — confirm checked state change is announced
5. Toggle the theme — confirm button label updates

---

## Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Inclusive Components — Heydon Pickering](https://inclusive-components.design/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
