/*
  tokens/types.ts — Mirabelle Doiron
  Shared TypeScript types for the token system.
*/

export interface TokenValue {
  value: string
  description?: string
}

export interface ColorTokenGroup {
  background:           TokenValue
  border:               TokenValue
  content:              TokenValue
  surface:              TokenValue
  action:               TokenValue
}

export interface ThemeTokens {
  color: ColorTokenGroup
}

export type ThemeName = 'light' | 'dark'
