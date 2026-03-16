/*
  components/Radio-Button/Radio-Button.tsx
  Author: Mirabelle Doiron

  Single radio button. Group via role="radiogroup" + aria-label in the parent.
  Styles live in main.css under the "Radio" section.
*/

import type { ChangeEvent } from 'react'

type RadioButtonProps = {
  name: string
  value: string
  label: string
  helpText?: string
  checked: boolean
  onChange: (value: string) => void
}

export function RadioButton({ name, value, label, helpText, checked, onChange }: RadioButtonProps) {
  return (
    <label className="radio">
      <input
        type="radio"
        className="radio__input"
        name={name}
        value={value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        aria-describedby={helpText ? `${name}-${value}-help` : undefined}
      />
      {label}
      {helpText && <span id={`${name}-${value}-help`} className="radio__help">{helpText}</span>}
    </label>
  )
}
