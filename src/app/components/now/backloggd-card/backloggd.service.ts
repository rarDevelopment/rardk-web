import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackloggdItem } from 'src/app/components/now/backloggd-card/models/backloggd-item';
import { settings } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class BackloggdService {
  constructor(private http: HttpClient) {}

  getBackloggdFeed(): Observable<BackloggdItem[]> {
    return this.http.get<BackloggdItem[]>(`${settings.apiUrl}now/json/now-recent-games`);
  }

  getBackloggdCurrentGames(): Observable<BackloggdItem[]> {
    return this.http.get<BackloggdItem[]>(`${settings.apiUrl}now/json/now-current-games`);
  }
}
