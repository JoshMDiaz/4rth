import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Player } from './usePlayers'

interface RoundResult {
	team1Score: number
	team2Score: number
	winner: 'team1' | 'team2' | null
}

export interface Matchup {
	team1: [Player | null, Player | null]
	team2: [Player | null, Player | null]
	result?: RoundResult | null
}

export const useMatchups = (): [
	Matchup[][],
	(matchups: Matchup[][]) => void
] => {
	const [matchups, setMatchups] = useState<Matchup[][]>([])

	useEffect(() => {
		const savedMatchups = localStorage.getItem('matchups')
		if (savedMatchups) {
			setMatchups(JSON.parse(savedMatchups))
		} else {
			updateMatchups([])
		}
	}, [])

	// Update players in both state and localStorage
	const updateMatchups = (newMatchups: Matchup[][]) => {
		setMatchups(matchups)
		localStorage.setItem('matchups', JSON.stringify(newMatchups))
	}

	useEffect(() => {
		console.log('useMatchups', matchups)
	}, [matchups])

	return [matchups, updateMatchups]
}
