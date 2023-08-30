import React from 'react'
import TextField from '@mui/material/TextField'

interface NumberInputProps {
	min?: number
	disabled?: boolean
	value?: number
	onChange: (newValue: number) => void
	className?: string
}

const NumberInput: React.FC<NumberInputProps> = ({
	min = 0,
	disabled = false,
	value,
	onChange,
	className
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value)
		onChange(newValue)
	}

	return (
		<TextField
			type='number'
			inputProps={{ min, disabled }}
			value={value}
			onChange={handleChange}
			className={className}
		/>
	)
}

export default NumberInput
