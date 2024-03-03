import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCollectionEntry } from 'src/app/models/game-collection-entry';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameCollectionService {
  constructor(private http: HttpClient) {}

  public getGameCollection(): Observable<GameCollectionEntry[]> {
    return this.http.get<GameCollectionEntry[]>(
      `${environment.apiUrl}now/games/collection`
    );
  }
}
