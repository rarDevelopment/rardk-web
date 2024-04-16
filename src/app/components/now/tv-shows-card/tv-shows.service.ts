import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TvShow } from 'src/app/models/tv-show';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  constructor(private http: HttpClient) {}

  getLatestEpisodes(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${environment.apiUrl}now/json/now-current-tv`);
  }
}
