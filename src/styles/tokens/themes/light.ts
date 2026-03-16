// themes/light.ts — Mirabelle Doiron
// Light theme — semantic tokens mapped to color primitives.
import type { ThemeTokens } from '../types'
import { colors } from '../colors'

export const light: ThemeTokens = {
  color: {
    background:            { value: colors.light.background, description: 'Page background' },
    border:                { value: colors.light.border,     description: 'Borders and dividers' },
    content:               { value: colors.light.content,    description: 'Primary text and icons' },
    surface:               { value: colors.light.surface,    description: 'Card and header backgrounds' },
    action:                { value: colors.light.action,     description: 'Interactive fills, text, and icons' },
  },
}
