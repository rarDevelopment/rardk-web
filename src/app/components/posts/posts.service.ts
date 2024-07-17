import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from './models/post';
import { environment } from 'src/environments/environment';
import { PostType } from './models/post-type';
import { PostTypeFilter } from './models/post-type-filter';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url: string = `${environment.feedsSiteUrl}rss/posts/json/`;
  private postTypeFilters: { [key: string]: PostTypeFilter } = {
    [PostType.Link]: {
      filter: (p: Post) => p.url?.trim().length > 0,
      hashtagPrefix: '#rardklink',
    },
    [PostType.Post]: {
      filter: (p: Post) => !p.url || p.url?.trim().length === 0,
      hashtagPrefix: '#rardkpost',
    },
  };

  constructor(private http: HttpClient) {}

  public getPosts(postType: PostType): Observable<Post[]> {
    const postTypeFilter = this.postTypeFilters[postType].filter;
    const hashtagPrefix = this.postTypeFilters[postType].hashtagPrefix;
    return this.http.get<Post[]>(this.url).pipe(
      map((posts: Post[]) =>
        posts.filter(postTypeFilter).map((p) => ({
          ...p,
          content: p.content.replace(`${hashtagPrefix}${p.time_stamp}`, ''),
        }))
      )
    );
  }
}
