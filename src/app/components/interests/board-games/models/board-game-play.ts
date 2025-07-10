import { BoardGamePlayer } from './board-game-player';

export interface BoardGamePlay {
  id: string;
  date: string;
  quantity: number;
  length: number;
  incomplete: boolean;
  noWinStats: boolean;
  location: string;
  gameName: string;
  gameObjectType: string;
  gameObjectId: string;
  subtypes: string[];
  players: BoardGamePlayer[];
  comments: string;
  gameUrl: string;
}
