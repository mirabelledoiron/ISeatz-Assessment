import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Accordion, AccordionItem } from './Accordion'

function renderAccordion(allowMultiple = false) {
  return render(
    <Accordion allowMultiple={allowMultiple}>
      <AccordionItem id="item-1" header="Base">
        <p>Choose your base</p>
      </AccordionItem>
      <AccordionItem id="item-2" header="Protein">
        <p>Choose your protein</p>
      </AccordionItem>
      <AccordionItem id="item-3" header="Toppings">
        <p>Choose your toppings</p>
      </AccordionItem>
    </Accordion>,
  )
}

describe('Accordion', () => {
  // --- Rendering ---

  it('renders all item headers', () => {
    renderAccordion()
    expect(screen.getByRole('button', { name: 'Base' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Protein' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Toppings' })).toBeInTheDocument()
  })

  it('renders all panels collapsed by default', () => {
    renderAccordion()
    const panels = screen.getAllByRole('region', { hidden: true })
    panels.forEach((panel) => expect(panel).not.toBeVisible())
  })

  // --- ARIA ---

  it('sets aria-expanded="false" on all triggers when collapsed', () => {
    renderAccordion()
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('sets aria-expanded="true" after opening an item', async () => {
    const user = userEvent.setup()
    renderAccordion()
    await user.click(screen.getByRole('button', { name: 'Base' }))
    expect(screen.getByRole('button', { name: 'Base' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('wires aria-controls to the correct panel id', () => {
    renderAccordion()
    const trigger = screen.getByRole('button', { name: 'Base' })
    const panelId = trigger.getAttribute('aria-controls')
    expect(panelId).toBeTruthy()
    expect(document.getElementById(panelId!)).toBeInTheDocument()
  })

  it('panel has role="region" and aria-labelledby pointing to trigger', () => {
    renderAccordion()
    const trigger = screen.getByRole('button', { name: 'Base' })
    const panelId = trigger.getAttribute('aria-controls')!
    const panel = document.getElementById(panelId)!
    expect(panel).toHaveAttribute('role', 'region')
    expect(panel).toHaveAttribute('aria-labelledby', trigger.id)
  })

  // --- Interaction ---

  it('opens a panel on click and shows content', async () => {
    const user = userEvent.setup()
    renderAccordion()
    await user.click(screen.getByRole('button', { name: 'Base' }))
    expect(screen.getByText('Choose your base')).toBeVisible()
  })

  it('closes an open panel on second click', async () => {
    const user = userEvent.setup()
    renderAccordion()
    const trigger = screen.getByRole('button', { name: 'Base' })
    await user.click(trigger)
    await user.click(trigger)
    expect(screen.getByRole('button', { name: 'Base' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the previously open item when opening another (single mode)', async () => {
    const user = userEvent.setup()
    renderAccordion()
    await user.click(screen.getByRole('button', { name: 'Base' }))
    await user.click(screen.getByRole('button', { name: 'Protein' }))
    expect(screen.getByRole('button', { name: 'Base' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Protein' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('allows multiple items open when allowMultiple=true', async () => {
    const user = userEvent.setup()
    renderAccordion(true)
    await user.click(screen.getByRole('button', { name: 'Base' }))
    await user.click(screen.getByRole('button', { name: 'Protein' }))
    expect(screen.getByRole('button', { name: 'Base' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Protein' })).toHaveAttribute('aria-expanded', 'true')
  })

  // --- Keyboard ---

  it('opens an item with Enter key', async () => {
    const user = userEvent.setup()
    renderAccordion()
    screen.getByRole('button', { name: 'Base' }).focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'Base' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('opens an item with Space key', async () => {
    const user = userEvent.setup()
    renderAccordion()
    screen.getByRole('button', { name: 'Base' }).focus()
    await user.keyboard(' ')
    expect(screen.getByRole('button', { name: 'Base' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('moves focus to next item with ArrowDown', async () => {
    const user = userEvent.setup()
    renderAccordion()
    screen.getByRole('button', { name: 'Base' }).focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('button', { name: 'Protein' })).toHaveFocus()
  })

  it('moves focus to previous item with ArrowUp', async () => {
    const user = userEvent.setup()
    renderAccordion()
    screen.getByRole('button', { name: 'Protein' }).focus()
    await user.keyboard('{ArrowUp}')
    expect(screen.getByRole('button', { name: 'Base' })).toHaveFocus()
  })

  it('wraps ArrowDown focus from last to first item', async () => {
    const user = userEvent.setup()
    renderAccordion()
    screen.getByRole('button', { name: 'Toppings' }).focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('button', { name: 'Base' })).toHaveFocus()
  })

  // --- defaultOpen ---

  it('opens items specified in defaultOpen', () => {
    render(
      <Accordion defaultOpen={['item-1']}>
        <AccordionItem id="item-1" header="Base"><p>Base content</p></AccordionItem>
        <AccordionItem id="item-2" header="Protein"><p>Protein content</p></AccordionItem>
      </Accordion>,
    )
    expect(screen.getByRole('button', { name: 'Base' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Protein' })).toHaveAttribute('aria-expanded', 'false')
  })
})
