import {
  createContext,
  useContext,
  useState,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import plusIcon from '../../assets/Icon/icon-plus.png'
import xIcon from '../../assets/Icon/icon-x.png'

// Context — shared state between Accordion and its Items

type AccordionContextValue = {
  openItems: Set<string>
  toggle: (id: string) => void
  allowMultiple: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordionContext() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('<AccordionItem> must be used inside <Accordion>')
  return ctx
}

// AccordionItem

type AccordionItemProps = {
  /** Unique id — used to wire up aria-controls / aria-labelledby */
  id: string
  /** Trigger label */
  header: string
  children: ReactNode
}

export function AccordionItem({ id, header, children }: AccordionItemProps) {
  const { openItems, toggle } = useAccordionContext()
  const isOpen = openItems.has(id)

  const triggerId = `accordion-header-${id}`
  const panelId = `accordion-panel-${id}`

  const triggerRef = useRef<HTMLButtonElement>(null)

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    // Enter/Space are handled natively by <button>
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const triggers = Array.from(
        triggerRef.current
          ?.closest('[data-accordion]')
          ?.querySelectorAll<HTMLButtonElement>('.accordion__header') ?? [],
      )
      const currentIndex = triggers.indexOf(triggerRef.current!)
      const nextIndex =
        e.key === 'ArrowDown'
          ? (currentIndex + 1) % triggers.length
          : (currentIndex - 1 + triggers.length) % triggers.length
      triggers[nextIndex]?.focus()
    }
  }

  return (
    <li
      className={`accordion__item ${isOpen ? 'accordion__item--open' : ''}`}
      data-open={isOpen}
    >
      <button
        ref={triggerRef}
        id={triggerId}
        className="accordion__header"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => toggle(id)}
        onKeyDown={handleKeyDown}
      >
        <span className="accordion__header-label type-subheader">{header}</span>
        <img src={isOpen ? xIcon : plusIcon} alt="" width="16" height="16" aria-hidden="true" className="accordion__icon" />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="accordion__panel"
        hidden={!isOpen}
      >
        <div className="accordion__panel-content">{children}</div>
      </div>
    </li>
  )
}

// Accordion root

type AccordionProps = {
  children: ReactNode
  /** Allow multiple items open simultaneously. Default: false */
  allowMultiple?: boolean
  /** IDs of items open by default (uncontrolled) */
  defaultOpen?: string[]
  className?: string
}

export function Accordion({
  children,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen))

  function toggle(id: string) {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle, allowMultiple }}>
      <ul className={`accordion ${className ?? ''}`} data-accordion>
        {children}
      </ul>
    </AccordionContext.Provider>
  )
}
