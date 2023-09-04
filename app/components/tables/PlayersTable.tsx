import React, { useState } from 'react'
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
	Alert,
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
	IconButton
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import '../../styles/players.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { Player, usePlayers } from '~/hooks/usePlayers'
import { useMatchups } from '~/hooks/useMatchups'

type PlayersTableType = {
	players: Player[]
}

const PlayersTable = ({ players }: PlayersTableType): JSX.Element => {
	const [_, updatePlayers] = usePlayers(),
		[matchups] = useMatchups(),
		[editingPlayer, setEditingPlayer] = useState<Player | null>(null),
		[isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<
			Record<string, boolean>
		>({})

	const editPlayerName = (player: Player) => {
		setEditingPlayer(player)
	}

	const saveEditedName = (player: Player, newName: string) => {
		const updatedPlayers = players.map((p) =>
			p.id === player.id ? { ...p, name: newName } : p
		)
		updatePlayers(updatedPlayers)
		setEditingPlayer(null)
	}

	const handleDeleteRow = (id: number) => {
		const updatedPlayers = players.filter((player) => player.id !== id)
		updatePlayers(updatedPlayers)
		setEditingPlayer(null)
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

	const openDeletePlayerDialog = (playerId: Player['id']) => {
		setIsConfirmDeleteOpen((prevState) => ({
			...prevState,
			[playerId]: true
		}))
	}

	const closeDeletePlayerDialog = (playerId: Player['id']) => {
		setIsConfirmDeleteOpen((prevState) => ({
			...prevState,
			[playerId]: false
		}))
	}

	return (
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
														<IconButton
															color='primary'
															onClick={() =>
																saveEditedName(
																	editingPlayer,
																	editingPlayer.name
																)
															}
														>
															<CheckOutlinedIcon />
														</IconButton>
													) : null}
												</Hidden>
											</div>
										) : (
											player.name
										)}
									</TableCell>
									<TableCell>
										{matchups.length === 0 ? (
											<div className='player-action-buttons'>
												{editingPlayer?.id !== player.id ? (
													<>
														<IconButton
															color='primary'
															onClick={() => editPlayerName(player)}
														>
															<EditOutlinedIcon />
														</IconButton>
														<IconButton
															color='error'
															onClick={() => openDeletePlayerDialog(player.id)}
														>
															<DeleteOutlineOutlinedIcon />
														</IconButton>
														<Dialog open={isConfirmDeleteOpen[player.id]}>
															<DialogTitle>Are you sure?</DialogTitle>
															<DialogContent>
																<DialogContentText>
																	This will delete {player.name} from the list
																	of players.
																</DialogContentText>
															</DialogContent>
															<DialogActions>
																<Button
																	variant='text'
																	color='secondary'
																	onClick={() =>
																		closeDeletePlayerDialog(player.id)
																	}
																>
																	Cancel
																</Button>
																<Button
																	variant='text'
																	color='primary'
																	onClick={() => {
																		handleDeleteRow(player.id)
																		closeDeletePlayerDialog(player.id)
																	}}
																>
																	Confirm
																</Button>
															</DialogActions>
														</Dialog>
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
																<CheckOutlinedIcon />
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
	)
}

export default PlayersTable
