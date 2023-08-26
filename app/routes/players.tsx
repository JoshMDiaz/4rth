import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useNavigate } from '@remix-run/react'
import { Matchup } from './matchups'

export interface Player {
  id: number
  name: string
  wins: number
  skinz: number
  points: number
}

const PlayerForm: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]),
    [newPlayerName, setNewPlayerName] = useState(''),
    [editingPlayer, setEditingPlayer] = useState<Player | null>(null),
    navigate = useNavigate()

  // Load players from localStorage on component mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('players')
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers))
    }
  }, [])

  // Save players to localStorage whenever players change
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players))
  }, [players])

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPlayerName(event.target.value)
  }

  const addPlayer = () => {
    if (players.length < 8 && newPlayerName.trim() !== '') {
      const isNameTaken = players.some(
        (player) => player.name === newPlayerName
      )
      if (!isNameTaken) {
        const newPlayer: Player = {
          id: Date.now(), // Assign a unique ID
          name: newPlayerName,
          wins: 0,
          skinz: 0,
          points: 0,
        }
        setPlayers([...players, newPlayer])
        setNewPlayerName('')

        if (players.length + 1 === 8) {
          setNewPlayerName('')
        }
      } else {
        alert('Player name already exists.')
      }
    }
  }

  const editPlayerName = (player: Player) => {
    setEditingPlayer(player)
  }

  const saveEditedName = (player: Player, newName: string) => {
    const updatedPlayers = players.map((p) =>
      p.id === player.id ? { ...p, name: newName } : p
    )
    setPlayers(updatedPlayers)
    setEditingPlayer(null)
  }

  const incrementSkinz = (id: number) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, skinz: player.skinz + 1 } : player
    )
    setPlayers(updatedPlayers)
  }

  const handleClearTable = () => {
    setPlayers([])
    setNewPlayerName('')
    setEditingPlayer(null)
  }

  const handleDeleteRow = (id: number) => {
    const updatedPlayers = players.filter((player) => player.id !== id)
    setPlayers(updatedPlayers)
    setEditingPlayer(null)
  }

  const isTextFieldDisabled = players.length >= 8 || !!editingPlayer

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addPlayer()
    }
  }

  const generateMatchups = () => {
    if (players.length === 8) {
      const matchups: any[] = []
      const rounds = 7 // Number of rounds

      // Generate the round-robin matchups
      for (let round = 0; round < rounds; round++) {
        const roundMatchups: Matchup[] = []
        const shuffledPlayers = shuffleArray(players)

        for (let i = 0; i < shuffledPlayers.length; i += 4) {
          const matchup: Matchup = {
            team1: [shuffledPlayers[i], shuffledPlayers[i + 1]],
            team2: [shuffledPlayers[i + 2], shuffledPlayers[i + 3]],
          }
          roundMatchups.push(matchup)
        }

        matchups.push(roundMatchups)
      }

      localStorage.setItem('matchups', JSON.stringify(matchups))

      // Navigate to the matchups page
      // You can use React Router or any other navigation method
      navigate('/matchups')
    } else {
      alert('You need exactly 8 players to generate matchups.')
    }
  }

  const shuffleArray = (array: any[]) => {
    const shuffledArray = array.slice()
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]
    }
    return shuffledArray
  }

  return (
    <div>
      <TextField
        label="Player Name"
        value={newPlayerName}
        onChange={handlePlayerNameChange}
        onKeyDown={handleKeyDown}
        disabled={isTextFieldDisabled}
      />
      <Button variant="contained" color="primary" onClick={addPlayer}>
        Add Player
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClearTable}>
        Clear Table
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={generateMatchups}
        disabled={players.length !== 8}
      >
        Generate Matchups
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Wins</TableCell>
              <TableCell>Skinz</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>
                  {editingPlayer?.id === player.id ? (
                    <TextField
                      value={editingPlayer.name}
                      onChange={(e) =>
                        setEditingPlayer({
                          ...editingPlayer,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    player.name
                  )}
                </TableCell>
                <TableCell>{player.wins}</TableCell>
                <TableCell>
                  {player.skinz}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => incrementSkinz(player.id)}
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell>
                  {editingPlayer?.id === player.id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        saveEditedName(editingPlayer, editingPlayer.name)
                      }
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => editPlayerName(player)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteRow(player.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default PlayerForm
