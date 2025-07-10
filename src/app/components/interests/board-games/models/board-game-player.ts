export interface BoardGamePlayer {
  username: string;
  userId: string;
  name: string;
  startPosition: string;
  color: string;
  score: number | undefined;
  new: boolean;
  rating: number;
  win: boolean;
}
