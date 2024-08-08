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
    RouterLink,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  constructor(private postsService: PostsService) {}
  public posts: Post[];
  public allPosts: Post[];
  public isLoading: boolean;
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Posts';
  @Input() showPageLink = false;
  @Input() showPaginator = true;
  public currentPage = 1;
  public itemsPerPage = 5;
  public numberOfPages = 1;

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
            ? (this.allPosts = postsToShow.slice(0, this.itemCount))
            : (this.allPosts = postsToShow);

          if (this.showPaginator) {
            this.numberOfPages = Math.ceil(this.allPosts.length / this.itemsPerPage);
            this.posts = this.allPosts.slice(0, this.itemsPerPage);
          } else {
            this.posts = this.allPosts;
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  public previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  public setPostsForCurrentPage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.posts = this.allPosts.slice(start, start + this.itemsPerPage);
  }

  public goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.setPostsForCurrentPage();
  }
}
