'use client'

import React, { useState } from 'react'
import { Pencil, Trash2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Player, usePlayers } from '@/hooks/usePlayers'
import { useMatchups } from '@/hooks/useMatchups'

type PlayersTableType = {
  players: Player[]
}

const PlayersTable = ({ players }: PlayersTableType): JSX.Element => {
  const [, updatePlayers] = usePlayers()
  const [matchups] = useMatchups()
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<
    Record<string, boolean>
  >({})

  const editPlayerName = (player: Player) => {
    setEditingPlayer(player)
  }

  const saveEditedName = (player: Player, newName: string) => {
    const updatedPlayers = players.map((p) =>
      p.id === player.id ? { ...p, name: newName } : p
    )
    updatePlayers(updatedPlayers)
    setEditingPlayer(null)
  }

  const handleDeleteRow = (id: number) => {
    const updatedPlayers = players.filter((player) => player.id !== id)
    updatePlayers(updatedPlayers)
    setEditingPlayer(null)
  }

  const handleEditPlayerKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    player: Player,
    newName: string
  ) => {
    if (event.key === 'Enter') {
      saveEditedName(player, newName)
    }
  }

  const openDeletePlayerDialog = (playerId: Player['id']) => {
    setIsConfirmDeleteOpen((prevState) => ({
      ...prevState,
      [playerId]: true,
    }))
  }

  const closeDeletePlayerDialog = (playerId: Player['id']) => {
    setIsConfirmDeleteOpen((prevState) => ({
      ...prevState,
      [playerId]: false,
    }))
  }

  return (
    <div>
      {players.length > 0 ? (
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className='w-[100px]'>
                  <div className='flex justify-end'>Actions</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>
                    {editingPlayer?.id === player.id ? (
                      <div className='flex items-center gap-2'>
                        <Input
                          value={editingPlayer.name}
                          onChange={(e) =>
                            setEditingPlayer({
                              ...editingPlayer,
                              name: e.target.value,
                            })
                          }
                          onKeyDown={(e) =>
                            handleEditPlayerKeyDown(
                              e,
                              editingPlayer,
                              editingPlayer.name
                            )
                          }
                          className='h-9'
                        />
                        <Button
                          size='icon'
                          variant='ghost'
                          onClick={() =>
                            saveEditedName(editingPlayer, editingPlayer.name)
                          }
                        >
                          <Check className='h-4 w-4' />
                        </Button>
                      </div>
                    ) : (
                      player.name
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    {matchups.length === 0 &&
                      editingPlayer?.id !== player.id && (
                        <div className='flex justify-end gap-2'>
                          <Button
                            size='icon'
                            variant='ghost'
                            onClick={() => editPlayerName(player)}
                          >
                            <Pencil className='h-4 w-4' />
                          </Button>
                          <Button
                            size='icon'
                            variant='ghost'
                            onClick={() => openDeletePlayerDialog(player.id)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>

                          <AlertDialog
                            open={isConfirmDeleteOpen[player.id]}
                            onOpenChange={() =>
                              closeDeletePlayerDialog(player.id)
                            }
                          >
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will delete {player.name} from the list
                                  of players.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    handleDeleteRow(player.id)
                                    closeDeletePlayerDialog(player.id)
                                  }}
                                >
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Alert className='bg-blue-50 border-blue-200'>
          <AlertDescription>Add players above</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default PlayersTable
