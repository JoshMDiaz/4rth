import { Button } from '@mui/material'
import { Matchup } from '~/hooks/useMatchups'
import NumberInput from '../NumberInput'
import { useScores } from '~/hooks/useScores'
import { Player } from '~/hooks/usePlayers'
import { useEffect, useState } from 'react'

type MatchupCardProps = {
	matchup: Matchup
	players: Player[]
	roundIndex: number
	matchupIndex: number
}

const MatchupCard = ({
	matchup,
	players,
	roundIndex,
	matchupIndex
}: MatchupCardProps): JSX.Element => {
	const [teamPoints, setTeamPoints] = useState<
			Record<string, Record<string, Record<string, number>>>
		>({}),
		[teamInputScores, setTeamInputScores] = useState<
			Record<string, Record<string, Record<string, number>>> | undefined
		>(),
		team1Players = matchup.team1
			.map((player) => (player ? player.name : 'TBD'))
			.join(' / '),
		team2Players = matchup.team2
			.map((player) => (player ? player.name : 'TBD'))
			.join(' / '),
		[scores, updateScores] = useScores(),
		roundNumber = `round${roundIndex + 1}`,
		matchupNumber = `matchup${matchupIndex + 1}`,
		roundMatchup = teamPoints?.[roundNumber]?.[matchupNumber],
		scoreSubmitted = !!scores?.[roundNumber]?.[matchupNumber]

	useEffect(() => {
		const saveTeamInputScores = localStorage.getItem('teamInputScores')
		if (saveTeamInputScores) {
			setTeamInputScores(JSON.parse(saveTeamInputScores))
		}
	}, [])

	useEffect(() => {
		const savedTeamPoints = localStorage.getItem('teamPoints')
		if (savedTeamPoints) {
			setTeamPoints(JSON.parse(savedTeamPoints))
		}
	}, [])

	const updateTeamInputScores = (team: 'team1' | 'team2', score: number) => {
		const teamInputScores = JSON.parse(
			localStorage.getItem('teamInputScores') ?? '{}'
		)

		const newScores = {
			...teamInputScores,
			[`round${roundIndex + 1}`]: {
				...teamInputScores?.[`round${roundIndex + 1}`],
				[`matchup${matchupIndex + 1}`]: {
					...teamInputScores?.[`round${roundIndex + 1}`]?.[
						`matchup${matchupIndex + 1}`
					],
					[team]: score
				}
			}
		}

		localStorage.setItem('teamInputScores', JSON.stringify(newScores))
		setTeamInputScores(newScores)
	}

	const updateTeamPoints = (team: 'team1' | 'team2', score: number) => {
		const teamPoints = JSON.parse(localStorage.getItem('teamPoints') ?? '{}')

		const newPoints = {
			...teamPoints,
			[`round${roundIndex + 1}`]: {
				...teamPoints[`round${roundIndex + 1}`],
				[`matchup${matchupIndex + 1}`]: {
					...teamPoints[`round${roundIndex + 1}`]?.[
						`matchup${matchupIndex + 1}`
					],
					[matchup[team][0]?.name ?? '']: score,
					[matchup[team][1]?.name ?? '']: score
				}
			}
		}

		localStorage.setItem('teamPoints', JSON.stringify(newPoints))
		setTeamPoints(newPoints)
	}

	const handleScoreChange = ({
		team,
		score
	}: {
		team: 'team1' | 'team2'
		score: number
	}) => {
		updateTeamInputScores(team, score)
		updateTeamPoints(team, score)
	}

	function findWinners(matchupData: Record<string, number>) {
		const maxScore = Math.max(...Object.values(matchupData))
		return Object.keys(matchupData).filter(
			(player) => matchupData[player] === maxScore
		)
	}

	function updateWins(playerNames: Array<string>, type: 'subtract' | 'add') {
		const updatedPlayers = [...players]
		for (const player of updatedPlayers) {
			if (playerNames.includes(player.name)) {
				type === 'subtract' ? (player.wins -= 1) : (player.wins += 1)
			}
		}

		localStorage.setItem('players', JSON.stringify(updatedPlayers))
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
		const matchupData = teamPoints[roundNumber][matchupNumber],
			updatedPlayers = [...players]

		for (const player of updatedPlayers) {
			const playerName = player.name

			if (matchupData[playerName] !== undefined) {
				type === 'subtract'
					? (player.points -= matchupData[playerName])
					: (player.points += matchupData[playerName])
			}
		}

		localStorage.setItem('players', JSON.stringify(updatedPlayers))
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
		updateScores({ roundNumber, matchupNumber, scoreSubmitted: true })
	}

	const handleEditScores = ({
		roundIndex,
		matchupIndex
	}: {
		roundIndex: number
		matchupIndex: number
	}) => {
		const roundNumber = `round${roundIndex + 1}`,
			matchupNumber = `matchup${matchupIndex + 1}`,
			matchupData = teamPoints?.[roundNumber]?.[matchupNumber],
			matchupWinners = findWinners(matchupData)
		updateWins(matchupWinners, 'subtract')
		updatePlayerPoints({ roundNumber, matchupNumber, type: 'subtract' })
		updateScores({ roundNumber, matchupNumber, scoreSubmitted: false })
	}

	return (
		<div key={matchupIndex} className='court-container'>
			<h3>Court {matchupIndex + 1}</h3>
			<div className='team-score-container'>
				<span>{team1Players}</span>
				<NumberInput
					value={teamInputScores?.[roundNumber]?.[matchupNumber]?.team1}
					min={0}
					disabled={scoreSubmitted}
					onChange={(value) => {
						handleScoreChange({
							team: 'team1',
							score: value
						})
					}}
					className='match-score'
				/>
			</div>
			<div className='team-score-container'>
				<span>{team2Players}</span>
				<NumberInput
					value={teamInputScores?.[roundNumber]?.[matchupNumber]?.team2}
					min={0}
					disabled={scoreSubmitted}
					onChange={(value) => {
						handleScoreChange({
							team: 'team2',
							score: value
						})
					}}
					className='match-score'
				/>
			</div>
			{scoreSubmitted ? (
				<Button
					variant='text'
					color='primary'
					onClick={() =>
						handleEditScores({
							roundIndex,
							matchupIndex
						})
					}
				>
					Edit Scores
				</Button>
			) : (
				<Button
					variant='contained'
					color='primary'
					disabled={
						!roundMatchup ||
						(roundMatchup && Object.keys(roundMatchup).length < 4) ||
						!areAllValuesNumbers(roundMatchup) ||
						scoreSubmitted
					}
					onClick={() =>
						handleScoreSubmit({
							roundIndex,
							matchupIndex
						})
					}
				>
					{scoreSubmitted ? 'Submitted' : 'Submit Scores'}
				</Button>
			)}
		</div>
	)
}

export default MatchupCard
