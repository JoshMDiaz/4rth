import React, { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@mui/material'
import { Player } from './players'
import '../styles/results.css'

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

	type WinnerProps = {
		header: string
		placeIndex?: number
		skinz?: boolean
	}

	const Winner = ({ header, placeIndex = 0, skinz }: WinnerProps) => {
		return (
			<Paper className='winner'>
				<h2>{header}</h2>
				{skinz && mostSkinzPlayers.length > 0 ? (
					<span>
						{mostSkinzPlayers.map((player) => player.name).join(', ')}
					</span>
				) : sortedPlayerData.length > 0 ? (
					<span>{sortedPlayerData[placeIndex].name}</span>
				) : null}
			</Paper>
		)
	}

	return (
		<div className='results-container'>
			<div className='winners-container'>
				<Winner header='1st Place' placeIndex={0} />
				<Winner header='2nd Place' placeIndex={1} />
				<Winner header='3rd Place' placeIndex={2} />
				<Winner header='Most Skinz' skinz />
			</div>
			<TableContainer component={Paper}>
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
		</div>
	)
}

export default ResultsPage
