import React, { useEffect, useState } from 'react'
import { Player } from './players'
import { Button } from '@mui/material'

type Matchups = Array<Matchup[]>

interface RoundResult {
	team1Score: number
	team2Score: number
	winner: 'team1' | 'team2' | null
}

export type Matchup = {
	team1: [Player | null, Player | null]
	team2: [Player | null, Player | null]
	result?: RoundResult | null
}

const Matchups: React.FC = () => {
	const [matchups, setMatchups] = useState<Matchup[][]>([]),
		[teamPoints, setTeamPoints] = useState<
			Record<string, Record<string, Record<string, number>>>
		>({}),
		[submittedResults, setSubmittedResults] = useState<
			Record<string, Record<string, boolean>>
		>({})

	useEffect(() => {
		const savedMatchups = localStorage.getItem('matchups')
		if (savedMatchups) {
			setMatchups(JSON.parse(savedMatchups))
		}
	}, [])

	const handleScoreChange = ({
		roundIndex,
		matchupIndex,
		team,
		score
	}: {
		roundIndex: number
		matchupIndex: number
		team: 'team1' | 'team2'
		score: number
	}) => {
		const players = matchups[roundIndex][matchupIndex][team]
		setTeamPoints((prevState) => ({
			...prevState,
			[`round${roundIndex + 1}`]: {
				...prevState[`round${roundIndex + 1}`],
				[`matchup${matchupIndex + 1}`]: {
					...prevState[`round${roundIndex + 1}`]?.[
						`matchup${matchupIndex + 1}`
					],
					[players[0]?.name ?? '']: score,
					[players[1]?.name ?? '']: score
				}
			}
		}))
	}

	const handleScoreSubmit = ({
		roundIndex,
		matchupIndex
	}: {
		roundIndex: number
		matchupIndex: number
	}) => {
		function findWinners(matchupData: Record<string, number>) {
			const maxScore = Math.max(...Object.values(matchupData))
			return Object.keys(matchupData).filter(
				(player) => matchupData[player] === maxScore
			)
		}

		const roundNumber = `round${roundIndex + 1}`,
			matchupNumber = `matchup${matchupIndex + 1}`

		const matchupData = teamPoints[roundNumber][matchupNumber]

		const matchupWinners = findWinners(matchupData)

		function updateWins(playerNames: Array<string>) {
			const playersData =
				JSON.parse(localStorage.getItem('players') ?? '') || []

			for (const player of playersData) {
				if (playerNames.includes(player.name)) {
					player.wins += 1
				}
			}

			localStorage.setItem('players', JSON.stringify(playersData))
		}

		updateWins(matchupWinners)
		setSubmittedResults((prevState) => ({
			...prevState,
			[roundNumber]: {
				...prevState[roundNumber],
				[matchupNumber]: true
			}
		}))
	}

	const handleEditScores = ({
		roundIndex,
		matchupIndex
	}: {
		roundIndex: number
		matchupIndex: number
	}) => {
		setSubmittedResults((prevState) => ({
			...prevState,
			[`round${roundIndex + 1}`]: {
				...prevState[`round${roundIndex + 1}`],
				[`matchup${matchupIndex + 1}`]: false
			}
		}))

		function findWinners(matchupData: Record<string, number>) {
			const maxScore = Math.max(...Object.values(matchupData))
			return Object.keys(matchupData).filter(
				(player) => matchupData[player] === maxScore
			)
		}

		const roundNumber = `round${roundIndex + 1}`,
			matchupNumber = `matchup${matchupIndex + 1}`

		const matchupData = teamPoints[roundNumber][matchupNumber]

		const matchupWinners = findWinners(matchupData)

		function updateWins(playerNames: Array<string>) {
			const playersData =
				JSON.parse(localStorage.getItem('players') ?? '') || []

			for (const player of playersData) {
				if (playerNames.includes(player.name)) {
					player.wins -= 1
				}
			}

			localStorage.setItem('players', JSON.stringify(playersData))
		}

		updateWins(matchupWinners)
	}

	const renderMatchup = (
		matchup: Matchup,
		roundIndex: number,
		matchupIndex: number
	) => {
		const team1Players = matchup.team1
				.map((player) => (player ? player.name : 'TBD'))
				.join(' / '),
			team2Players = matchup.team2
				.map((player) => (player ? player.name : 'TBD'))
				.join(' / '),
			roundMatchup =
				teamPoints?.[`round${roundIndex + 1}`]?.[`matchup${matchupIndex + 1}`]

		function areAllValuesNumbers(obj: Record<string, number>) {
			if (typeof obj !== 'object' || obj === null) {
				return false
			}

			return Object.values(obj).every(
				(value) => typeof value === 'number' && !isNaN(value)
			)
		}

		return (
			<div key={matchupIndex}>
				<h3>Matchup {matchupIndex + 1}</h3>
				<div>
					Team 1: {team1Players}{' '}
					<input
						type='number'
						min={0}
						onChange={(e) => {
							handleScoreChange({
								roundIndex,
								matchupIndex,
								team: 'team1',
								score: parseInt(e.target.value)
							})
						}}
					/>
				</div>
				<div>
					Team 2: {team2Players}{' '}
					<input
						type='number'
						min={0}
						onChange={(e) => {
							handleScoreChange({
								roundIndex,
								matchupIndex,
								team: 'team2',
								score: parseInt(e.target.value)
							})
						}}
					/>
				</div>
				<Button
					variant='contained'
					color='primary'
					disabled={
						!roundMatchup ||
						(roundMatchup && Object.keys(roundMatchup).length < 4) ||
						!areAllValuesNumbers(roundMatchup) ||
						!!submittedResults?.[`round${roundIndex + 1}`]?.[
							`matchup${matchupIndex + 1}`
						]
					}
					onClick={(e) =>
						handleScoreSubmit({
							roundIndex,
							matchupIndex
						})
					}
				>
					{!!submittedResults?.[`round${roundIndex + 1}`]?.[
						`matchup${matchupIndex + 1}`
					]
						? 'Submitted'
						: 'Submit Scores'}
				</Button>
				{!!submittedResults?.[`round${roundIndex + 1}`]?.[
					`matchup${matchupIndex + 1}`
				] ? (
					<Button
						variant='text'
						color='primary'
						onClick={(e) =>
							handleEditScores({
								roundIndex,
								matchupIndex
							})
						}
					>
						Edit Scores
					</Button>
				) : null}
			</div>
		)
	}

	return (
		<div>
			<h1>Matchups</h1>
			{matchups.map((round, roundIndex) => (
				<div key={roundIndex}>
					<h2>Round {roundIndex + 1}</h2>
					{round.map((matchup, matchupIndex) =>
						renderMatchup(matchup, roundIndex, matchupIndex)
					)}
				</div>
			))}
		</div>
	)
}

export default Matchups
