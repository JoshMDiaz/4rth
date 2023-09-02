import { useEffect, useState } from 'react'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined'
import { useNavigate, useLocation } from '@remix-run/react'
import 'app/app.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'

type NavProps = {}

const Nav = ({}: NavProps): JSX.Element => {
	const { pathname } = useLocation(),
		pageName = pathname.split('/')[1]
	const [value, setValue] = useState(pageName),
		navigate = useNavigate()

	const navChange = (name: string) => {
		navigate(`/${name}`)
		setValue(name)
	}

	useEffect(() => {
		setValue(pageName)
	}, [])

	return (
		<div className='nav'>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(_, name) => {
					navChange(name)
				}}
			>
				<BottomNavigationAction
					label='Players'
					value='Players'
					icon={<GroupOutlinedIcon />}
				/>
				<BottomNavigationAction
					label='Matchups'
					value='Matchups'
					icon={<AllInclusiveOutlinedIcon />}
				/>
				<BottomNavigationAction
					label='Results'
					value='Results'
					icon={<CheckOutlinedIcon />}
				/>
			</BottomNavigation>
		</div>
	)
}

export default Nav
