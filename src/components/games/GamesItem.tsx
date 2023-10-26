import { AiOutlineEdit } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { Game, GameType } from '../../interfaces/Game.interface'
import { parseDate } from '../../utils/parseDate'

interface Props {
  game: Game
  onEdit: (game: Game) => void
  onDelete: (game: Game) => void
}

export const GamesItem = ({ game, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full h-auto flex flex-col max-w-[21.875rem] items-start justify-start p-2 border-2 bg-whiteCustom border-blueCustom mx-auto rounded-md relative">
      <div className="flex justify-start items-start">
        <div
          className={`image w-14 h-14 flex justify-center items-center rounded-lg 
      ${
        game.gameType === GameType.REGULAR_SEASON
          ? 'bg-cyan-700'
          : 'bg-orangeCustom'
      }
      `}
        >
          <span
            className={`text-4xl font-bold ${
              game.gameType === GameType.REGULAR_SEASON
                ? 'text-white'
                : 'text-black'
            }`}
          >
            {game.gameType === GameType.REGULAR_SEASON ? 'R' : 'P'}
          </span>
        </div>
        <div className="text flex flex-col items-start justify-start ml-2 w-full">
          <h3 className="text-blueDarkCustom text-sm">{game.name}</h3>
          <div className="flex justify-start items-center ">
            <span className="text-blueCustom text-opacity-70 text-xs">
              Home:
            </span>
            <span className="text-blueCustom text-base line-clamp-1 font-bold">
              {game.home}
            </span>
          </div>
          <div className="flex justify-start items-center ">
            <span className="text-blueCustom text-opacity-70 text-xs">
              Away:
            </span>
            <span className="text-blueCustom text-base line-clamp-1 font-bold">
              {game.away}
            </span>
          </div>
          <div className="flex justify-start w-full mt-2 gap-2">
            <span
              className={`px-2 rounded-md  text-xs text-center flex items-center justify-center font-bold
            ${
              game.gameType === GameType.REGULAR_SEASON
                ? 'bg-cyan-700 font-bold text-white'
                : 'bg-orangeCustom text-black'
            }
            `}
            >
              {game.gameType}
            </span>
            <span className="bg-gray-500 text-white px-2 rounded-md">
              {parseDate(game.date)}
            </span>
          </div>
          <button
            className="w-10 h-10 p-2 flex justify-center items-center mt-2 bg-blueCustom absolute top-0 right-1 rounded-full text-xl text-white cursor-pointer"
            onClick={() => onEdit(game)}
          >
            <AiOutlineEdit />
          </button>
        </div>
      </div>
      <button
        className="w-full mt-2 text-center bg-red-600 py-2 rounded-lg font-bold text-white flex items-center justify-center text-sm"
        type="button"
        onClick={() => onDelete(game)}
      >
        <span className="text-lg mr-1">
          <FiTrash2 />
        </span>
        Delete
      </button>
    </div>
  )
}
