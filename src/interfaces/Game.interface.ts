export interface Games {
  games: Game[]
}

export interface Game {
  id: number
  name: string
  date: Date
  city: string
  home: string
  away: string
  gameType: GameType
  createdAt: string
  updatedAt: string
}

export enum GameType {
  REGULAR_SEASON = 'REGULAR_SEASON',
  PLAYOFF = 'PLAYOFF',
}
