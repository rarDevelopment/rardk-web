import { Component, Input, OnInit } from '@angular/core';
import { PixelfedPost } from 'src/app/components/gallery/models/pixelfed-post';
import { PixelfedService } from './gallery.service';
import { finalize, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { DateDisplayComponent } from '../shared/date-display/date-display.component';
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';
import { ModalImage, ModalImageItem } from 'src/app/components/shared/modal/models/modal-image';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    DateDisplayComponent,
    PageTitleComponent,
    ModalComponent,
    LoadingIndicatorComponent,
    RouterLink,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  public pixelfedPosts: ModalImage[];
  public isLoading: boolean;
  public modalVisibilities: boolean[];
  public pixelfedUrl = environment.pixelfedUrl;
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Gallery';
  @Input() showPageLink = false;

  public imgIndex = 0;

  constructor(private pixelfedService: PixelfedService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populatePixelfedPosts();
  }

  populatePixelfedPosts() {
    this.pixelfedService
      .getPixelfedPosts()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (posts: PixelfedPost[]) => {
          const modalImages = posts.map((post) => {
            return {
              content: post.content,
              date: post.created_at,
              url: post.url,
              sourceSiteName: 'PixelFed',
              images: post.media_attachments.map((media) => {
                return { url: media.url, description: media.description } as ModalImageItem;
              }),
            } as ModalImage;
          });
          this.itemCount > 0
            ? (this.pixelfedPosts = modalImages.slice(0, this.itemCount))
            : (this.pixelfedPosts = modalImages);
          this.modalVisibilities = modalImages.map((_) => false);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  toggleModal(index: number, isVisible: boolean) {
    this.modalVisibilities[index] = isVisible;
  }
}
