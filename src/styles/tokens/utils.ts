/*
  tokens/utils.ts — Mirabelle Doiron

  applyTheme() is the bridge between TS token objects and real CSS.
  It walks the color group and sets each token as a CSS custom property on <html>.
  Called once before React mounts (no flash) and again on every theme toggle.
*/

import type { ThemeTokens } from './types'

export function applyTheme(tokens: ThemeTokens): void {
  const root = document.documentElement
  for (const [name, token] of Object.entries(tokens.color)) {
    root.style.setProperty(`--${name}`, token.value)
  }
}
