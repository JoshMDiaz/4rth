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
import '../styles/standings.css'
import { V2_MetaFunction } from '@remix-run/node'
import { Player, usePlayers } from '~/hooks/usePlayers'
import NewPlayersButton from '~/components/NewPlayersButton'
import { useScores } from '~/hooks/useScores'

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Skinz Standings' },
		{ name: 'description', content: 'See the results from the Skinz mixer.' }
	]
}

const StandingsPage: React.FC = () => {
	const [players] = usePlayers(),
		[scores] = useScores()

	const mostSkinzPlayer = players.reduce((maxSkinzPlayer, player) => {
		if (player.skinz > maxSkinzPlayer.skinz) {
			return player
		}
		return maxSkinzPlayer
	}, players[0])

	// Custom sort function to sort by wins and then by points
	const customSort = (a: Player, b: Player) => {
		if (a.wins === b.wins) {
			return b.points - a.points // Sort by points if wins are equal
		}
		return b.wins - a.wins // Sort by wins by default
	}

	// Sort the players using the custom sort function
	const sortedPlayerData = [...players].sort(customSort)

	// Find all players with the most skinz
	const mostSkinzPlayers = players.filter(
		(player) => player.skinz === mostSkinzPlayer.skinz
	)

	type MatchupResultType = boolean
	type RoundResultType = {
		[matchupKey: string]: MatchupResultType
	}
	type SubmittedResultsType = {
		[roundKey: string]: RoundResultType
	}

	function showWinners(obj: SubmittedResultsType): boolean {
		// Check if there are 7 rounds
		if (Object.keys(obj).length !== 7) {
			return false
		}

		for (const roundKey in obj) {
			const round = obj[roundKey]

			// Check if there are 2 results for each round
			if (Object.keys(round).length !== 2) {
				return false
			}

			for (const matchupKey in round) {
				if (!round[matchupKey]) {
					return false // Return false if any value is not present or is false
				}
			}
		}

		return true // Return true if all checks pass
	}

	type WinnerProps = {
		header: string
		placeIndex?: number
		skinz?: boolean
	}

	const Winner = ({ header, placeIndex = 0, skinz }: WinnerProps) => {
		return (
			<Paper className='winner'>
				{skinz && mostSkinzPlayers.length > 0 ? (
					<h2>{mostSkinzPlayers.map((player) => player.name).join(', ')}</h2>
				) : sortedPlayerData.length > 0 ? (
					<h2>{sortedPlayerData[placeIndex].name}</h2>
				) : null}
				<div className='winner-divider' />
				<span>{header}</span>
			</Paper>
		)
	}

	return (
		<div className='results-container'>
			{players.length > 0 ? <NewPlayersButton /> : null}
			{players.length === 8 && !!scores && showWinners(scores) ? (
				<div className='winners-container'>
					<Winner header='1st' placeIndex={0} />
					<Winner header='2nd' placeIndex={1} />
					<Winner header='3rd' placeIndex={2} />
					<Winner header='4RTH' placeIndex={3} />
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

export default StandingsPage
