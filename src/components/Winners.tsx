'use client'

import { Player } from '@/hooks/usePlayers'
import { Scores, useScores } from '@/hooks/useScores'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type WinnersProps = {
  players: Player[]
}

const Winners = ({ players }: WinnersProps): JSX.Element | null => {
  const [scores] = useScores()

  const showWinners = (obj: Scores): boolean => {
    if (Object.keys(obj).length !== 7) {
      return false
    }

    for (const roundKey in obj) {
      const round = obj[roundKey]
      if (Object.keys(round).length !== 2) {
        return false
      }

      for (const matchupKey in round) {
        if (!round[matchupKey]) {
          return false
        }
      }
    }

    return true
  }

  return players.length === 8 && !!scores && showWinners(scores) ? (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
      <Winner header='1st' placeIndex={0} players={players} />
      <Winner header='2nd' placeIndex={1} players={players} />
      <Winner header='3rd' placeIndex={2} players={players} />
      <Winner header='4RTH' placeIndex={3} players={players} />
    </div>
  ) : null
}

type WinnerProps = {
  header: string
  players: Player[]
  placeIndex?: number
}

const Winner = ({ header, placeIndex = 0, players }: WinnerProps) => {
  return (
    <Card className='text-center'>
      <CardHeader className='pb-2'>
        {players.length > 0 && (
          <h2 className='text-lg font-semibold'>{players[placeIndex].name}</h2>
        )}
      </CardHeader>
      <CardContent>
        <div className='h-px bg-border mb-2' />
        <span className='text-sm text-muted-foreground'>{header}</span>
      </CardContent>
    </Card>
  )
}

export default Winners
