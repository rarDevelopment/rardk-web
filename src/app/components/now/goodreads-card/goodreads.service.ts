import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodreadsItem } from 'src/app/components/now/goodreads-card/models/goodreads-item';
import { settings } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class GoodreadsService {
  constructor(private http: HttpClient) {}

  getGoodreadsFinishedBooksFeed(): Observable<GoodreadsItem[]> {
    return this.http.get<GoodreadsItem[]>(`${settings.apiUrl}now/json/now-recent-books`);
  }

  getGoodreadsCurrentlyReadingBooksFeed(): Observable<GoodreadsItem[]> {
    return this.http.get<GoodreadsItem[]>(`${settings.apiUrl}now/json/now-current-books`);
  }
}
