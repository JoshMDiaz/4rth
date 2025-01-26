'use client'

import { useState, useEffect } from 'react'
import { Player, usePlayers } from '@/hooks/usePlayers'
import dynamic from 'next/dynamic'

const Winners = dynamic(() => import('@/components/Winners'), { ssr: false })
const StandingsTable = dynamic(() => import('@/components/StandingsTable'), {
  ssr: false,
})

export default function StandingsPage() {
  const [players] = usePlayers()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const customSort = (a: Player, b: Player) => {
    if (a.wins === b.wins) {
      if (a.diff === b.diff) {
        return b.points - a.points
      }
      return b.diff - a.diff
    }
    return b.wins - a.wins
  }

  const sortedPlayerData = [...players].sort(customSort)

  return (
    <div className='flex flex-col gap-4'>
      <Winners players={sortedPlayerData} />
      <StandingsTable players={sortedPlayerData} />
    </div>
  )
}
