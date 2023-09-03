import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material'
import { useNavigate } from '@remix-run/react'
import { useState } from 'react'
import { usePlayers } from '~/hooks/usePlayers'
import '../styles/new-players-button.css'

const NewPlayersButton = (): JSX.Element => {
	const navigate = useNavigate(),
		[isDialogOpen, setIsDialogOpen] = useState(false),
		[_, updatePlayers] = usePlayers()

	const handleClearData = () => {
		localStorage.clear()
		navigate('/')
		updatePlayers([])
	}

	return (
		<div className='new-players-button'>
			<Button
				variant='text'
				color='error'
				onClick={() => setIsDialogOpen(true)}
			>
				New Players
			</Button>
			<Dialog open={isDialogOpen}>
				<DialogTitle>Are you sure?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						This will erase all of the player data for this session.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant='text'
						color='secondary'
						onClick={() => setIsDialogOpen(false)}
					>
						Cancel
					</Button>
					<Button
						variant='text'
						color='primary'
						onClick={() => {
							handleClearData()
							setIsDialogOpen(false)
						}}
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default NewPlayersButton
