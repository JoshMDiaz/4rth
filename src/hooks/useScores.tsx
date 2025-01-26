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
    scoreSubmitted,
  }: UpdateScoresType) => {
    const scores = JSON.parse(localStorage.getItem('submittedScores') ?? '{}')
    const results = {
      ...scores,
      [roundNumber]: {
        ...scores[roundNumber],
        [matchupNumber]: scoreSubmitted,
      },
    }
    localStorage.setItem('submittedScores', JSON.stringify(results))
    setScores(results)
  }

  return [scores, updateScores]
}
