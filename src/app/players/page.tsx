'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { Player, usePlayers } from '@/hooks/usePlayers'
import { useMatchups } from '@/hooks/useMatchups'
import dynamic from 'next/dynamic'
import { useToast } from '@/hooks/use-toast'

// Dynamically import components that use client-side features
const GenerateMatchups = dynamic(
  () => import('@/components/GenerateMatchups'),
  { ssr: false }
)
const PlayersTable = dynamic(() => import('@/components/PlayersTable'), {
  ssr: false,
})

export default function PlayerForm() {
  const [players, updatePlayers] = usePlayers()
  const [matchups] = useMatchups()
  const [newPlayerName, setNewPlayerName] = useState('')
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('players', JSON.stringify(players))
    }
  }, [players])

  if (!mounted) {
    return null
  }

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPlayerName(event.target.value)
  }

  const addPlayer = () => {
    if (players.length < 8 && newPlayerName.trim() !== '') {
      const isNameTaken = players.some(
        (player: Player) => player.name === newPlayerName
      )
      if (!isNameTaken) {
        const newPlayer: Player = {
          id: Date.now(),
          name: newPlayerName,
          wins: 0,
          points: 0,
          diff: 0,
        }
        updatePlayers([...players, newPlayer])
        setNewPlayerName('')

        if (players.length + 1 === 8) {
          setNewPlayerName('')
        }
      } else {
        toast({
          title: 'Error',
          description: 'Player name already exists.',
          variant: 'destructive',
        })
      }
    }
  }

  const playerListFull = players.length >= 8

  const handleAddPlayerKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      addPlayer()
    }
  }

  return (
    <div className='space-y-4'>
      {matchups.length === 0 ? (
        <Card className='mb-4'>
          {!playerListFull ? (
            <div className='flex gap-2 items-center p-4 lg:w-[50vw]'>
              <Input
                placeholder='Player Name'
                value={newPlayerName}
                onChange={handlePlayerNameChange}
                onKeyDown={handleAddPlayerKeyDown}
                disabled={playerListFull}
              />
              <Button variant='outline' size='icon' onClick={addPlayer}>
                <Send className='h-4 w-4' />
              </Button>
            </div>
          ) : (
            <div className='flex justify-center p-4'>
              <GenerateMatchups redirect />
            </div>
          )}
        </Card>
      ) : null}
      <PlayersTable players={players} />
    </div>
  )
}
