import { useEffect, useState } from 'react'
import { GamesAPI } from '../api/GamesAPI'
import { Game, Games } from '../interfaces/Game.interface'
import { parseISO } from 'date-fns'
import { toast } from 'react-hot-toast'

interface ReturnProps {
  games: Game[]
  addGame: (game: Game) => void
  updateGame: (game: Game) => void
  deleteGame: (game: Game) => void
  isLoading: boolean
}

const useGames = (): ReturnProps => {
  const [games, setGames] = useState<Game[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const parseDate = (games: Game[]) => {
    return games.map(game => {
      return {
        ...game,
        date: parseISO(game.date.toString()),
      }
    })
  }

  const showError = (message: string) => {
    toast.error(message)
  }

  const getGames = async () => {
    try {
      const gamesResponse = await GamesAPI.get<Games>('/games')
      if (gamesResponse.status === 200) {
        setGames(parseDate(gamesResponse.data?.games) || [])
      } else {
        showError('Error loading games')
      }
    } catch (error) {
      console.log(error)
      showError('Error loading games')
    } finally {
      setIsLoading(false)
    }
  }

  const addGame = async (game: Game) => {
    try {
      setIsLoading(true)
      const gameResponse = await GamesAPI.post<Game>('/games', game)
      if (gameResponse.status === 201) {
        getGames()
      } else {
        showError('Error adding game')
      }
    } catch (error) {
      console.log(error)
      showError('Error adding game')
    } finally {
      setIsLoading(false)
    }
  }

  const updateGame = async (game: Game) => {
    try {
      setIsLoading(true)
      const gameResponse = await GamesAPI.put<Game>(`/games/${game.id}`, game)
      if (gameResponse.status === 200) {
        getGames()
      } else {
        showError('Error updating game')
      }
    } catch (error) {
      console.log(error)
      showError('Error updating game')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteGame = async (game: Game) => {
    try {
      setIsLoading(true)
      const gameResponse = await GamesAPI.delete<Game>(`/games/${game.id}`)
      if (gameResponse.status === 200) {
        getGames()
      } else {
        showError('Error deleting game')
      }
    } catch (error) {
      console.log(error)
      showError('Error deleting game')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGames()
  }, [])

  return {
    games,
    addGame,
    updateGame,
    deleteGame,
    isLoading,
  }
}

export default useGames
