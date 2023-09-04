import { Player } from '~/hooks/usePlayers'
import { Scores, useScores } from '~/hooks/useScores'
import '../styles/winners.css'
import { Paper } from '@mui/material'

type WinnersProps = {
	players: Player[]
}

const Winners = ({ players }: WinnersProps): JSX.Element | null => {
	const [scores] = useScores()

	const showWinners = (obj: Scores): boolean => {
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

	return players.length === 8 && !!scores && showWinners(scores) ? (
		<div className='winners-container'>
			<Winner header='1st' placeIndex={0} players={players} />
			<Winner header='2nd' placeIndex={1} players={players} />
			<Winner header='3rd' placeIndex={2} players={players} />
			<Winner header='4RTH' placeIndex={3} players={players} />
			<Winner header='Most Skinz' skinz players={players} />
		</div>
	) : null
}

export default Winners

type WinnerProps = {
	header: string
	players: Player[]
	placeIndex?: number
	skinz?: boolean
}

const Winner = ({ header, placeIndex = 0, skinz, players }: WinnerProps) => {
	const mostSkinzPlayer = players.reduce((maxSkinzPlayer, player) => {
		if (player.skinz > maxSkinzPlayer.skinz) {
			return player
		}
		return maxSkinzPlayer
	}, players[0])

	// Find all players with the most skinz
	const mostSkinzPlayers = players.filter(
		(player) => player.skinz === mostSkinzPlayer.skinz
	)

	return (
		<Paper className='winner'>
			{skinz && mostSkinzPlayers.length > 0 ? (
				<h2>{mostSkinzPlayers.map((player) => player.name).join(', ')}</h2>
			) : players.length > 0 ? (
				<h2>{players[placeIndex].name}</h2>
			) : null}
			<div className='winner-divider' />
			<span>{header}</span>
		</Paper>
	)
}
