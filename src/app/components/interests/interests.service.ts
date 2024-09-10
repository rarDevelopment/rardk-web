import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavouriteGame } from './models/favourite-game';

@Injectable({
  providedIn: 'root',
})
export class InterestsService {
  constructor(private http: HttpClient) {}

  getVideoGameHallOfFame(): Observable<FavouriteGame[]> {
    return this.http.get<FavouriteGame[]>(`${environment.feedsSiteUrl}rss/favourite-games/json/`);
  }
}
