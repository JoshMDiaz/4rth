'use client'

import { Matchup } from '@/hooks/useMatchups'
import NumberInput from '@/components/NumberInput'

type TeamScoreProps = {
  team: 'team1' | 'team2'
  disabled: boolean
  matchup: Matchup
  teamInputScores?: Record<
    string,
    {
      [key: string]: {
        [team: string]: number
      }
    }
  >
  teamPoints?: Record<
    string,
    {
      [key: string]: {
        [playerName: string]: number
      }
    }
  >
  roundNumber: string
  matchupNumber: string
  setTeamPoints: (
    value: Record<
      string,
      {
        [key: string]: {
          [playerName: string]: number
        }
      }
    >
  ) => void
  setTeamInputScores: (
    value: Record<
      string,
      {
        [key: string]: {
          [team: string]: number
        }
      }
    >
  ) => void
  inputRef?: React.RefObject<HTMLInputElement | null>
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const TeamScore = ({
  team,
  disabled,
  matchup,
  teamInputScores,
  roundNumber,
  matchupNumber,
  setTeamPoints,
  setTeamInputScores,
  inputRef,
  onKeyDown,
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
          [matchup[team][1]?.name ?? '']: score,
        },
      },
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
          [team]: score,
        },
      },
    }
    localStorage.setItem('teamInputScores', JSON.stringify(newScores))
    setTeamInputScores(newScores)
  }

  const handleScoreChange = (team: 'team1' | 'team2', score: number) => {
    updateTeamInputScores(team, score)
    updateTeamPoints(team, score)
  }

  return (
    <div className='flex items-center justify-between gap-4'>
      <span className='text-lg'>{playerNames}</span>
      <NumberInput
        value={teamInputScores?.[roundNumber]?.[matchupNumber]?.[team]}
        min={0}
        disabled={disabled}
        onChange={(value) => {
          handleScoreChange(team, value)
        }}
        className='w-[75px]'
        ref={inputRef}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default TeamScore
