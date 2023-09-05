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
	const [teamPoints, setTeamPoints] = useState<Record<string, any>>({}),
		[teamInputScores, setTeamInputScores] = useState<Record<string, any>>(),
		[scores, updateScores] = useScores(),
		roundNumber = `round${roundIndex + 1}`,
		matchupNumber = `matchup${matchupIndex + 1}`,
		roundMatchup = teamPoints?.[roundNumber]?.[matchupNumber],
		scoreSubmitted = !!scores?.[roundNumber]?.[matchupNumber]

	useEffect(() => {
		const loadDataFromLocalStorage = (key: string, setState: Function) => {
			const savedData = localStorage.getItem(key)
			if (savedData) {
				setState(JSON.parse(savedData))
			}
		}

		loadDataFromLocalStorage('teamInputScores', setTeamInputScores)
		loadDataFromLocalStorage('teamPoints', setTeamPoints)
	}, [])

	const updateWins = (playerNames: Array<string>, type: 'subtract' | 'add') => {
		const updatedPlayers = [...players]

		for (const player of updatedPlayers) {
			if (playerNames.includes(player.name)) {
				type === 'subtract' ? (player.wins -= 1) : (player.wins += 1)
			}
		}

		localStorage.setItem('players', JSON.stringify(updatedPlayers))
	}

	const updateLocalStorage = (key: string, data: any) => {
		localStorage.setItem(key, JSON.stringify(data))
	}

	const updateScoresAndPlayers = (type: 'subtract' | 'add') => {
		const matchupData = teamPoints[roundNumber][matchupNumber]
		const matchupWinners = findWinners(matchupData)
		const updatedPlayers = [...players]

		for (const player of updatedPlayers) {
			const playerName = player.name

			if (matchupData[playerName] !== undefined) {
				type === 'subtract'
					? (player.points -= matchupData[playerName])
					: (player.points += matchupData[playerName])
			}
		}

		updateLocalStorage('players', updatedPlayers)
		updateWins(matchupWinners, type)
		updateScores({
			roundNumber,
			matchupNumber,
			scoreSubmitted: !scoreSubmitted
		})
	}

	const findWinners = (matchupData: Record<string, number>) => {
		const maxScore = Math.max(...Object.values(matchupData))
		return Object.keys(matchupData).filter(
			(player) => matchupData[player] === maxScore
		)
	}

	const handleScoreChange = (team: 'team1' | 'team2', score: number) => {
		const teamInputScoresCopy = { ...teamInputScores }
		teamInputScoresCopy[roundNumber][matchupNumber][team] = score
		updateLocalStorage('teamInputScores', teamInputScoresCopy)
		setTeamInputScores(teamInputScoresCopy)
		updateTeamPoints(team, score)
	}

	const updateTeamPoints = (team: 'team1' | 'team2', score: number) => {
		const teamPointsCopy = { ...teamPoints }
		teamPointsCopy[roundNumber][matchupNumber][matchup[team][0]?.name ?? ''] =
			score
		teamPointsCopy[roundNumber][matchupNumber][matchup[team][1]?.name ?? ''] =
			score
		updateLocalStorage('teamPoints', teamPointsCopy)
		setTeamPoints(teamPointsCopy)
	}

	const areAllValuesNumbers = (obj: Record<string, number>) => {
		if (typeof obj !== 'object' || obj === null) {
			return false
		}
		return Object.values(obj).every(
			(value) => typeof value === 'number' && !isNaN(value)
		)
	}

	const handleScoreSubmit = () => {
		if (
			!roundMatchup ||
			Object.keys(roundMatchup).length < 4 ||
			!areAllValuesNumbers(roundMatchup) ||
			scoreSubmitted
		) {
			return
		}

		updateScoresAndPlayers('add')
	}

	const handleEditScores = () => {
		if (!scoreSubmitted) {
			return
		}

		updateScoresAndPlayers('subtract')
	}

	const team1Players = matchup.team1
		.map((player) => (player ? player.name : 'TBD'))
		.join(' / ')

	const team2Players = matchup.team2
		.map((player) => (player ? player.name : 'TBD'))
		.join(' / ')

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
						handleScoreChange('team1', value)
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
						handleScoreChange('team2', value)
					}}
					className='match-score'
				/>
			</div>
			{scoreSubmitted ? (
				<Button variant='text' color='primary' onClick={handleEditScores}>
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
					onClick={handleScoreSubmit}
				>
					{scoreSubmitted ? 'Submitted' : 'Submit Scores'}
				</Button>
			)}
		</div>
	)
}

export default MatchupCard
