'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePlayers } from '@/hooks/usePlayers'
import { useMatchups } from '@/hooks/useMatchups'
import GenerateMatchups from '@/components/GenerateMatchups'
import MatchupCard from '@/components/matchups/MatchupCard'

export default function Matchups() {
  const [players, , loadingPlayers] = usePlayers()
  const [matchups] = useMatchups()
  const router = useRouter()

  if (loadingPlayers) {
    return null
  }

  if (players.length !== 8) {
    return (
      <Card className='flex justify-center p-16'>
        <Button onClick={() => router.push('/players')}>Add Players</Button>
      </Card>
    )
  }

  if (matchups.length === 0) {
    return (
      <Card className='flex justify-center p-16'>
        <GenerateMatchups />
      </Card>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
      {matchups.map((round, roundIndex) => (
        <Card key={roundIndex} className='flex flex-col h-full'>
          <div className='p-4 border-b-2 border-primary flex justify-between'>
            <h2 className='text-xl font-semibold m-0'>
              Round {roundIndex + 1}
            </h2>
          </div>
          <div className='p-4 flex flex-col gap-8 flex-1 bg-[#d4d4d4]'>
            {round.map((matchup, matchupIndex) => (
              <MatchupCard
                key={`${matchup}-${matchupIndex}`}
                matchup={matchup}
                players={players}
                roundIndex={roundIndex}
                matchupIndex={matchupIndex}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
