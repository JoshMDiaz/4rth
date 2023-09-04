import logo from '../images/logo-black.svg'
import { usePlayers } from '~/hooks/usePlayers'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Drawer,
	IconButton,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material'
import { useState } from 'react'
import DrawerHeader from './DrawerHeader'
import { useNavigate } from '@remix-run/react'
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase'

const Header = (): JSX.Element => {
	const [_, updatePlayers] = usePlayers(),
		[drawerOpen, setDrawerOpen] = useState(false),
		navigate = useNavigate(),
		[isDialogOpen, setIsDialogOpen] = useState(false)

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const handleClearData = () => {
		localStorage.clear()
		navigate('/')
		updatePlayers([])
	}

	return (
		<header>
			<IconButton onClick={toggleDrawer}>
				<MenuOutlinedIcon />
			</IconButton>
			<img height={70} src={logo} id='logo' />
			<div style={{ width: 40 }} />
			<Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer}>
				<DrawerHeader title='Settings' closeDrawer={toggleDrawer} />
				<div>
					<Dialog open={isDialogOpen}>
						<DialogTitle>Are you sure?</DialogTitle>
						<DialogContent>
							<DialogContentText>
								This will erase all of the player data for this session.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button
								variant='text'
								color='secondary'
								onClick={() => setIsDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button
								variant='text'
								color='primary'
								onClick={() => {
									handleClearData()
									setIsDialogOpen(false)
									toggleDrawer()
								}}
							>
								Confirm
							</Button>
						</DialogActions>
					</Dialog>
					<ListItemButton
						component='button'
						onClick={() => setIsDialogOpen(true)}
					>
						<ListItemIcon>
							<PhonelinkEraseIcon />
						</ListItemIcon>
						<ListItemText primary='Clear Player Data' />
					</ListItemButton>
				</div>
			</Drawer>
		</header>
	)
}

export default Header
