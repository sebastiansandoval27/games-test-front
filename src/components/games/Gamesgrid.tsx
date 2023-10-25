import { Game } from '../../interfaces/Game.interface'
import { GamesItem } from './GamesItem'

interface Props {
  games: Game[]
  onEdit: (game: Game) => void
  onDelete: (game: Game) => void
}

export const Gamesgrid = ({ games, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full  grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-5 mx-auto pb-10">
      {games.map(game => (
        <GamesItem
          key={game.id}
          game={game}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
