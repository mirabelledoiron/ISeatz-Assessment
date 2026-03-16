import lightLogo from '../../assets/light-logo.png'
import darkLogo from '../../assets/dark-logo.png'
import moonIcon from '../../assets/Icon/icon-moon.png'
import sunIcon from '../../assets/Icon/icon-sun.png'
import type { Theme } from '../../hooks/useTheme'

type HeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="site-header">
      <img
        src={theme === 'dark' ? darkLogo : lightLogo}
        alt="Gather"
        className="site-header__logo"
      />
      <button
        className="site-header__theme-toggle"
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        aria-pressed={theme === 'dark'}
      >
        <img src={theme === 'light' ? moonIcon : sunIcon} alt="" width="32" height="32" aria-hidden="true" />
      </button>
    </header>
  )
}
