import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url: string = `${environment.feedsSiteUrl}rss/posts/json/`;

  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }
}
