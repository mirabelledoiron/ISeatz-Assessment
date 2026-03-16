// themes/dark.ts — Mirabelle Doiron
// Dark theme — same 5 tokens, different primitives. Inverted surface/content.
import type { ThemeTokens } from '../types'
import { colors } from '../colors'

export const dark: ThemeTokens = {
  color: {
    background:            { value: colors.dark.background, description: 'Page background' },
    border:                { value: colors.dark.border,     description: 'Borders and dividers' },
    content:               { value: colors.dark.content,    description: 'Primary text and icons' },
    surface:               { value: colors.dark.surface,    description: 'Card and header backgrounds' },
    action:                { value: colors.dark.action,     description: 'Interactive fills, text, and icons' },
  },
}
