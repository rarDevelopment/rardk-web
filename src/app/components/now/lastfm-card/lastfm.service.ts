import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LastfmAlbum } from './models/lastfm-album';
import { LastfmArtist } from './models/lastfm-artist';

@Injectable({
  providedIn: 'root',
})
export class LastfmService {
  constructor(private http: HttpClient) {}

  getTopAlbums(): Observable<LastfmAlbum[]> {
    return this.http.get<LastfmAlbum[]>(`${environment.apiUrl}now/json/now-top-albums`);
  }

  getTopArtists(): Observable<LastfmArtist[]> {
    return this.http.get<LastfmArtist[]>(`${environment.apiUrl}now/json/now-top-artists`);
  }
}
