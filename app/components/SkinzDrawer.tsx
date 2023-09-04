import {
	Button,
	Drawer,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@mui/material'
import { useEffect, useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import '../styles/skins-drawer.css'
import { usePlayers } from '~/hooks/usePlayers'

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
			<Button variant='text' onClick={toggleDrawer}>
				Skinz
			</Button>
			<Drawer anchor='right' open={isOpen} onClose={toggleDrawer}>
				<div className='drawer-container'>
					<div className='drawer-header'>
						<h2>Skinz</h2>
						<Button variant='text' color='primary' onClick={toggleDrawer}>
							<CloseOutlinedIcon />
						</Button>
					</div>
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
											<Button
												variant='text'
												color='primary'
												onClick={() => updateSkinz(player.id, 'subtract')}
											>
												<RemoveOutlinedIcon />
											</Button>
											<Button
												variant='text'
												color='primary'
												onClick={() => updateSkinz(player.id, 'add')}
											>
												<AddOutlinedIcon />
											</Button>
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
