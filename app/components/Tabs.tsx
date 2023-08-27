import { useState } from 'react'
import { Tabs as MuiTabs, Tab } from '@mui/material'
import { Link } from '@remix-run/react'

type TabsProps = {}

const Tabs = ({}: TabsProps): JSX.Element => {
	const [value, setValue] = useState(0)

	return (
		<MuiTabs value={value} textColor='primary' indicatorColor='primary'>
			<LinkTab label='Players' href='/players' index={0} setValue={setValue} />
			<LinkTab
				label='Matchups'
				href='/matchups'
				index={1}
				setValue={setValue}
			/>
			<LinkTab label='Results' href='/results' index={2} setValue={setValue} />
		</MuiTabs>
	)
}

export default Tabs

type LinkTabProps = {
	label: string
	href: string
	index: number
	setValue: (index: number) => void
}

const LinkTab = ({
	label,
	href,
	index,
	setValue
}: LinkTabProps): JSX.Element => {
	return (
		<Link to={href} onClick={() => setValue(index)}>
			<Tab label={label} />
		</Link>
	)
}
