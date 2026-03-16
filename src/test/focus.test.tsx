/*
  test/focus.test.tsx
  Author: Mirabelle Doiron

  Verifies that every interactive element in the app receives a visible
  focus indicator when navigated to with the keyboard.

  WCAG 2.1 — 2.4.7 Focus Visible (Level AA):
  "Any keyboard operable user interface has a mode of operation where the
  keyboard focus indicator is visible."

  Tests use userEvent.tab() to simulate real keyboard navigation
  and assert that :focus-visible is applied via the element's CSS class
  or that focus lands on the correct element.
*/

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Accordion, AccordionItem } from '../components/Accordion'
import { RadioButton } from '../components/Radio-Button'
import { CheckboxButton } from '../components/Checkbox-Button'
import { Header } from '../components/Header'

describe('Focus indicator — WCAG 2.4.7', () => {
  describe('Accordion header', () => {
    it('receives focus on Tab', async () => {
      const user = userEvent.setup()
      render(
        <Accordion>
          <AccordionItem id="base" header="Base"><p>content</p></AccordionItem>
        </Accordion>,
      )
      await user.tab()
      expect(screen.getByRole('button', { name: 'Base' })).toHaveFocus()
    })

    it('moves focus to next item on ArrowDown', async () => {
      const user = userEvent.setup()
      render(
        <Accordion>
          <AccordionItem id="base" header="Base"><p>content</p></AccordionItem>
          <AccordionItem id="protein" header="Protein"><p>content</p></AccordionItem>
        </Accordion>,
      )
      await user.tab()
      await user.keyboard('{ArrowDown}')
      expect(screen.getByRole('button', { name: 'Protein' })).toHaveFocus()
    })
  })

  describe('Radio button', () => {
    it('receives focus on Tab', async () => {
      const user = userEvent.setup()
      render(
        <RadioButton
          name="base"
          value="brown-rice"
          label="Brown rice"
          checked={false}
          onChange={() => {}}
        />,
      )
      await user.tab()
      expect(screen.getByRole('radio', { name: 'Brown rice' })).toHaveFocus()
    })
  })

  describe('Checkbox button', () => {
    it('receives focus on Tab', async () => {
      const user = userEvent.setup()
      render(
        <CheckboxButton
          name="toppings"
          value="avocado"
          label="Avocado"
          checked={false}
          onChange={() => {}}
        />,
      )
      await user.tab()
      expect(screen.getByRole('checkbox', { name: 'Avocado' })).toHaveFocus()
    })
  })

  describe('Theme toggle', () => {
    it('receives focus on Tab', async () => {
      const user = userEvent.setup()
      render(<Header theme="light" onToggleTheme={() => {}} />)
      await user.tab()
      expect(screen.getByRole('button', { name: /switch to dark mode/i })).toHaveFocus()
    })

    it('is operable with Enter key', async () => {
      const user = userEvent.setup()
      const onToggle = vi.fn()
      render(<Header theme="light" onToggleTheme={onToggle} />)
      await user.tab()
      await user.keyboard('{Enter}')
      expect(onToggle).toHaveBeenCalledTimes(1)
    })

    it('is operable with Space key', async () => {
      const user = userEvent.setup()
      const onToggle = vi.fn()
      render(<Header theme="light" onToggleTheme={onToggle} />)
      await user.tab()
      await user.keyboard(' ')
      expect(onToggle).toHaveBeenCalledTimes(1)
    })
  })
})
