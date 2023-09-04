import { useEffect, useState } from 'react'

export type Scores = Record<string, Record<string, boolean>>

type UpdateScoresType = {
	roundNumber: string
	matchupNumber: string
	scoreSubmitted: boolean
}

export const useScores = (): [Scores, (obj: UpdateScoresType) => void] => {
	const [scores, setScores] = useState<Scores>({})

	useEffect(() => {
		// Load players from localStorage on component mount
		const savedScores = localStorage.getItem('submittedScores')
		if (savedScores) {
			setScores(JSON.parse(savedScores))
		}
	}, [])

	// Update players in both state and localStorage
	const updateScores = ({
		roundNumber,
		matchupNumber,
		scoreSubmitted
	}: UpdateScoresType) => {
		setScores((prevState) => {
			const results = {
				...prevState,
				[roundNumber]: {
					...prevState[roundNumber],
					[matchupNumber]: scoreSubmitted
				}
			}
			localStorage.setItem('submittedScores', JSON.stringify(results))
			return results
		})
	}

	return [scores, updateScores]
}
