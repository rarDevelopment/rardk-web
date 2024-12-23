import { Component } from '@angular/core';
import { PostType } from '../../posts/models/post-type';
import { PostComponent } from '../../posts/post/post.component';

@Component({
    selector: 'app-link-post',
    imports: [PostComponent],
    templateUrl: './link-post.component.html',
    styleUrl: './link-post.component.scss'
})
export class LinkPostComponent {
  public postType: PostType = PostType.Link;
  constructor() {}
}
