import { Button } from '@mui/material'
import { Matchup } from '../routes/matchups'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from '@remix-run/react'
import type { Player } from '../routes/players'

type GenerateMatchupsProps =
	| {
			setMatchups: Dispatch<SetStateAction<Matchup[][]>>
			redirect?: never
	  }
	| {
			setMatchups?: never
			redirect: boolean
	  }

const GenerateMatchups = ({
	setMatchups,
	redirect
}: GenerateMatchupsProps): JSX.Element => {
	const [players, setPlayers] = useState<Player[]>([]),
		[localStorageMatchups, setLocalStorageMatchups] = useState([]),
		navigate = useNavigate()

	useEffect(() => {
		setPlayers(JSON.parse(localStorage.getItem('players') ?? '') ?? [])
	}, [])

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
			redirect ? navigate('/Matchups') : setMatchups?.(matchups)
		} else {
			alert('You need exactly 8 players to generate matchups.')
		}
	}

	useEffect(() => {
		const matchups = localStorage.getItem('matchups')
		if (matchups) {
			setLocalStorageMatchups(JSON.parse(matchups))
		}
	}, [])

	return (
		<Button
			variant='contained'
			color='primary'
			onClick={generate}
			disabled={(!redirect && players.length !== 8) || !!localStorageMatchups}
		>
			Generate Matchups
		</Button>
	)
}

export default GenerateMatchups
