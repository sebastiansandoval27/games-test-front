import { useEffect, useState } from 'react'
import { GamesAPI } from '../api/GamesAPI'
import { Game, Games } from '../interfaces/Game.interface'
import { parseISO } from 'date-fns'
import { toast } from 'react-hot-toast'
import { DateTime } from 'luxon'

interface ReturnProps {
  games: Game[]
  getGames: () => void
  addGame: (game: Game) => void
  updateGame: (game: Game) => void
  deleteGame: (game: Game) => void
  isLoading: boolean
  getGamesByProperty: (
    property: string,
    value: string | Date | DateTime
  ) => void
}

const useGames = (): ReturnProps => {
  const [games, setGames] = useState<Game[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const parseDate = (games: Game[]) => {
    return games?.map(game => {
      return {
        ...game,
        date: parseISO(game.date.toString()),
      }
    })
  }

  const showError = (message: string) => {
    toast.error(message)
  }

  const showSuccess = (message: string) => {
    toast.success(message)
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

  const getGamesByProperty = async (
    property: string,
    value: string | Date | DateTime
  ) => {
    try {
      const url =
        property === 'gameType'
          ? `/games/filter/gametype/${value}`
          : `/games/filter/${property}?value=${value}`
      const gamesResponse = await GamesAPI.get<Games>(url)
      if (gamesResponse.status === 200) {
        setGames(parseDate(gamesResponse.data?.games) || [])
      } else {
        showError('Error loading games')
      }
    } catch (error) {
      console.log(error)
      showError('Error loading games')
    }
  }

  const addGame = async (game: Game) => {
    try {
      setIsLoading(true)
      const gameResponse = await GamesAPI.post<Game>('/games', game)
      if (gameResponse.status === 201 || gameResponse.status === 200) {
        getGames()
        showSuccess('Game added successfully')
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
        showSuccess('Game updated successfully')
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
        showSuccess('Game deleted successfully')
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
    getGamesByProperty,
    getGames,
  }
}

export default useGames
