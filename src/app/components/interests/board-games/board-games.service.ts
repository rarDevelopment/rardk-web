import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardGame } from 'src/app/components/interests/board-games/models/board-game';
import { settings } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class BoardGamesService {
  constructor(private http: HttpClient) {}

  public getWishlistGames(): Observable<BoardGame[]> {
    return this.http.get<BoardGame[]>(
      `${settings.apiUrl}now/json/collections-board-games-wishlist`
    );
  }

  public getOwnedGames(): Observable<BoardGame[]> {
    return this.http.get<BoardGame[]>(
      `${settings.apiUrl}now/json/collections-board-games-owned`
    );
  }
}
