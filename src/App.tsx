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
import { ModalConfirm } from './components/ModalConfirm'
import { FiltersBar } from './components/FiltersBar'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'

function App() {
  const {
    games,
    addGame,
    updateGame,
    isLoading,
    deleteGame,
    getGamesByProperty,
    getGames,
  } = useGames()
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showFiltersModal, setShowFiltersModal] = useState(false)
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

  const onDelete = () => {
    if (gameSelected) {
      deleteGame(gameSelected)
      setShowConfirmModal(false)
      setGameSelected(null)
    }
  }

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <main className="flex flex-col items-center justify-center lg:px-32 pb-20 pt-5 min-w-[20.5rem]">
            <div className="w-full flex justify-center items-center px-2 mt-4">
              {games.length > 0 ? (
                <Gamesgrid
                  games={games}
                  onEdit={(game: Game) => {
                    setGameSelected(game)
                    setShowModal(true)
                  }}
                  onDelete={(game: Game) => {
                    setGameSelected(game)
                    setShowConfirmModal(true)
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl text-center">No games found</p>
                  <button
                    className="w-full mt-2 text-center bg-gray-500 py-2 rounded-lg font-bold text-white"
                    type="button"
                    onClick={getGames}
                  >
                    Get all
                  </button>
                </div>
              )}
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
                setGameSelected(null)
              }}
              onClose={() => {
                setShowModal(false)
                setGameSelected(null)
              }}
            />
          )}

          <FabButton
            buttons={[
              {
                icon: <BiFilterAlt />,
                onClick: () => {
                  setShowFiltersModal(true)
                },
                bgColor: 'bg-sky-500',
              },
              {
                icon: <AiFillPlusCircle />,
                onClick: () => {
                  setGameSelected(null)
                  setShowModal(true)
                },
              },
            ]}
          />
        </>
      )}
      {showConfirmModal && (
        <ModalConfirm
          onConfirm={onDelete}
          title={`Are you sure you want to delete this game?`}
          message={`${gameSelected?.name}`}
          onCancel={() => {
            setShowConfirmModal(false)
            setGameSelected(null)
          }}
        />
      )}
      {showFiltersModal && (
        <FiltersBar
          onClose={() => setShowFiltersModal(false)}
          onFilter={getGamesByProperty}
          getAll={() => {
            getGames()
            setShowFiltersModal(false)
          }}
        />
      )}
      <Toaster />
    </Layout>
  )
}

export default App
