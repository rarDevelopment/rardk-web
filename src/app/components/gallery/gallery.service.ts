import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PixelfedPost } from 'src/app/models/pixelfed/pixelfed-post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PixelfedService {
  constructor(private http: HttpClient) {}

  getPixelfedPosts(): any {
    return this.http.get<PixelfedPost[]>(`${environment.apiUrl}now/json/pixelfed`);
  }
}
