import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { finalize, take } from 'rxjs';
import { DateDisplayComponent } from '../shared/date-display/date-display.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { PostsService } from './posts.service';
import { Post } from './models/post';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    NgFor,
    HtmlDirective,
    PageTitleComponent,
    NgIf,
    LoadingIndicatorComponent,
    DateDisplayComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  constructor(private postsService: PostsService) {}
  public posts: Post[];
  public isLoading: boolean;

  async ngOnInit() {
    this.populatePosts();
  }

  public populatePosts() {
    this.isLoading = true;
    this.postsService
      .getPosts()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (postsResponse) => {
          this.posts = postsResponse.sort((l1, l2) => (l1.posted_at > l2.posted_at ? -1 : 1));
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
