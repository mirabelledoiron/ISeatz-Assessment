/*
  tokens/colors.ts — Mirabelle Doiron

  Raw primitives in the same shape as the Figma Variables panel:
    Collection: Theme
    Modes: Light / Dark
    Names: background, border, content, surface, action

  Components should NOT import these directly.
  Components use semantic CSS variables injected by the active theme:
    --background, --border, --content, --surface, --action
*/

export const colors = {
  light: {
    background: '#FFFFFF',
    border: '#000000',
    content: '#111111',
    surface: '#F2F2F2',
    action: '#0153CC',
  },
  dark: {
    background: '#111111',
    border: '#FFFFFF',
    content: '#F2F2F2',
    surface: '#222222',
    action: '#9AC2FE',
  },
} as const

export type ColorName = keyof typeof colors.light
