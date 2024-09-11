import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCollectionEntry } from 'src/app/components/interests/video-games/models/game-collection-entry';
import { environment } from 'src/environments/environment';
import { FavouriteGame } from './models/favourite-game';

@Injectable({
  providedIn: 'root',
})
export class VideoGamesService {
  constructor(private http: HttpClient) {}

  public getGameCollection(): Observable<GameCollectionEntry[]> {
    return this.http.get<GameCollectionEntry[]>(`${environment.apiUrl}now/games/collection`);
  }

  getFavouriteGames(): Observable<FavouriteGame[]> {
    return this.http.get<FavouriteGame[]>(`${environment.feedsSiteUrl}rss/favourite-games/json/`);
  }
}
