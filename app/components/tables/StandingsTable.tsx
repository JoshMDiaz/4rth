import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@mui/material'
import { Player } from '~/hooks/usePlayers'

type StandingsTableProps = { players: Player[] }

const StandingsTable = ({ players }: StandingsTableProps): JSX.Element => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Player Name</TableCell>
						<TableCell>Total Wins</TableCell>
						<TableCell>Point Differential</TableCell>
						<TableCell>Total Points</TableCell>
						<TableCell>Total Skinz</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{players.map((player) => (
						<TableRow key={player.id}>
							<TableCell>{player.name}</TableCell>
							<TableCell>{player.wins}</TableCell>
							<TableCell>{player.diff}</TableCell>
							<TableCell>{player.points}</TableCell>
							<TableCell>{player.skinz}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default StandingsTable
