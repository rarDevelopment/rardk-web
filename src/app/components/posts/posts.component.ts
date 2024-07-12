import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { finalize, take } from 'rxjs';
import { DateDisplayComponent } from '../shared/date-display/date-display.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { PostsService } from './posts.service';
import { Post } from './models/post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    HtmlDirective,
    PageTitleComponent,
    LoadingIndicatorComponent,
    DateDisplayComponent,
    RouterLink,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  constructor(private postsService: PostsService) {}
  public posts: Post[];
  public isLoading: boolean;
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Posts';
  @Input() showPageLink = false;

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
          const postsToShow = postsResponse.sort((l1, l2) =>
            l1.posted_at > l2.posted_at ? -1 : 1
          );
          this.itemCount > 0
            ? (this.posts = postsToShow.slice(0, this.itemCount))
            : (this.posts = postsToShow);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
