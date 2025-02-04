import { Component } from '@angular/core';
import { PostType } from '../../posts/models/post-type';
import { PostComponent } from '../../posts/post/post.component';
import { ContentPosition } from '../../posts/models/content-positions';

@Component({
    selector: 'app-link-post',
    imports: [PostComponent],
    templateUrl: './link-post.component.html',
    styleUrl: './link-post.component.scss'
})
export class LinkPostComponent {
  public postType: PostType = PostType.Link;
  public contentPosition: ContentPosition = ContentPosition.Below;
}
