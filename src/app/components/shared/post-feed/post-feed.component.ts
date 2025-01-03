import { Component, Input, OnInit } from '@angular/core';
import { PostDisplay } from '../../posts/models/post-display';
import { Post } from '../../posts/models/post';
import { PostsService } from '../../posts/posts.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostType } from '../../posts/models/post-type';
import { finalize, take } from 'rxjs';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { DateDisplayComponent } from '../date-display/date-display.component';
import { ModalComponent } from '../modal/modal.component';
import { PageNumbersComponent } from '../page-numbers/page-numbers.component';

@Component({
    selector: 'app-post-feed',
    imports: [
        LoadingIndicatorComponent,
        DateDisplayComponent,
        RouterLink,
        ModalComponent,
        PageNumbersComponent,
        LoadingIndicatorComponent,
    ],
    templateUrl: './post-feed.component.html',
    styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public posts: PostDisplay[];
  public allPosts: Post[];
  @Input() isLoading: boolean;
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Posts';
  @Input() showPageLink = false;
  @Input() showPaginator = true;
  @Input() postType: PostType;
  public pageQueryParam = 1;
  public currentPage = 1;
  public itemsPerPage = 10;
  public numberOfPages = 1;
  public pageNumbers: number[] = [];

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.pageQueryParam = +params['page'];
      this.populatePosts();
    });
  }

  public populatePosts() {
    this.isLoading = true;
    this.postsService
      .getPosts(this.postType)
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

          let paginatedPosts = [];

          if (this.showPaginator) {
            this.numberOfPages = Math.ceil(this.allPosts.length / this.itemsPerPage);
            this.currentPage =
              this.pageQueryParam && this.pageQueryParam <= this.numberOfPages
                ? this.pageQueryParam
                : 1;
            this.pageNumbers = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
            paginatedPosts = this.allPosts.slice(0, this.itemsPerPage);
          } else {
            paginatedPosts = this.allPosts;
          }

          this.posts = paginatedPosts.map((p) => new PostDisplay(p, this.getPageForLink()));
          this.setPostsForCurrentPage();
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

  public scrollToTop() {
    window.scrollTo(0, 0);
  }

  public setPostsForCurrentPage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.posts = this.allPosts
      .slice(start, start + this.itemsPerPage)
      .map((p) => new PostDisplay(p, this.getPageForLink()));
  }

  public goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.router.navigate([this.getPageForLink()], { queryParams: { page: pageNumber } });
    this.scrollToTop();
  }

  toggleModal(post: PostDisplay, isVisible: boolean) {
    post.isModalVisible = isVisible;
  }

  public isBlog(): boolean {
    return this.postType === PostType.Blog;
  }

  public getPageForLink(): string {
    switch (this.postType) {
      case PostType.Blog:
        return 'blog';
      case PostType.Post:
        return 'posts';
      case PostType.Link:
        return 'links';
    }
  }

  public getPostIdentifier(post: PostDisplay): string {
    switch (this.postType) {
      case PostType.Blog:
        return post.canonical_url;
      case PostType.Post:
      case PostType.Link:
        return post.time_stamp;
    }
  }

  public getSeeMoreName(): string {
    switch (this.postType) {
      case PostType.Blog:
        return 'Blog Posts';
      case PostType.Post:
        return 'Posts';
      case PostType.Link:
        return 'Links';
    }
  }
}
