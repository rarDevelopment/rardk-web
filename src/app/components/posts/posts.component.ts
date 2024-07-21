
import { Component, Input, OnInit } from '@angular/core';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { finalize, take } from 'rxjs';
import { DateDisplayComponent } from '../shared/date-display/date-display.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { PostsService } from './posts.service';
import { Post } from './models/post';
import { RouterLink } from '@angular/router';
import { PostType } from './models/post-type';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    HtmlDirective,
    PageTitleComponent,
    LoadingIndicatorComponent,
    DateDisplayComponent,
    RouterLink
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
      .getPosts(PostType.Post)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (postsResponse) => {
          const postsToShow = postsResponse.sort((p1, p2) =>
            p1.posted_at > p2.posted_at ? -1 : 1
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
