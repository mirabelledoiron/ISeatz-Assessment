/*
  hooks/useTheme.ts — Theme state and persistence
  Author: Mirabelle Doiron

  This hook owns the full theme lifecycle:
    - reads the saved preference from localStorage on first load
    - falls back to the OS-level prefers-color-scheme if nothing is saved
    - calls applyTheme() from the token system to inject CSS custom properties
      onto <html> and sets data-theme for CSS filter rules (icon inversion)
    - follows OS preference changes only while in "system" mode
      (i.e. before the user explicitly toggles a theme)
    - saves the user's explicit choice to localStorage so it persists
      across sessions ("manual" mode)

  Returns { theme, toggleTheme } — import this wherever a toggle button lives.
*/

import { useState, useEffect } from 'react'
import { themes, applyTheme as applyTokens } from '../styles/tokens'
export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function hasSavedTheme(): boolean {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'light' || saved === 'dark'
}

// Runs once on mount — checks localStorage first, then OS preference.
// Exported so main.tsx can use the same resolution logic before React mounts
// (FOUC prevention). Single source of truth — update here, both callers follow.
export function getInitialTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Injects token CSS vars and sets data-theme for CSS filter rules
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  applyTokens(themes[theme])
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [isManual, setIsManual] = useState<boolean>(hasSavedTheme)

  // Apply whenever theme changes; persist only after the user explicitly toggles
  useEffect(() => {
    applyTheme(theme)
    if (isManual) {
      localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme, isManual])

  // Follow OS preference changes — but only while in "system" mode
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    function handleChange(e: MediaQueryListEvent) {
      if (!isManual) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [isManual])

  function toggleTheme() {
    setIsManual(true)
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}
