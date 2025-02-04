import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { PostDisplay } from '../../models/post-display';
import { ContentPosition } from '../../models/content-positions';
import { PostType } from '../../models/post-type';

@Component({
  selector: 'app-post-content',
  imports: [ModalComponent],
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.scss',
})
export class PostContentComponent implements AfterViewChecked {
  @Input() post: PostDisplay;
  @Input() postType: PostType = PostType.Post;
  @Input() contentPosition: ContentPosition = ContentPosition.Above;
  @ViewChild('imageElement') imageElement: ElementRef;
  public imageLoaded: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewChecked() {
    if (this.imageElement && !this.imageLoaded) {
      this.renderer.listen(this.imageElement.nativeElement, 'load', () => {
        this.imageLoaded = true;
      });
    }
  }

  toggleModal(post: PostDisplay, isVisible: boolean) {
    post.isModalVisible = isVisible;
  }

  public isAbove(): boolean {
    return this.contentPosition === ContentPosition.Above;
  }

  public getImageClass(): string {
    return this.postType === PostType.Gallery ? 'post-image gallery-post-image' : 'post-image';
  }
}
