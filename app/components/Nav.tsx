import { useEffect, useState } from 'react'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined'
import { useNavigate, useLocation } from '@remix-run/react'
import 'app/app.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { useMatchups } from '~/hooks/useMatchups'

type NavProps = {}

const Nav = ({}: NavProps): JSX.Element => {
	const { pathname } = useLocation(),
		pageName = pathname.split('/')[1],
		[value, setValue] = useState(pageName),
		navigate = useNavigate(),
		[matchups] = useMatchups()

	const navChange = (name: string) => {
		navigate(`/${name}`)
		setValue(name)
	}

	useEffect(() => {
		setValue(pageName)
	}, [pageName])

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
					value='players'
					icon={<GroupOutlinedIcon />}
				/>
				<BottomNavigationAction
					label='Matchups'
					value='matchups'
					icon={<AllInclusiveOutlinedIcon />}
				/>
				<BottomNavigationAction
					label='Standings'
					value='standings'
					icon={<CheckOutlinedIcon />}
				/>
			</BottomNavigation>
		</div>
	)
}

export default Nav
