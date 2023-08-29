import React, { useState, useEffect } from 'react'
import {
	TextField,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid
} from '@mui/material'
import { useNavigate } from '@remix-run/react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'

export interface Player {
	id: number
	name: string
	wins: number
	skinz: number
	points: number
}

const PlayerForm: React.FC = () => {
	const [players, setPlayers] = useState<Player[]>([]),
		[newPlayerName, setNewPlayerName] = useState(''),
		[editingPlayer, setEditingPlayer] = useState<Player | null>(null),
		navigate = useNavigate()

	// Load players from localStorage on component mount
	useEffect(() => {
		const savedPlayers = localStorage.getItem('players')
		if (savedPlayers) {
			setPlayers(JSON.parse(savedPlayers))
		}
	}, [])

	// Save players to localStorage whenever players change
	useEffect(() => {
		players.length > 0 &&
			localStorage.setItem('players', JSON.stringify(players))
	}, [players])

	const handlePlayerNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewPlayerName(event.target.value)
	}

	const addPlayer = () => {
		if (players.length < 8 && newPlayerName.trim() !== '') {
			const isNameTaken = players.some(
				(player) => player.name === newPlayerName
			)
			if (!isNameTaken) {
				const newPlayer: Player = {
					id: Date.now(), // Assign a unique ID
					name: newPlayerName,
					wins: 0,
					skinz: 0,
					points: 0
				}
				setPlayers([...players, newPlayer])
				setNewPlayerName('')

				if (players.length + 1 === 8) {
					setNewPlayerName('')
				}
			} else {
				alert('Player name already exists.')
			}
		}
	}

	const editPlayerName = (player: Player) => {
		setEditingPlayer(player)
	}

	const saveEditedName = (player: Player, newName: string) => {
		const updatedPlayers = players.map((p) =>
			p.id === player.id ? { ...p, name: newName } : p
		)
		setPlayers(updatedPlayers)
		setEditingPlayer(null)
	}

	const incrementSkinz = (id: number) => {
		const updatedPlayers = players.map((player) =>
			player.id === id ? { ...player, skinz: player.skinz + 1 } : player
		)
		setPlayers(updatedPlayers)
	}

	const handleClearTable = () => {
		setPlayers([])
		setNewPlayerName('')
		setEditingPlayer(null)
	}

	const handleDeleteRow = (id: number) => {
		const updatedPlayers = players.filter((player) => player.id !== id)
		setPlayers(updatedPlayers)
		setEditingPlayer(null)
	}

	const isTextFieldDisabled = players.length >= 8 || !!editingPlayer

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addPlayer()
		}
	}

	return (
		<div>
			<Grid
				container
				direction='row'
				justifyContent='space-around'
				alignItems='center'
			>
				<TextField
					label='Player Name'
					value={newPlayerName}
					onChange={handlePlayerNameChange}
					onKeyDown={handleKeyDown}
					disabled={isTextFieldDisabled}
				/>
				<Grid item xs={2}>
					<Button variant='outlined' color='primary' onClick={addPlayer}>
						<AddOutlinedIcon />
					</Button>
				</Grid>
				<Grid item xs={2}>
					<Button
						variant='outlined'
						color='secondary'
						onClick={handleClearTable}
					>
						<RestartAltOutlinedIcon />
					</Button>
				</Grid>
			</Grid>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Skinz</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{players.map((player) => (
							<TableRow key={player.id}>
								<TableCell>
									{editingPlayer?.id === player.id ? (
										<TextField
											value={editingPlayer.name}
											onChange={(e) =>
												setEditingPlayer({
													...editingPlayer,
													name: e.target.value
												})
											}
										/>
									) : (
										player.name
									)}
								</TableCell>
								<TableCell>
									{player.skinz}
									<Button
										variant='text'
										color='primary'
										onClick={() => incrementSkinz(player.id)}
									>
										<AddOutlinedIcon />
									</Button>
								</TableCell>
								<TableCell>
									{editingPlayer?.id === player.id ? (
										<Button
											variant='text'
											color='primary'
											onClick={() =>
												saveEditedName(editingPlayer, editingPlayer.name)
											}
										>
											Save
										</Button>
									) : (
										<>
											<Button
												variant='text'
												color='primary'
												onClick={() => editPlayerName(player)}
											>
												<EditOutlinedIcon />
											</Button>
											<Button
												variant='text'
												color='secondary'
												onClick={() => handleDeleteRow(player.id)}
											>
												<DeleteOutlineOutlinedIcon />
											</Button>
										</>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default PlayerForm
