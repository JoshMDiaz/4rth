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

const StandingsTable = ({ players }: StandingsTableProps): JSX.Element => {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Wins</TableHead>
            <TableHead>Differential</TableHead>
            <TableHead>Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.wins}</TableCell>
              <TableCell>{player.diff}</TableCell>
              <TableCell>{player.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default StandingsTable
