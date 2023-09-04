import {
	Button,
	Drawer,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton
} from '@mui/material'
import { useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import '../styles/skins-drawer.css'
import { usePlayers } from '~/hooks/usePlayers'
import DrawerHeader from './DrawerHeader'

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

	return (
		<>
			<Button variant='outlined' onClick={toggleDrawer}>
				Skinz
			</Button>
			<Drawer anchor='right' open={isOpen} onClose={toggleDrawer}>
				<div className='drawer-container'>
					<DrawerHeader title='Skinz' closeDrawer={toggleDrawer} />
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
				</div>
			</Drawer>
		</>
	)
}

export default SkinzDrawer
