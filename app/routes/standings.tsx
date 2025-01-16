import React from 'react'
import '../styles/standings.css'
import { V2_MetaFunction } from '@remix-run/node'
import { Player, usePlayers } from '~/hooks/usePlayers'
import Winners from '~/components/Winners'
import StandingsTable from '~/components/tables/StandingsTable'

export const meta: V2_MetaFunction = () => {
  return [
    { title: '4RTH Standings' },
    { name: 'description', content: 'See the results from the Skinz mixer.' },
  ]
}

const StandingsPage: React.FC = () => {
  const [players] = usePlayers()

  // Custom sort function to sort by wins, diff, and then points
  const customSort = (a: Player, b: Player) => {
    if (a.wins === b.wins) {
      if (a.diff === b.diff) {
        return b.points - a.points // Sort by points if wins and diff are equal
      }
      return b.diff - a.diff // Sort by diff if wins are equal
    }
    return b.wins - a.wins // Sort by wins by default
  }

  // Sort the players using the custom sort function
  const sortedPlayerData = [...players].sort(customSort)

  return (
    <div className='results-container'>
      <Winners players={sortedPlayerData} />
      <StandingsTable players={sortedPlayerData} />
    </div>
  )
}

export default StandingsPage
