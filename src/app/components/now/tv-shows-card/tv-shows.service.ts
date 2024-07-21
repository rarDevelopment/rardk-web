import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TvShow } from 'src/app/components/now/tv-shows-card/models/tv-show';
import { environment } from 'src/environments/environment';
import { TvShowReview } from './models/tv-show-review';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  constructor(private http: HttpClient) {}

  getLatestEpisodes(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${environment.apiUrl}now/json/now-current-tv`);
  }
  getLatestReviews(): Observable<TvShowReview[]> {
    return this.http.get<TvShowReview[]>(`${environment.apiUrl}now/json/now-tv-reviews`);
  }
}
