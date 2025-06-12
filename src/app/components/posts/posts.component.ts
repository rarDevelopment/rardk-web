import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { PostType } from './models/post-type';
import { ContentPosition } from './models/content-positions';
import { PostFeedComponent } from '../shared/post-feed/post-feed.component';

@Component({
  selector: 'app-posts',
  imports: [PageTitleComponent, PostFeedComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Posts';
  @Input() showPageLink = false;
  @Input() showPaginator = true;
  public postType = PostType.Post;
  public contentPosition = ContentPosition.Above;
}
