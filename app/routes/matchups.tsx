import React, { useEffect, useState } from 'react'
import { Player } from './players'
import { Button } from '@mui/material'
import GenerateMatchups from '~/components/GenerateMatchups'

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

	function findWinners(matchupData: Record<string, number>) {
		const maxScore = Math.max(...Object.values(matchupData))
		return Object.keys(matchupData).filter(
			(player) => matchupData[player] === maxScore
		)
	}

	function updateWins(playerNames: Array<string>, type: 'subtract' | 'add') {
		const playersData = JSON.parse(localStorage.getItem('players') ?? '') || []

		for (const player of playersData) {
			if (playerNames.includes(player.name)) {
				type === 'subtract' ? (player.wins -= 1) : (player.wins += 1)
			}
		}

		localStorage.setItem('players', JSON.stringify(playersData))
	}

	const updatePlayerPoints = ({
		roundNumber,
		matchupNumber,
		type
	}: {
		roundNumber: string
		matchupNumber: string
		type: 'subtract' | 'add'
	}) => {
		const matchupData = teamPoints[roundNumber][matchupNumber]

		const playersData = JSON.parse(localStorage.getItem('players') ?? '') || []

		for (const player of playersData) {
			const playerName = player.name

			if (matchupData[playerName] !== undefined) {
				type === 'subtract'
					? (player.points -= matchupData[playerName])
					: (player.points += matchupData[playerName])
			}
		}

		localStorage.setItem('players', JSON.stringify(playersData))
	}

	function areAllValuesNumbers(obj: Record<string, number>) {
		if (typeof obj !== 'object' || obj === null) {
			return false
		}

		return Object.values(obj).every(
			(value) => typeof value === 'number' && !isNaN(value)
		)
	}

	const handleScoreSubmit = ({
		roundIndex,
		matchupIndex
	}: {
		roundIndex: number
		matchupIndex: number
	}) => {
		const roundNumber = `round${roundIndex + 1}`,
			matchupNumber = `matchup${matchupIndex + 1}`,
			matchupData = teamPoints[roundNumber][matchupNumber],
			matchupWinners = findWinners(matchupData)

		updateWins(matchupWinners, 'add')
		updatePlayerPoints({ roundNumber, matchupNumber, type: 'add' })
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

		const roundNumber = `round${roundIndex + 1}`,
			matchupNumber = `matchup${matchupIndex + 1}`,
			matchupData = teamPoints[roundNumber][matchupNumber],
			matchupWinners = findWinners(matchupData)

		updateWins(matchupWinners, 'subtract')
		updatePlayerPoints({ roundNumber, matchupNumber, type: 'subtract' })
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
			roundNumber = `round${roundIndex + 1}`,
			matchupNumber = `matchup${matchupIndex + 1}`,
			roundMatchup = teamPoints?.[roundNumber]?.[matchupNumber],
			scoreSubmitted = !!submittedResults?.[roundNumber]?.[matchupNumber]

		return (
			<div key={matchupIndex}>
				<h3>Court {matchupIndex + 1}</h3>
				<div>
					Team 1: {team1Players}{' '}
					<input
						type='number'
						min={0}
						disabled={scoreSubmitted}
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
						disabled={scoreSubmitted}
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
						scoreSubmitted
					}
					onClick={(e) =>
						handleScoreSubmit({
							roundIndex,
							matchupIndex
						})
					}
				>
					{scoreSubmitted ? 'Submitted' : 'Submit Scores'}
				</Button>
				{scoreSubmitted ? (
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

	return matchups.length === 0 ? (
		<GenerateMatchups setMatchups={setMatchups} />
	) : (
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
