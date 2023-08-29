import React, { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography
} from '@mui/material'
import { Player } from './players'

const ResultsPage: React.FC = () => {
	const [playerData, setPlayerData] = useState<Player[]>([])

	useEffect(() => {
		const savedPlayers = localStorage.getItem('players')
		if (savedPlayers) {
			setPlayerData(JSON.parse(savedPlayers))
		}
	}, [])

	const mostSkinzPlayer = playerData.reduce((maxSkinzPlayer, player) => {
		if (player.skinz > maxSkinzPlayer.skinz) {
			return player
		}
		return maxSkinzPlayer
	}, playerData[0])

	// Custom sort function to sort by wins and then by points
	const customSort = (a: Player, b: Player) => {
		if (a.wins === b.wins) {
			return b.points - a.points // Sort by points if wins are equal
		}
		return b.wins - a.wins // Sort by wins by default
	}

	// Sort the playerData using the custom sort function
	const sortedPlayerData = [...playerData].sort(customSort)

	// Find all players with the most skinz
	const mostSkinzPlayers = playerData.filter(
		(player) => player.skinz === mostSkinzPlayer.skinz
	)

	return (
		<>
			<div>
				<Typography>1st Place:</Typography>
				{sortedPlayerData.length > 0 && (
					<Typography>{sortedPlayerData[0].name}</Typography>
				)}
			</div>
			<div>
				<Typography>2nd Place:</Typography>
				{sortedPlayerData.length > 1 && (
					<Typography>{sortedPlayerData[1].name}</Typography>
				)}
			</div>
			<div>
				<Typography>3rd Place:</Typography>
				{sortedPlayerData.length > 2 && (
					<Typography>{sortedPlayerData[2].name}</Typography>
				)}
			</div>
			<div>
				<Typography>Most Skinz:</Typography>
				{mostSkinzPlayers.length > 0 && (
					<Typography>
						{mostSkinzPlayers.map((player) => player.name).join(', ')}
					</Typography>
				)}
			</div>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Player Name</TableCell>
							<TableCell>Total Wins</TableCell>
							<TableCell>Total Points</TableCell>
							<TableCell>Total Skinz</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedPlayerData.map((player) => (
							<TableRow key={player.id}>
								<TableCell>{player.name}</TableCell>
								<TableCell>{player.wins}</TableCell>
								<TableCell>{player.points}</TableCell>
								<TableCell>{player.skinz}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default ResultsPage
