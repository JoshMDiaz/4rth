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
	Paper,
	Hidden,
	Alert
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import '../styles/players.css'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import GenerateMatchups from '~/components/GenerateMatchups'

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
		[localStorageMatchups, setLocalStorageMatchups] = useState([]),
		[editingPlayer, setEditingPlayer] = useState<Player | null>(null)

	// Load players from localStorage on component mount
	useEffect(() => {
		const savedPlayers = localStorage.getItem('players')
		if (savedPlayers) {
			setPlayers(JSON.parse(savedPlayers))
		}
	}, [])

	useEffect(() => {
		const matchups = localStorage.getItem('matchups')
		if (matchups) {
			setLocalStorageMatchups(JSON.parse(matchups))
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

	// const incrementSkinz = (id: number) => {
	// 	const updatedPlayers = players.map((player) =>
	// 		player.id === id ? { ...player, skinz: player.skinz + 1 } : player
	// 	)
	// 	setPlayers(updatedPlayers)
	// }

	const handleClearTable = () => {
		setPlayers([])
		setNewPlayerName('')
		setEditingPlayer(null)
		localStorage.removeItem('matchups')
		localStorage.removeItem('teamInputScores')
		localStorage.removeItem('players')
	}

	const handleDeleteRow = (id: number) => {
		const updatedPlayers = players.filter((player) => player.id !== id)
		setPlayers(updatedPlayers)
		setEditingPlayer(null)
	}

	const playerListFull = players.length >= 8

	const handleAddPlayerKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Enter') {
			addPlayer()
		}
	}

	const handleEditPlayerKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>,
		player: Player,
		newName: string
	) => {
		if (event.key === 'Enter') {
			saveEditedName(player, newName)
		}
	}

	return (
		<div>
			<Paper className='players-header'>
				<div className='players-text-input flex-container'>
					{!playerListFull ? (
						<>
							<TextField
								label='Player Name'
								value={newPlayerName}
								onChange={handlePlayerNameChange}
								onKeyDown={handleAddPlayerKeyDown}
								disabled={playerListFull}
								className='player-name'
							/>

							<Button variant='outlined' color='primary' onClick={addPlayer}>
								<AddOutlinedIcon />
							</Button>
						</>
					) : (
						<GenerateMatchups redirect />
					)}
				</div>
				<Button variant='text' color='error' onClick={handleClearTable}>
					Clear Table
				</Button>
			</Paper>
			<Paper>
				{players.length > 0 ? (
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell />
								</TableRow>
							</TableHead>
							<TableBody>
								{players.map((player) => (
									<TableRow key={player.id}>
										<TableCell>
											{editingPlayer?.id === player.id ? (
												<div className='flex-container'>
													<TextField
														className='edit-player-name'
														value={editingPlayer.name}
														onChange={(e) =>
															setEditingPlayer({
																...editingPlayer,
																name: e.target.value
															})
														}
														onKeyDown={(
															e: React.KeyboardEvent<HTMLInputElement>
														) =>
															handleEditPlayerKeyDown(
																e,
																editingPlayer,
																editingPlayer.name
															)
														}
													/>
													<Hidden smDown>
														{editingPlayer?.id === player.id ? (
															<Button
																variant='outlined'
																color='primary'
																onClick={() =>
																	saveEditedName(
																		editingPlayer,
																		editingPlayer.name
																	)
																}
															>
																<SaveOutlinedIcon />
															</Button>
														) : null}
													</Hidden>
												</div>
											) : (
												player.name
											)}
										</TableCell>
										{/* <TableCell>
									{player.skinz}
									<Button
										variant='text'
										color='primary'
										onClick={() => incrementSkinz(player.id)}
									>
										<AddOutlinedIcon />
									</Button>
								</TableCell> */}
										<TableCell>
											{!localStorageMatchups ? (
												<div className='flex-container justify-end'>
													{editingPlayer?.id !== player.id ? (
														<>
															<Button
																variant='outlined'
																color='primary'
																onClick={() => editPlayerName(player)}
															>
																<EditOutlinedIcon />
															</Button>
															<Button
																variant='outlined'
																color='secondary'
																onClick={() => handleDeleteRow(player.id)}
															>
																<DeleteOutlineOutlinedIcon />
															</Button>
														</>
													) : (
														<Hidden smUp>
															{editingPlayer?.id === player.id ? (
																<Button
																	variant='outlined'
																	color='primary'
																	onClick={() =>
																		saveEditedName(
																			editingPlayer,
																			editingPlayer.name
																		)
																	}
																>
																	<SaveOutlinedIcon />
																</Button>
															) : null}
														</Hidden>
													)}
												</div>
											) : null}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<Alert severity='info'>Add players above</Alert>
				)}
			</Paper>
		</div>
	)
}

export default PlayerForm
