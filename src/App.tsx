import { useState } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { Gamesgrid } from './components/games/Gamesgrid'
import useGames from './hooks/useGames'
import { Modal } from './components/Modal'
import { Game } from './interfaces/Game.interface'
import { FabButton } from './components/FabButton'
import { Loader } from './components/Loader'
import { Toaster } from 'react-hot-toast'

function App() {
  const { games, addGame, updateGame, isLoading, deleteGame } = useGames()
  const [showModal, setShowModal] = useState(false)
  const [gameSelected, setGameSelected] = useState<Game | null>(null)

  const onEdit = (game: Game) => {
    updateGame(game)
    setShowModal(false)
    setGameSelected(null)
  }

  const onSend = (game: Game) => {
    addGame(game)
    setShowModal(false)
    setGameSelected(null)
  }

  /* TODO: 
    - ADD VALIDATION TO DELETE ITEM
    - ADD FILTERS
  */

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <main className="flex flex-col items-center justify-center lg:px-32 pb-20 pt-5">
            <div className="w-full flex justify-center items-center px-2 mt-4">
              <Gamesgrid
                games={games}
                onEdit={(game: Game) => {
                  setGameSelected(game)
                  setShowModal(true)
                }}
                onDelete={(game: Game) => {
                  deleteGame(game)
                  setShowModal(false)
                  setGameSelected(null)
                }}
              />
              {showModal && gameSelected && (
                <Modal
                  gameSelected={gameSelected}
                  onClose={() => setShowModal(false)}
                  onSend={(game: Game) => {
                    const newGame = {
                      ...game,
                      id: gameSelected.id,
                    }
                    setShowModal(false)
                    onEdit(newGame)
                  }}
                />
              )}
            </div>
          </main>
          {showModal && !gameSelected && (
            <Modal
              onSend={(game: Game) => {
                setShowModal(false)
                onSend(game)
              }}
              onClose={() => {
                setShowModal(false)
                setGameSelected(null)
              }}
            />
          )}
          <FabButton
            onClick={() => {
              setShowModal(true)
            }}
          />
        </>
      )}
      <Toaster />
    </Layout>
  )
}

export default App
