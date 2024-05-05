import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackloggdItem } from 'src/app/components/now/backloggd-card/models/backloggd-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackloggdService {
  constructor(private http: HttpClient) {}

  getBackloggdFeed(): Observable<BackloggdItem[]> {
    return this.http.get<BackloggdItem[]>(`${environment.apiUrl}now/json/now-recent-games`);
  }

  getBackloggdCurrentGames(): Observable<BackloggdItem[]> {
    return this.http.get<BackloggdItem[]>(`${environment.apiUrl}now/json/now-current-games`);
  }
}
