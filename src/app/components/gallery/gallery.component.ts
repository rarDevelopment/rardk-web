import { Component, Input, OnInit } from '@angular/core';
import { PixelfedPost } from 'src/app/models/pixelfed/pixelfed-post';
import { PixelfedService } from './gallery.service';
import { take } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { DateDisplayComponent } from '../shared/date-display/date-display.component';
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
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
  public pixelfedPosts: PixelfedPost[];
  public isLoading: boolean;
  public modalVisibilities: boolean[];
  public pixelfedUrl = environment.pixelfedUrl;
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Gallery';
  @Input() showPageLink = false;

  constructor(private pixelfedService: PixelfedService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populatePixelfedPosts();
  }

  populatePixelfedPosts() {
    this.pixelfedService
      .getPixelfedPosts()
      .pipe(take(1))
      .subscribe({
        next: (posts: PixelfedPost[]) => {
          this.itemCount > 0
            ? (this.pixelfedPosts = posts.slice(0, this.itemCount))
            : (this.pixelfedPosts = posts);
          this.modalVisibilities = posts.map((_) => false);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }

  toggleModal(index: number, isVisible: boolean) {
    this.modalVisibilities[index] = isVisible;
  }
}
