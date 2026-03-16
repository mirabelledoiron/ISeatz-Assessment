import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  // --- Rendering ---

  it('renders the Gather logo with alt text', () => {
    render(<Header theme="light" onToggleTheme={vi.fn()} />)
    expect(screen.getByAltText('Gather')).toBeInTheDocument()
  })

  it('renders the theme toggle button', () => {
    render(<Header theme="light" onToggleTheme={vi.fn()} />)
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  // --- Theme variants ---

  it('shows light logo in light theme', () => {
    render(<Header theme="light" onToggleTheme={vi.fn()} />)
    expect(screen.getByAltText('Gather').getAttribute('src')).toContain('light-logo')
  })

  it('shows dark logo in dark theme', () => {
    render(<Header theme="dark" onToggleTheme={vi.fn()} />)
    expect(screen.getByAltText('Gather').getAttribute('src')).toContain('dark-logo')
  })

  it('shows moon icon in light theme', () => {
    render(<Header theme="light" onToggleTheme={vi.fn()} />)
    const icon = screen.getByRole('button').querySelector('img')
    expect(icon?.getAttribute('src')).toContain('icon-moon')
  })

  it('shows sun icon in dark theme', () => {
    render(<Header theme="dark" onToggleTheme={vi.fn()} />)
    const icon = screen.getByRole('button').querySelector('img')
    expect(icon?.getAttribute('src')).toContain('icon-sun')
  })

  // --- ARIA ---

  it('toggle button has aria-label "Switch to dark mode" in light theme', () => {
    render(<Header theme="light" onToggleTheme={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('toggle button has aria-label "Switch to light mode" in dark theme', () => {
    render(<Header theme="dark" onToggleTheme={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('theme icon is decorative (aria-hidden)', () => {
    render(<Header theme="light" onToggleTheme={vi.fn()} />)
    const icon = screen.getByRole('button').querySelector('img')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('toggle button has aria-pressed="false" in light theme', () => {
    render(<Header theme="light" onToggleTheme={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('toggle button has aria-pressed="true" in dark theme', () => {
    render(<Header theme="dark" onToggleTheme={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  // --- Interaction ---

  it('calls onToggleTheme when button is clicked', async () => {
    const user = userEvent.setup()
    const onToggleTheme = vi.fn()
    render(<Header theme="light" onToggleTheme={onToggleTheme} />)
    await user.click(screen.getByRole('button'))
    expect(onToggleTheme).toHaveBeenCalledOnce()
  })

  it('calls onToggleTheme when button is activated with keyboard', async () => {
    const user = userEvent.setup()
    const onToggleTheme = vi.fn()
    render(<Header theme="light" onToggleTheme={onToggleTheme} />)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(onToggleTheme).toHaveBeenCalledOnce()
  })
})
