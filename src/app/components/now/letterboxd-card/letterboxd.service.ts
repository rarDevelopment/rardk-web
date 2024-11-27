import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LetterboxdItem } from 'src/app/components/now/letterboxd-card/models/letterboxd-item';
import { settings } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class LetterboxdService {
  constructor(private http: HttpClient) {}

  getLetterboxdFeed(): Observable<LetterboxdItem[]> {
    return this.http.get<LetterboxdItem[]>(`${settings.apiUrl}now/json/now-recent-movies`);
  }
}
