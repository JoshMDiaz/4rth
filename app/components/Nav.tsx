import { useState } from 'react'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined'
import { useNavigate, useLocation } from '@remix-run/react'
import 'app/app.css'

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

	return (
		<div className='nav'>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(_, name) => {
					navChange(name)
				}}
			>
				{/* <Link to='/players'>
					<BottomNavigationAction
						label='Players'
						icon={<GroupOutlinedIcon />}
					/>
				</Link>
				<Link to='/matchups'>
					<BottomNavigationAction
						label='Matchups'
						icon={<AllInclusiveOutlinedIcon />}
					/>
				</Link>
				<Link to='/results'>
					<BottomNavigationAction
						label='Results'
						icon={<AllInclusiveOutlinedIcon />}
					/>
				</Link> */}
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
					icon={<AllInclusiveOutlinedIcon />}
				/>
			</BottomNavigation>
		</div>
	)
}

export default Nav
