'use client'

import React, { forwardRef } from 'react'
import { Input } from '@/components/ui/input'

interface NumberInputProps {
  value?: number
  min?: number
  max?: number
  disabled?: boolean
  className?: string
  onChange: (value: number) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, min, max, disabled, className, onChange, onKeyDown }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (newValue === '') {
        // @ts-expect-error - We don't care if the input is empty.
        onChange(undefined)
      } else {
        const numValue = parseInt(newValue)
        if (!isNaN(numValue)) {
          onChange(numValue)
        }
      }
    }

    return (
      <Input
        type='number'
        value={value ?? ''}
        min={min}
        max={max}
        disabled={disabled}
        className={className}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        ref={ref}
      />
    )
  }
)

NumberInput.displayName = 'NumberInput'

export default NumberInput
