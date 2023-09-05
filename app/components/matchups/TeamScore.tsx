import { Matchup } from '~/hooks/useMatchups'
import NumberInput from '../NumberInput'

type TeamScoreProps = {
	team: 'team1' | 'team2'
	disabled: boolean
	matchup: Matchup
	teamInputScores?: Record<string, any>
	teamPoints?: Record<string, any>
	roundNumber: string
	matchupNumber: string
	setTeamPoints: (value: Record<string, any>) => void
	setTeamInputScores: (value: Record<string, any>) => void
}

const TeamScore = ({
	team,
	disabled,
	matchup,
	teamInputScores,
	roundNumber,
	matchupNumber,
	setTeamPoints,
	setTeamInputScores
}: TeamScoreProps) => {
	const playerNames = matchup[team]
		.map((player) => (player ? player.name : 'TBD'))
		.join(' / ')

	const updateTeamPoints = (team: 'team1' | 'team2', score: number) => {
		const teamPoints = JSON.parse(localStorage.getItem('teamPoints') ?? '{}')
		const newPoints = {
			...teamPoints,
			[roundNumber]: {
				...teamPoints[roundNumber],
				[matchupNumber]: {
					...teamPoints[roundNumber]?.[matchupNumber],
					[matchup[team][0]?.name ?? '']: score,
					[matchup[team][1]?.name ?? '']: score
				}
			}
		}
		localStorage.setItem('teamPoints', JSON.stringify(newPoints))
		setTeamPoints(newPoints)
	}

	const updateTeamInputScores = (team: 'team1' | 'team2', score: number) => {
		const teamInputScores = JSON.parse(
			localStorage.getItem('teamInputScores') ?? '{}'
		)
		const newScores = {
			...teamInputScores,
			[roundNumber]: {
				...teamInputScores?.[roundNumber],
				[matchupNumber]: {
					...teamInputScores?.[roundNumber]?.[matchupNumber],
					[team]: score
				}
			}
		}
		localStorage.setItem('teamInputScores', JSON.stringify(newScores))
		setTeamInputScores(newScores)
	}

	const handleScoreChange = (team: 'team1' | 'team2', score: number) => {
		updateTeamInputScores(team, score)
		updateTeamPoints(team, score)
	}

	return (
		<div className='team-score-container'>
			<span>{playerNames}</span>
			<NumberInput
				value={teamInputScores?.[roundNumber]?.[matchupNumber]?.[team]}
				min={0}
				disabled={disabled}
				onChange={(value) => {
					handleScoreChange(team, value)
				}}
				className='match-score'
			/>
		</div>
	)
}

export default TeamScore
