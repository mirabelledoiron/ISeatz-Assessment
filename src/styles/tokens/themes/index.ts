// themes/index.ts — Mirabelle Doiron
// Collects both themes into a keyed record so useTheme can do themes[name].
export { light } from './light'
export { dark } from './dark'

import { light } from './light'
import { dark } from './dark'
import type { ThemeName, ThemeTokens } from '../types'

export const themes: Record<ThemeName, ThemeTokens> = { light, dark }

export const defaultTheme: ThemeName = 'light'
