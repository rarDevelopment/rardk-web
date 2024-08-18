import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from './models/post';
import { environment } from 'src/environments/environment';
import { PostType } from './models/post-type';
import { PostTypeFilter } from './models/post-type-filter';
import { HtmlDecoder } from 'src/app/utilities/html-decoder';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url: string = `${environment.feedsSiteUrl}rss/posts/json/`;
  private postTypeFilters: { [key: string]: PostTypeFilter } = {
    [PostType.Link]: {
      filter: (p: Post) => p.post_type === PostType.Link,
      hashtagPrefix: '#rardklink',
    },
    [PostType.Post]: {
      filter: (p: Post) => p.post_type === PostType.Post,
      hashtagPrefix: '#rardkpost',
    },
    [PostType.Blog]: {
      filter: (p: Post) => p.post_type === PostType.Blog,
      hashtagPrefix: '#rardkblogpost',
    },
  };

  constructor(private http: HttpClient, private htmlDecoder: HtmlDecoder) {}

  public getPosts(postType: PostType): Observable<Post[]> {
    const postTypeFilter = this.postTypeFilters[postType].filter;
    return this.http.get<Post[]>(this.url).pipe(
      map((posts: Post[]) =>
        posts.filter(postTypeFilter).map((p) => ({
          ...p,
          content: this.htmlDecoder.htmlEntityDecode(p.content),
        }))
      )
    );
  }
}
