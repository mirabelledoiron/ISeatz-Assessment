import { useState } from 'react'
import { Accordion, AccordionItem } from './components/Accordion'
import { Header } from './components/Header'
import { RadioButton } from './components/Radio-Button'
import { CheckboxButton } from './components/Checkbox-Button'
import { useTheme } from './hooks/useTheme'
import { BASE_OPTIONS, PROTEIN_OPTIONS, TOPPINGS_OPTIONS, SAUCE_OPTIONS } from './data/bowlOptions'
import bowlIcon from './assets/Icon/icon-bowl.png'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [base, setBase] = useState('')
  const [protein, setProtein] = useState('')
  const [toppings, setToppings] = useState<Set<string>>(new Set())
  const [sauce, setSauce] = useState('')

  function handleToppingChange(value: string, checked: boolean) {
    setToppings((prev) => {
      const next = new Set(prev)
      if (checked) { next.add(value) } else { next.delete(value) }
      return next
    })
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-content">
        <div className="page-header">
          <img src={bowlIcon} alt="" width="32" height="32" className="page-header__icon" aria-hidden="true" />
          <h1 className="type-header">Build a bowl</h1>
        </div>

        <Accordion>
          <AccordionItem id="base" header="Base">
            {/* fieldset+legend is the native HTML pattern for grouping real inputs.
                No ARIA needed — browsers and screen readers handle the group announcement automatically.
                SR reads: "Choose your base, group, Brown rice, radio button" */}
            <fieldset className="bowl-section">
              <legend className="type-body">Choose your base</legend>
              <ul className="bowl-section__options">
                {BASE_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <RadioButton
                      name="base"
                      value={opt.value}
                      label={opt.label}
                      checked={base === opt.value}
                      onChange={setBase}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </AccordionItem>

          <AccordionItem id="protein" header="Protein">
            <fieldset className="bowl-section">
              <legend className="type-body">Choose your protein</legend>
              <ul className="bowl-section__options">
                {PROTEIN_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <RadioButton
                      name="protein"
                      value={opt.value}
                      label={opt.label}
                      helpText={opt.helpText}
                      checked={protein === opt.value}
                      onChange={setProtein}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </AccordionItem>

          <AccordionItem id="toppings" header="Toppings">
            {/* role="group" + fieldset both work for checkboxes — fieldset is preferred
                because it's native and requires no ARIA to announce the group label */}
            <fieldset className="bowl-section">
              <legend className="type-body">Choose your toppings</legend>
              <ul className="bowl-section__options">
                {TOPPINGS_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <CheckboxButton
                      name="toppings"
                      value={opt.value}
                      label={opt.label}
                      helpText={opt.helpText}
                      checked={toppings.has(opt.value)}
                      onChange={handleToppingChange}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </AccordionItem>

          <AccordionItem id="sauce" header="Sauce">
            <fieldset className="bowl-section">
              <legend className="type-body">Choose your sauce</legend>
              <ul className="bowl-section__options">
                {SAUCE_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <RadioButton
                      name="sauce"
                      value={opt.value}
                      label={opt.label}
                      checked={sauce === opt.value}
                      onChange={setSauce}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  )
}
