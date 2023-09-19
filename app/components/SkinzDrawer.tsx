import {
	Button,
	Drawer,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Zoom,
	Fab
} from '@mui/material'
import { useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import '../styles/skins-drawer.css'
import { usePlayers } from '~/hooks/usePlayers'
import DrawerHeader from './DrawerHeader'
import theme from '~/theme'

const SkinzDrawer = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false),
		[players, updatePlayers] = usePlayers()

	const toggleDrawer = () => {
		setIsOpen(!isOpen)
	}

	const updateSkinz = (id: number, type: 'add' | 'subtract') => {
		const updatedPlayers = players.map((player) =>
			player.id === id
				? {
						...player,
						skinz: type === 'add' ? player.skinz + 1 : player.skinz - 1
				  }
				: player
		)
		updatePlayers(updatedPlayers)
		localStorage.setItem('players', JSON.stringify(updatedPlayers))
	}

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	}

	return (
		<>
			<Zoom
				in
				timeout={transitionDuration}
				style={{
					transitionDelay: `${transitionDuration.exit}ms`
				}}
				unmountOnExit
			>
				<Fab color='primary' className='skinz-button' onClick={toggleDrawer}>
					Skinz
				</Fab>
			</Zoom>
			<Drawer anchor='right' open={isOpen} onClose={toggleDrawer}>
				<div className='drawer-container'>
					<DrawerHeader closeDrawer={toggleDrawer} />
					<div className='table-container'>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Skinz</TableCell>
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{players.map((player) => (
										<TableRow key={player.id}>
											<TableCell>{player.name}</TableCell>
											<TableCell>{player.skinz}</TableCell>
											<TableCell>
												<div className='buttons'>
													<IconButton
														color='secondary'
														onClick={() => updateSkinz(player.id, 'subtract')}
													>
														<RemoveOutlinedIcon />
													</IconButton>
													<IconButton
														color='primary'
														onClick={() => updateSkinz(player.id, 'add')}
													>
														<AddOutlinedIcon />
													</IconButton>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Button variant='outlined' color='primary' onClick={toggleDrawer}>
							Done
						</Button>
					</div>
				</div>
			</Drawer>
		</>
	)
}

export default SkinzDrawer
