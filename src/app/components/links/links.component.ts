import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { PostType } from '../posts/models/post-type';
import { PostFeedComponent } from '../shared/post-feed/post-feed.component';
import { ContentPosition } from '../posts/models/content-positions';

@Component({
  selector: 'app-links',
  imports: [PageTitleComponent, PostFeedComponent],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent {
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Links';
  @Input() showPageLink = false;
  @Input() showPaginator = true;
  public postType = PostType.Link;
  public contentPosition = ContentPosition.Below;
}
