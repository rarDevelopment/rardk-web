import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PixelfedPost } from 'src/app/components/gallery/models/pixelfed-post';
import { settings } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class PixelfedService {
  constructor(private http: HttpClient) {}

  getPixelfedPosts(): any {
    return this.http.get<PixelfedPost[]>(`${settings.apiUrl}now/json/pixelfed`);
  }
}
