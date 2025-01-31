import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from 'src/settings';
import { DiscussionPostsResponse } from '../components/shared/social-media-discussion/models/discussion-posts-response';

@Injectable({
  providedIn: 'root',
})
export class DiscussionPostsService {
  private discussionBlogPostsUrl: string = `${settings.apiUrl}now/json/discussion-blog-posts`;
  private discussionLinksPostsUrl: string = `${settings.apiUrl}now/json/discussion-links`;
  private discussionPostsUrl: string = `${settings.apiUrl}now/json/discussion-posts`;

  constructor(private http: HttpClient) {}

  public getDiscussionPostsForBlog(): Observable<DiscussionPostsResponse> {
    return this.http.get<DiscussionPostsResponse>(this.discussionBlogPostsUrl);
  }

  public getDiscussionPostsForLinks(): Observable<DiscussionPostsResponse> {
    return this.http.get<DiscussionPostsResponse>(this.discussionLinksPostsUrl);
  }

  public getDiscussionPostsForPosts(): Observable<DiscussionPostsResponse> {
    return this.http.get<DiscussionPostsResponse>(this.discussionPostsUrl);
  }

  public getDiscussionPostsForGallery(): Observable<DiscussionPostsResponse> {
    return this.http.get<DiscussionPostsResponse>(this.discussionPostsUrl);
  }
}
