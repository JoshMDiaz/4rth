'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { usePlayers } from '@/hooks/usePlayers'
import { Matchup, useMatchups } from '@/hooks/useMatchups'
import { useToast } from '@/hooks/use-toast'

type GenerateMatchupsProps = {
  redirect?: boolean
}

const GenerateMatchups = ({
  redirect,
}: GenerateMatchupsProps): React.JSX.Element => {
  const { toast } = useToast()
  const [players] = usePlayers()
  const [, updateMatchups] = useMatchups()
  const router = useRouter()

  const generate = () => {
    if (players.length === 8) {
      const matchups: Matchup[][] = [
        // Round 1
        [
          {
            team1: [players[0], players[1]],
            team2: [players[2], players[3]],
          },
          {
            team1: [players[4], players[5]],
            team2: [players[6], players[7]],
          },
        ],
        // Round 2
        [
          {
            team1: [players[0], players[4]],
            team2: [players[1], players[5]],
          },
          {
            team1: [players[2], players[6]],
            team2: [players[3], players[7]],
          },
        ],
        // Round 3
        [
          {
            team1: [players[0], players[2]],
            team2: [players[4], players[6]],
          },
          {
            team1: [players[1], players[3]],
            team2: [players[5], players[7]],
          },
        ],
        // Round 4
        [
          {
            team1: [players[0], players[5]],
            team2: [players[2], players[7]],
          },
          {
            team1: [players[1], players[4]],
            team2: [players[3], players[6]],
          },
        ],
        // Round 5,
        [
          {
            team1: [players[0], players[6]],
            team2: [players[5], players[3]],
          },
          {
            team1: [players[2], players[4]],
            team2: [players[7], players[1]],
          },
        ],
        // Round 6
        [
          {
            team1: [players[0], players[7]],
            team2: [players[6], players[1]],
          },
          {
            team1: [players[5], players[2]],
            team2: [players[3], players[4]],
          },
        ],
        // Round 7
        [
          {
            team1: [players[0], players[3]],
            team2: [players[7], players[4]],
          },
          {
            team1: [players[6], players[5]],
            team2: [players[2], players[1]],
          },
        ],
      ]
      if (redirect) {
        router.push('/matchups')
      } else {
        window.location.reload()
      }
      updateMatchups(matchups)
    } else {
      toast({
        title: 'Invalid Player Count',
        description: 'You need exactly 8 players to generate matchups.',
        variant: 'destructive',
      })
    }
  }

  return <Button onClick={generate}>Generate Matchups</Button>
}

export default GenerateMatchups
