'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Player } from '@/hooks/usePlayers'

type StandingsTableProps = { players: Player[] }

const StandingsTable = ({
  players,
}: StandingsTableProps): React.JSX.Element => {
  return (
    <div className='rounded-md border bg-white'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-lg'>Name</TableHead>
            <TableHead className='text-lg'>Wins</TableHead>
            <TableHead className='text-lg'>Differential</TableHead>
            <TableHead className='text-lg'>Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell className='text-lg'>{player.name}</TableCell>
              <TableCell className='text-lg'>{player.wins}</TableCell>
              <TableCell className='text-lg'>{player.diff}</TableCell>
              <TableCell className='text-lg'>{player.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default StandingsTable
