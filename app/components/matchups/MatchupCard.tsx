import { Button } from '@mui/material'
import { Matchup } from '~/hooks/useMatchups'
import { useScores } from '~/hooks/useScores'
import { Player } from '~/hooks/usePlayers'
import { useEffect, useState } from 'react'
import TeamScore from './TeamScore'

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
			<TeamScore
				team='team1'
				disabled={scoreSubmitted}
				matchup={matchup}
				teamInputScores={teamInputScores}
				roundNumber={roundNumber}
				matchupNumber={matchupNumber}
				setTeamPoints={setTeamPoints}
				setTeamInputScores={setTeamInputScores}
			/>
			<TeamScore
				team='team2'
				disabled={scoreSubmitted}
				matchup={matchup}
				teamInputScores={teamInputScores}
				roundNumber={roundNumber}
				matchupNumber={matchupNumber}
				setTeamPoints={setTeamPoints}
				setTeamInputScores={setTeamInputScores}
			/>
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
