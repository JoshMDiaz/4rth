import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Matchup } from '@/hooks/useMatchups'
import { useScores } from '@/hooks/useScores'
import { Player } from '@/hooks/usePlayers'
import TeamScore from './TeamScore'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

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
  matchupIndex,
}: MatchupCardProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const [teamPoints, setTeamPoints] = useState<
    Record<string, Record<string, Record<string, number>>>
  >({})
  const [teamInputScores, setTeamInputScores] = useState<
    Record<string, Record<string, Record<string, number>>> | undefined
  >()
  const [scores, updateScores] = useScores()
  const roundNumber = `round${roundIndex + 1}`
  const matchupNumber = `matchup${matchupIndex + 1}`
  const roundMatchup = teamPoints?.[roundNumber]?.[matchupNumber]
  const scoreSubmitted = scores?.[roundNumber]?.[matchupNumber]
  const team1InputRef = useRef<HTMLInputElement | null>(null)
  const team2InputRef = useRef<HTMLInputElement | null>(null)

  const handleTeam1KeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      team2InputRef.current?.focus()
    }
  }

  const handleTeam2KeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      teamInputScores?.[roundNumber]?.[matchupNumber]?.team1
    ) {
      handleScoreSubmit({ roundIndex, matchupIndex })
    }
  }

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
        if (type === 'subtract') {
          player.wins -= 1
        } else {
          player.wins += 1
        }
      }
    }

    localStorage.setItem('players', JSON.stringify(updatedPlayers))
  }

  const updatePlayerPoints = ({
    roundNumber,
    matchupNumber,
    type,
  }: {
    roundNumber: string
    matchupNumber: string
    type: 'subtract' | 'add'
  }) => {
    const matchupData = teamPoints[roundNumber][matchupNumber],
      updatedPlayers = [...players]

    interface DataObject {
      [key: string]: number
    }

    function findMinMax(data: DataObject): { min: number; max: number } {
      const dataArray = Object.values(data)

      if (dataArray.length === 0) {
        throw new Error('The object is empty')
      }

      const minValue = Math.min(...dataArray)
      const maxValue = Math.max(...dataArray)

      return { min: minValue, max: maxValue }
    }

    const minMaxResults = findMinMax(matchupData),
      { min, max } = minMaxResults,
      lowerDiff = min - max,
      highDiff = max - min

    for (const player of updatedPlayers) {
      const playerName = player.name,
        playerPoints = matchupData[playerName]

      if (playerPoints !== undefined) {
        if (type === 'subtract') {
          player.points -= playerPoints
          player.diff -= playerPoints === min ? lowerDiff : highDiff
        } else {
          player.points += playerPoints
          player.diff += playerPoints === min ? lowerDiff : highDiff
        }
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
    matchupIndex,
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

    // Create updated scores object to check
    const updatedScores = {
      ...scores,
      [roundNumber]: {
        ...scores?.[roundNumber],
        [matchupNumber]: true,
      },
    }

    // Check if all scores are submitted using the updated scores
    const allScoresSubmitted =
      Object.keys(updatedScores).length === 7 &&
      Object.values(updatedScores).every(
        (round: Record<string, boolean>) =>
          Object.keys(round).length === 2 &&
          Object.values(round).every((matchup) => matchup === true)
      )
    console.log('allScoresSubmitted', allScoresSubmitted)

    updateScores({ roundNumber, matchupNumber, scoreSubmitted: true })

    if (allScoresSubmitted) {
      const { dismiss } = toast({
        title: 'All Scores Submitted!',
        description: 'Click to view the standings',
        variant: 'info',
        duration: 5000,
        className: 'cursor-pointer',
        onClick: () => {
          dismiss()
          router.push('/standings')
        },
      })
    }
  }

  const handleEditScores = ({
    roundIndex,
    matchupIndex,
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
    <div className='p-2 space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Court {matchupIndex + 1}</h3>
        {scoreSubmitted && (
          <span className='text-sm px-2 py-1 bg-green-50 text-green-700 rounded-full'>
            Submitted
          </span>
        )}
      </div>

      <div className='space-y-6'>
        <TeamScore
          team='team1'
          disabled={scoreSubmitted}
          matchup={matchup}
          teamInputScores={teamInputScores}
          roundNumber={roundNumber}
          matchupNumber={matchupNumber}
          setTeamPoints={setTeamPoints}
          setTeamInputScores={setTeamInputScores}
          inputRef={team1InputRef}
          onKeyDown={handleTeam1KeyDown}
        />
        <div className='flex items-center'>
          <div className='h-px bg-gray-200 flex-1' />
          <span className='px-3 text-sm text-gray-500'>VS</span>
          <div className='h-px bg-gray-200 flex-1' />
        </div>
        <TeamScore
          team='team2'
          disabled={scoreSubmitted}
          matchup={matchup}
          teamInputScores={teamInputScores}
          roundNumber={roundNumber}
          matchupNumber={matchupNumber}
          setTeamPoints={setTeamPoints}
          setTeamInputScores={setTeamInputScores}
          inputRef={team2InputRef}
          onKeyDown={handleTeam2KeyDown}
        />
      </div>

      {scoreSubmitted ? (
        <Button
          variant='outline'
          onClick={() => handleEditScores({ roundIndex, matchupIndex })}
          className='w-full mt-6'
        >
          Edit Scores
        </Button>
      ) : (
        <Button
          disabled={
            !roundMatchup ||
            (roundMatchup && Object.keys(roundMatchup).length < 4) ||
            !areAllValuesNumbers(roundMatchup) ||
            scoreSubmitted
          }
          onClick={() => handleScoreSubmit({ roundIndex, matchupIndex })}
          className='w-full mt-6'
        >
          Submit Scores
        </Button>
      )}
    </div>
  )
}

export default MatchupCard
