import _styles from './MoneyInput.module.css'
import { useState, ChangeEvent, FocusEvent } from 'react'

const MONEY_SYMBOLS = new Map([
  ['en', '£'],
  ['eu', '€'],
  ['us', '$'],
])

export type MoneyInputProps = {
  locale?: string
  label?: string
  value: number
  disabled: boolean
  onChange: (value: number) => void
  onBlur: (value: number) => void
  // borderColor?: string;
  // borderSize?: string;
  // inputColor?: string;
}

const MoneyInput: React.FC<MoneyInputProps> = ({
  locale = 'eu',
  label,
  value,
  disabled = false,
  onChange,
  onBlur,
  // borderColor = '#000',
  // borderSize = '1px',
  // inputColor = '#000',
}) => {
  const [error, setError] = useState('')
  const displayValue = (value / 100).toFixed(2)

  const symbol = MONEY_SYMBOLS.get(locale) || '€'

  const getCentsFromStr = (str: string) => {
    const [notesStr, centsStr] = str.split('.')
    const numNotes = parseInt(notesStr || '0')
    const numCents = parseInt(centsStr || '0')
    const valueInCents = numNotes * 100 + numCents
    return valueInCents
  }

  const filterAndFormatValue = (newValue: string) => {
    const filteredValue = newValue.replaceAll(/[a-zA-Z!@#$%^&*()_+\-=[\]{};`~':"\\|.,<>/?]/g, '')

    if (newValue !== filteredValue) {
      setError('Please enter only number characters')
    } else {
      setError('')
    }

    const withDecimal = filteredValue.slice(0, -2) + '.' + filteredValue.slice(-2)
    return getCentsFromStr(withDecimal.slice(2))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const newValueInCents = filterAndFormatValue(newValue)

    if (newValueInCents === value) {
      return
    } else {
      onChange(newValueInCents)
    }
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const newValueInCents = filterAndFormatValue(newValue)

    if (newValueInCents === value) {
      return
    } else {
      onBlur(newValueInCents)
    }
  }

  const inputStyles = `${_styles.moneyInput} ${error && _styles.error} ${disabled && _styles.disabled}`

  // const dynamicStyles = {
  //   borderColor,
  //   borderWidth: borderSize,
  //   color: inputColor,
  // };

  return (
    <div className={`${_styles.wrapper}`}>
      <label htmlFor={`MoneyInput${label}`}>{label}</label>
      <input
        className={`${inputStyles} ${_styles.customInput}`}
        id={`MoneyInput${label}`}
        // style={dynamicStyles}
        type="text"
        value={`${symbol} ${displayValue}`}
        onChange={handleChange}
        placeholder="$0.00"
        onBlur={handleBlur}
      />
      {error && <div className={_styles.errorMessage}>{error}</div>}
    </div>
  )
}

export default MoneyInput
