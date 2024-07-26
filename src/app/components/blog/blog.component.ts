import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

import { DateDisplayComponent } from '../shared/date-display/date-display.component';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { finalize, take } from 'rxjs';
import { PostsService } from '../posts/posts.service';
import { PostType } from '../posts/models/post-type';
import { Post } from '../posts/models/post';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    PageTitleComponent,
    LoadingIndicatorComponent,
    DateDisplayComponent,
    HtmlDirective,
    RouterLink,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  public isLoading: boolean;
  public blogPosts: Post[];
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Blog';
  @Input() showPageLink = false;

  constructor(private blogService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.blogService
      .getPosts(PostType.Blog)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (blogPostsResponse: Post[]) => {
          let blogPostsToShow = blogPostsResponse.sort((p1, p2) =>
            p1.posted_at > p2.posted_at ? -1 : 1
          );

          this.itemCount > 0
            ? (this.blogPosts = blogPostsToShow.slice(0, this.itemCount))
            : (this.blogPosts = blogPostsToShow);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
