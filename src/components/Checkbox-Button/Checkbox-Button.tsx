/*
  components/Checkbox-Button/Checkbox-Button.tsx
  Author: Mirabelle Doiron

  Single checkbox. Group via role="group" + aria-label in the parent.
  Styles live in main.css under the "Checkbox" section.
*/

import type { ChangeEvent } from 'react'

type CheckboxButtonProps = {
  name: string
  value: string
  label: string
  helpText?: string
  checked: boolean
  onChange: (value: string, checked: boolean) => void
}

export function CheckboxButton({ name, value, label, helpText, checked, onChange }: CheckboxButtonProps) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        value={value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(value, e.target.checked)}
        aria-describedby={helpText ? `${name}-${value}-help` : undefined}
      />
      {label}
      {helpText && <span id={`${name}-${value}-help`} className="checkbox__help">{helpText}</span>}
    </label>
  )
}
