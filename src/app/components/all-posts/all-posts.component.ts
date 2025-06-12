import { Component, Input } from '@angular/core';
import { PostType } from '../posts/models/post-type';
import { ContentPosition } from '../posts/models/content-positions';
import { PostFeedComponent } from '../shared/post-feed/post-feed.component';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
  selector: 'app-all-posts',
  imports: [PageTitleComponent, PostFeedComponent],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss',
})
export class AllPostsComponent {
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Posts';
  @Input() showPageLink = false;
  @Input() showPaginator = true;
  public postType = PostType.All;
  public contentPosition = ContentPosition.Above;
}
