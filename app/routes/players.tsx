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
import '../styles/players.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import GenerateMatchups from '~/components/GenerateMatchups'
import { V2_MetaFunction } from '@remix-run/node'
import { Player, usePlayers } from '~/hooks/usePlayers'
import { useMatchups } from '~/hooks/useMatchups'
import SendIcon from '@mui/icons-material/Send'
import PlayersTable from '~/components/tables/PlayersTable'

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Skinz Players' },
		{ name: 'description', content: 'Add the players for the Skinz mixer.' }
	]
}

const PlayerForm: React.FC = () => {
	const [players, updatePlayers] = usePlayers(),
		[matchups] = useMatchups(),
		[newPlayerName, setNewPlayerName] = useState('')

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
				(player: Player) => player.name === newPlayerName
			)
			if (!isNameTaken) {
				const newPlayer: Player = {
					id: Date.now(), // Assign a unique ID
					name: newPlayerName,
					wins: 0,
					skinz: 0,
					points: 0
				}
				updatePlayers([...players, newPlayer])
				setNewPlayerName('')

				if (players.length + 1 === 8) {
					setNewPlayerName('')
				}
			} else {
				alert('Player name already exists.')
			}
		}
	}

	const playerListFull = players.length >= 8

	const handleAddPlayerKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Enter') {
			addPlayer()
		}
	}

	return (
		<div>
			{matchups.length === 0 ? (
				<Paper className='players-header'>
					{!playerListFull ? (
						<div className='flex-container'>
							<TextField
								label='Player Name'
								value={newPlayerName}
								onChange={handlePlayerNameChange}
								onKeyDown={handleAddPlayerKeyDown}
								disabled={playerListFull}
								className='player-name'
							/>

							<IconButton color='primary' onClick={addPlayer}>
								<SendIcon />
							</IconButton>
						</div>
					) : (
						<div className='generate-container'>
							<GenerateMatchups redirect />
						</div>
					)}
				</Paper>
			) : null}
			<PlayersTable players={players} />
		</div>
	)
}

export default PlayerForm
