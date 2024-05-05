import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiscussionPostsResponse } from '../components/shared/social-media-discussion/models/discussion-posts-response';

@Injectable({
  providedIn: 'root',
})
export class DiscussionPostsService {
  private discussionBlogPostsUrl: string = `${environment.apiUrl}now/json/discussion-blog-posts`;
  private discussionLinksPostsUrl: string = `${environment.apiUrl}now/json/discussion-links`;

  constructor(private http: HttpClient) {}

  public getDiscussionPostsForBlog(): Observable<DiscussionPostsResponse> {
    return this.http.get<DiscussionPostsResponse>(this.discussionBlogPostsUrl);
  }

  public getDiscussionPostsForLinks(): Observable<DiscussionPostsResponse> {
    return this.http.get<DiscussionPostsResponse>(this.discussionLinksPostsUrl);
  }
}
