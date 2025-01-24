import React from 'react'
import { Button, Paper } from '@mui/material'
import GenerateMatchups from '~/components/GenerateMatchups'
import '../styles/matchups.css'
import { V2_MetaFunction } from '@remix-run/node'
import { usePlayers } from '~/hooks/usePlayers'
import { useNavigate } from '@remix-run/react'
import { useMatchups } from '~/hooks/useMatchups'
import MatchupCard from '~/components/matchups/MatchupCard'

export const meta: V2_MetaFunction = () => {
  return [
    { title: '4RTH Matchups' },
    {
      name: 'description',
      content: 'See the generated matchups for the 4RTH mixer.',
    },
  ]
}

const Matchups: React.FC = () => {
  const [players, _, loadingPlayers] = usePlayers(),
    [matchups] = useMatchups(),
    navigate = useNavigate()

  if (loadingPlayers) {
    return null
  }

  if (players.length !== 8) {
    return (
      <Paper className='flex justify-content-center p-16'>
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
        <GenerateMatchups />
      </Paper>
    )
  }

  return (
    <div className='matchups-container'>
      {matchups.map((round, roundIndex) => (
        <Paper key={roundIndex} className='round-container'>
          <div className='round-header'>
            <h2>Round {roundIndex + 1}</h2>
          </div>
          <div className='round-content'>
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
        </Paper>
      ))}
    </div>
  )
}

export default Matchups
