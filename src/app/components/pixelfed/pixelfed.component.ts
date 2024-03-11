import { Component, OnInit } from '@angular/core';
import { PixelfedPost } from 'src/app/models/pixelfed/pixelfed-post';
import { PixelfedService } from './pixelfed.service';
import { take } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { DateDisplayComponent } from '../shared/date-display/date-display.component';

@Component({
  selector: 'app-pixelfed',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DateDisplayComponent,
    PageTitleComponent,
    ModalComponent,
    LoadingIndicatorComponent,
  ],
  templateUrl: './pixelfed.component.html',
  styleUrl: './pixelfed.component.scss',
})
export class PixelfedComponent implements OnInit {
  public pixelfedPosts: PixelfedPost[];
  public isLoading: boolean;
  public modalVisibilities: boolean[];

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
          this.pixelfedPosts = posts;
          this.modalVisibilities = posts.map((p) => false);
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
