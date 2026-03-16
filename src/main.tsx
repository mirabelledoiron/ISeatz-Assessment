import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './App.tsx'
import { themes, applyTheme, injectTypography } from './styles/tokens'
import { getInitialTheme } from './hooks/useTheme'

// Theme is initialized here — before React mounts — to prevent flash of unstyled content (FOUC).
// getInitialTheme() is the shared resolution function from useTheme — single source of truth.
// useTheme then takes over: it reads the same sources, owns the toggle state, and calls applyTheme
// on every change. No conflict — this is a one-time sync handoff to the hook.
const initialTheme = getInitialTheme()
injectTypography()
document.documentElement.setAttribute('data-theme', initialTheme)
applyTheme(themes[initialTheme])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
