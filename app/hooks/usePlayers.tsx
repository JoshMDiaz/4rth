import { useEffect, useState } from 'react'

export interface Player {
	id: number
	name: string
	wins: number
	skinz: number
	points: number
	diff: number
}

export const usePlayers = (): [
	Player[],
	(newPlayers: Player[]) => void,
	boolean
] => {
	const [players, setPlayers] = useState<Player[]>([]),
		[loadingPlayers, setLoadingPlayers] = useState(true)

	useEffect(() => {
		// Load players from localStorage on component mount
		const savedPlayers = localStorage.getItem('players')
		if (savedPlayers) {
			setPlayers(JSON.parse(savedPlayers))
			setLoadingPlayers(false)
		}
	}, [])

	// Update players in both state and localStorage
	const updatePlayers = (newPlayers: Player[]) => {
		setPlayers(newPlayers)
		localStorage.setItem('players', JSON.stringify(newPlayers))
	}

	return [players, updatePlayers, loadingPlayers]
}
