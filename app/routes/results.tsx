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

type SubmittedResultsType = Record<string, Record<string, boolean>>

const ResultsPage: React.FC = () => {
	const [playerData, setPlayerData] = useState<Player[]>([]),
		[submittedResults, setSubmittedResults] = useState<SubmittedResultsType>()

	useEffect(() => {
		const savedPlayers = localStorage.getItem('players')
		if (savedPlayers) {
			setPlayerData(JSON.parse(savedPlayers))
		}
	}, [])

	useEffect(() => {
		const submittedScores = localStorage.getItem('submittedScores')
		if (submittedScores) {
			setSubmittedResults(JSON.parse(submittedScores))
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

	function showWinners(obj: SubmittedResultsType) {
		for (const roundKey in obj) {
			const round = obj[roundKey]
			for (const matchupKey in round) {
				if (!round[matchupKey]) {
					return false // Return false if any value is not present or is false
				}
			}
		}
		return true // Return true if all values are present and true
	}

	type WinnerProps = {
		header: string
		placeIndex?: number
		skinz?: boolean
	}

	const Winner = ({ header, placeIndex = 0, skinz }: WinnerProps) => {
		return (
			<Paper className='winner'>
				<span>{header}</span>
				{skinz && mostSkinzPlayers.length > 0 ? (
					<h2>{mostSkinzPlayers.map((player) => player.name).join(', ')}</h2>
				) : sortedPlayerData.length > 0 ? (
					<h2>{sortedPlayerData[placeIndex].name}</h2>
				) : null}
			</Paper>
		)
	}

	return (
		<div className='results-container'>
			{playerData.length === 8 && showWinners(submittedResults ?? {}) ? (
				<div className='winners-container'>
					<Winner header='1st Place' placeIndex={0} />
					<Winner header='2nd Place' placeIndex={1} />
					<Winner header='3rd Place' placeIndex={2} />
					<Winner header='Most Skinz' skinz />
				</div>
			) : null}
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
