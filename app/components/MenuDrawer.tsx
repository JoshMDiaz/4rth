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
import '../styles/menu-drawer.css'

type SettingsDrawerProps = {}

const SettingsDrawer = ({}: SettingsDrawerProps): JSX.Element => {
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
		<>
			<IconButton onClick={toggleDrawer}>
				<MenuOutlinedIcon />
			</IconButton>
			<Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer}>
				<DrawerHeader closeDrawer={toggleDrawer} />
				<div className='menu-drawer-container'>
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
						className='menu-item'
					>
						<ListItemIcon>
							<PhonelinkEraseIcon />
						</ListItemIcon>
						<ListItemText primary='Clear Player Data' />
					</ListItemButton>
				</div>
			</Drawer>
		</>
	)
}

export default SettingsDrawer
