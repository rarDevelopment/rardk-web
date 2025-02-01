import { Component } from '@angular/core';
import { PostComponent } from '../../posts/post/post.component';
import { PostType } from '../../posts/models/post-type';
import { ContentPosition } from '../../posts/models/content-positions';

@Component({
  selector: 'app-gallery-post',
  imports: [PostComponent],
  templateUrl: './gallery-post.component.html',
  styleUrl: './gallery-post.component.scss',
})
export class GalleryPostComponent {
  public postType: PostType = PostType.Gallery;
  public contentPosition: ContentPosition = ContentPosition.Below;
}
