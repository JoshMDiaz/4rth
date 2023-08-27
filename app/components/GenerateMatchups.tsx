import { Button } from '@mui/material'
import { Matchup } from '../routes/matchups'
import { Dispatch, SetStateAction } from 'react'

type GenerateMatchupsProps = {
	setMatchups: Dispatch<SetStateAction<Matchup[][]>>
}

const GenerateMatchups = ({
	setMatchups
}: GenerateMatchupsProps): JSX.Element => {
	const players = JSON.parse(localStorage.getItem('players') ?? '') || []

	const shuffleArray = (array: any[]) => {
		const shuffledArray = array.slice()
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i]
			]
		}
		return shuffledArray
	}

	const generate = () => {
		if (players.length === 8) {
			const matchups: any[] = []
			const rounds = 7 // Number of rounds

			// Generate the round-robin matchups
			for (let round = 0; round < rounds; round++) {
				const roundMatchups: Matchup[] = []
				const shuffledPlayers = shuffleArray(players)

				for (let i = 0; i < shuffledPlayers.length; i += 4) {
					const matchup: Matchup = {
						team1: [shuffledPlayers[i], shuffledPlayers[i + 1]],
						team2: [shuffledPlayers[i + 2], shuffledPlayers[i + 3]]
					}
					roundMatchups.push(matchup)
				}

				matchups.push(roundMatchups)
			}

			localStorage.setItem('matchups', JSON.stringify(matchups))
			setMatchups(matchups)
		} else {
			alert('You need exactly 8 players to generate matchups.')
		}
	}

	return (
		<Button
			variant='contained'
			color='primary'
			onClick={generate}
			disabled={players.length !== 8}
		>
			Generate Matchups
		</Button>
	)
}

export default GenerateMatchups
