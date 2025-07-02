export interface BoardGamePlayer {
  username: string;
  userId: string;
  name: string;
  startPosition: string;
  color: string;
  score: string;
  new: boolean;
  rating: number;
  win: boolean;
}
