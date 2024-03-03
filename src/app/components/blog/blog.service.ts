import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blog-post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  public getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiUrl}blog/posts`);
  }

  public getBlogPost(canonicalUrl: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(
      `${environment.apiUrl}blog/post?canonicalUrl=${canonicalUrl}`
    );
  }
}
