import { Button } from '@mui/material'
import { Matchup } from '../routes/matchups'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from '@remix-run/react'
import { Player } from '~/hooks/usePlayers'

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
		[localStorageMatchups, setLocalStorageMatchups] = useState(),
		navigate = useNavigate()

	// const generate = () => {
	// 	if (players.length === 8) {
	// 		const matchups: Matchup[][] = []
	// 		const rounds = 7 // Number of rounds

	// 		// Generate the round-robin matchups
	// 		for (let round = 0; round < rounds; round++) {
	// 			const roundMatchups: Matchup[] = []

	// 			for (let i = 0; i < 8; i += 4) {
	// 				const matchup: Matchup = {
	// 					team1: [players[i], players[i + 1]],
	// 					team2: [players[i + 2], players[i + 3]]
	// 				}
	// 				roundMatchups.push(matchup)
	// 			}

	// 			matchups.push(roundMatchups)
	// 		}

	// 		localStorage.setItem('matchups', JSON.stringify(matchups))
	// 		redirect ? navigate('/Matchups') : setMatchups?.(matchups)
	// 	} else {
	// 		alert('You need exactly 8 players to generate matchups.')
	// 	}
	// }

	const generate = () => {
		if (players.length === 8) {
			const matchups: Matchup[][] = [
				// Round 1
				[
					{
						team1: [players[0], players[1]],
						team2: [players[2], players[3]]
					},
					{
						team1: [players[4], players[5]],
						team2: [players[6], players[7]]
					}
				],
				// Round 2
				[
					{
						team1: [players[4], players[6]],
						team2: [players[5], players[7]]
					},
					{
						team1: [players[0], players[2]],
						team2: [players[1], players[3]]
					}
				],
				// Round 3
				[
					{
						team1: [players[0], players[3]],
						team2: [players[1], players[2]]
					},
					{
						team1: [players[4], players[7]],
						team2: [players[5], players[6]]
					}
				],
				// Round 4
				[
					{
						team1: [players[2], players[6]],
						team2: [players[3], players[7]]
					},
					{
						team1: [players[0], players[4]],
						team2: [players[1], players[5]]
					}
				],
				// Round 5
				[
					{
						team1: [players[0], players[5]],
						team2: [players[1], players[6]]
					},
					{
						team1: [players[2], players[7]],
						team2: [players[3], players[4]]
					}
				],
				// Round 6
				[
					{
						team1: [players[2], players[4]],
						team2: [players[3], players[5]]
					},
					{
						team1: [players[0], players[6]],
						team2: [players[1], players[7]]
					}
				],
				// Round 7
				[
					{
						team1: [players[0], players[7]],
						team2: [players[1], players[4]]
					},
					{
						team1: [players[2], players[5]],
						team2: [players[3], players[6]]
					}
				]
			]
			localStorage.setItem('matchups', JSON.stringify(matchups))
			redirect ? navigate('/Matchups') : setMatchups?.(matchups)
		} else {
			alert('You need exactly 8 players to generate matchups.')
		}
	}

	useEffect(() => {
		const players = localStorage.getItem('players')
		if (players) {
			setPlayers(JSON.parse(players))
		}
	}, [])

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
