import React from 'react'
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
import Winners from '~/components/Winners'

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Skinz Standings' },
		{ name: 'description', content: 'See the results from the Skinz mixer.' }
	]
}

const StandingsPage: React.FC = () => {
	const [players] = usePlayers()

	// Custom sort function to sort by wins and then by points
	const customSort = (a: Player, b: Player) => {
		if (a.wins === b.wins) {
			return b.points - a.points // Sort by points if wins are equal
		}
		return b.wins - a.wins // Sort by wins by default
	}

	// Sort the players using the custom sort function
	const sortedPlayerData = [...players].sort(customSort)

	return (
		<div className='results-container'>
			{players.length > 0 ? <NewPlayersButton /> : null}
			<Winners players={sortedPlayerData} />
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
