import React, { useEffect, useState } from 'react'
import { Button, Paper } from '@mui/material'
import GenerateMatchups from '~/components/GenerateMatchups'
import '../styles/matchups.css'
import NumberInput from '~/components/NumberInput'
import SkinzDrawer from '~/components/SkinzDrawer'
import { V2_MetaFunction } from '@remix-run/node'
import { usePlayers } from '~/hooks/usePlayers'
import { useNavigate } from '@remix-run/react'
import NewPlayersButton from '~/components/NewPlayersButton'
import { Matchup, useMatchups } from '~/hooks/useMatchups'
import { useScores } from '~/hooks/useScores'

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Skinz Matchups' },
		{
			name: 'description',
			content: 'See the generated matchups for the Skinz mixer.'
		}
	]
}

const Matchups: React.FC = () => {
	const [teamPoints, setTeamPoints] = useState<
			Record<string, Record<string, Record<string, number>>>
		>({}),
		[teamInputScores, setTeamInputScores] = useState<
			Record<string, Record<string, Record<string, number>>> | undefined
		>(),
		[players, _, loadingPlayers] = usePlayers(),
		[matchups] = useMatchups(),
		navigate = useNavigate(),
		[scores, updateScores] = useScores()

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

		setTeamPoints((prevState) => {
			const points = {
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
			}
			localStorage.setItem('teamPoints', JSON.stringify(points))
			return points
		})
		setTeamInputScores((prevState) => {
			const newScores = {
				...prevState,
				[`round${roundIndex + 1}`]: {
					...prevState?.[`round${roundIndex + 1}`],
					[`matchup${matchupIndex + 1}`]: {
						...prevState?.[`round${roundIndex + 1}`]?.[
							`matchup${matchupIndex + 1}`
						],
						[team]: score
					}
				}
			}
			localStorage.setItem('teamInputScores', JSON.stringify(newScores))
			return newScores
		})
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
			scoreSubmitted = !!scores?.[roundNumber]?.[matchupNumber]

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
								roundIndex,
								matchupIndex,
								team: 'team1',
								score: value
							})
						}}
						className='match-score'
					/>
				</div>
				<div className='matchup-divider' />
				<div className='team-score-container'>
					<span>{team2Players}</span>
					<NumberInput
						value={teamInputScores?.[roundNumber]?.[matchupNumber]?.team2}
						min={0}
						disabled={scoreSubmitted}
						onChange={(value) => {
							handleScoreChange({
								roundIndex,
								matchupIndex,
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
						onClick={(e) =>
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
						onClick={(e) =>
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

	const ShowNewPlayersButton = () => {
		return players.length > 0 ? <NewPlayersButton /> : null
	}

	if (loadingPlayers) {
		return null
	}

	if (players.length !== 8) {
		return (
			<Paper className='flex justify-content-center p-16'>
				<ShowNewPlayersButton />
				<Button
					variant='contained'
					color='primary'
					onClick={() => navigate('/players')}
				>
					Add Players
				</Button>
			</Paper>
		)
	}

	if (matchups.length === 0) {
		return (
			<Paper className='flex justify-content-center p-16'>
				<ShowNewPlayersButton />
				<GenerateMatchups />
			</Paper>
		)
	}

	return (
		<div className='matchups-container'>
			<ShowNewPlayersButton />
			{matchups.map((round, roundIndex) => (
				<Paper key={roundIndex} className='round-container'>
					<div className='round-header'>
						<h2>Round {roundIndex + 1}</h2>
						<SkinzDrawer />
					</div>
					<div className='round-content'>
						{round.map((matchup, matchupIndex) =>
							renderMatchup(matchup, roundIndex, matchupIndex)
						)}
					</div>
				</Paper>
			))}
		</div>
	)
}

export default Matchups
