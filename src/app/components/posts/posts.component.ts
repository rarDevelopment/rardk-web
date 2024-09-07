import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { PostType } from './models/post-type';
import { PostFeedComponent } from '../shared/post-feed/post-feed.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [LoadingIndicatorComponent, PageTitleComponent, PostFeedComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Posts';
  @Input() showPageLink = false;
  @Input() showPaginator = true;
  public postType = PostType.Post;
}
