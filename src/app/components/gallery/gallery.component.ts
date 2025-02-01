import { Component, Input, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';

import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { RouterLink } from '@angular/router';
import { ModalImage, ModalImageItem } from 'src/app/components/shared/modal/models/modal-image';
import { PostsService } from '../posts/posts.service';
import { PostType } from '../posts/models/post-type';
import { Post } from '../posts/models/post';

@Component({
  selector: 'app-gallery',
  imports: [PageTitleComponent, ModalComponent, LoadingIndicatorComponent, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  public galleryPosts: ModalImage[];
  public allGalleryPosts: ModalImage[];
  public isLoading: boolean;
  public modalVisibilities: boolean[];
  @Input() itemCount: number = 10;
  @Input() pageTitle = 'Gallery';
  @Input() showPageLink = false;

  public imgIndex = 0;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateGallery();
  }

  populateGallery() {
    this.postsService
      .getPosts(PostType.Gallery)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (posts: Post[]) => {
          const modalImages = posts.map((post) => {
            return {
              content: post.content,
              date: post.posted_at,
              url: '/gallery/' + post.time_stamp,
              images: post.images.map((media) => {
                return { url: media.image_url, description: media.alt_text } as ModalImageItem;
              }),
            } as ModalImage;
          });
          this.allGalleryPosts = modalImages;
          this.updateLimitedGalleryImages();
          this.modalVisibilities = modalImages.map((_) => false);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  updateLimitedGalleryImages() {
    this.itemCount > 0
      ? (this.galleryPosts = this.allGalleryPosts.slice(0, this.itemCount))
      : (this.galleryPosts = this.allGalleryPosts);
  }

  toggleModal(index: number, isVisible: boolean) {
    this.modalVisibilities[index] = isVisible;
  }

  showMoreImages() {
    this.itemCount += 10;
    this.updateLimitedGalleryImages();
  }
}
