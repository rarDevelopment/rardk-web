import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

import { PostType } from '../posts/models/post-type';
import { PostFeedComponent } from '../shared/post-feed/post-feed.component';

@Component({
    selector: 'app-blog',
    imports: [PageTitleComponent, PostFeedComponent],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent {
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Blog';
  @Input() showPageLink = false;
  @Input() showPaginator = true;
  public postType = PostType.Blog;

  constructor() {}
}
