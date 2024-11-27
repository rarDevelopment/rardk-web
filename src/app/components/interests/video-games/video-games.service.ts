import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameCollectionEntry } from 'src/app/components/interests/video-games/models/game-collection-entry';
import { settings } from 'src/settings';
import { FavouriteGame } from './models/favourite-game';
import { HtmlDecoder } from 'src/app/utilities/html-decoder';

@Injectable({
  providedIn: 'root',
})
export class VideoGamesService {
  constructor(private http: HttpClient, private htmlDecoder: HtmlDecoder) {}

  public getGameCollection(): Observable<GameCollectionEntry[]> {
    return this.http.get<GameCollectionEntry[]>(`${settings.apiUrl}now/games/collection`);
  }

  getFavouriteGames(): Observable<FavouriteGame[]> {
    return this.http
      .get<FavouriteGame[]>(`${settings.feedsSiteUrl}rss/favourite-games/json/`)
      .pipe(
        map((games: FavouriteGame[]) =>
          games.map((g) => ({
            ...g,
            gameName: this.htmlDecoder.htmlEntityDecode(g.gameName),
            imageId: this.htmlDecoder.htmlEntityDecode(g.imageId),
          }))
        )
      );
  }
}
