import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { PostDisplay } from '../../posts/models/post-display';
import { Post } from '../../posts/models/post';
import { PostsService } from '../../posts/posts.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostType } from '../../posts/models/post-type';
import { finalize, take } from 'rxjs';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { DateDisplayComponent } from '../date-display/date-display.component';
import { PaginatorComponent } from '../paginator/paginator.component';

import { ContentPosition } from '../../posts/models/content-positions';
import { PostContentComponent } from '../../posts/post/post-content/post-content.component';

@Component({
  selector: 'app-post-feed',
  imports: [
    LoadingIndicatorComponent,
    DateDisplayComponent,
    RouterLink,
    PaginatorComponent,
    LoadingIndicatorComponent,
    PostContentComponent,
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {}
  public posts: PostDisplay[];
  public allPosts: Post[];
  @Input() isLoading: boolean;
  @Input() itemCount: number = 0;
  @Input() pageTitle = 'Posts';
  @Input() showPageLink = false;
  @Input() showAllPageLinks = false;
  @Input() showPaginator = true;
  @Input() postType: PostType;
  @Input() contentPosition: ContentPosition = ContentPosition.Below;
  @Input() showPostType = false;
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

          this.posts = paginatedPosts.map(
            (p) => new PostDisplay(p, this.getPageForLink(p.post_type))
          );
          this.setPostsForCurrentPage();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public scrollToTop() {
    window.scrollTo(0, 0);
  }

  public setPostsForCurrentPage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.posts = this.allPosts
      .slice(start, start + this.itemsPerPage)
      .map((p) => new PostDisplay(p, this.getPageForLink(p.post_type)));
  }

  public goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.router.navigate([this.getPageForLink(this.postType)], {
      queryParams: { page: pageNumber },
    });
    this.scrollToTop();
  }

  public isBlog(postType: string): boolean {
    return postType === PostType.Blog;
  }

  public getPageForLink(postType: string): string {
    switch (postType) {
      case PostType.Blog:
        return 'blog';
      case PostType.Post:
        return 'posts';
      case PostType.Link:
        return 'links';
      case PostType.Gallery:
        return 'gallery';
      default:
        return 'posts';
    }
  }

  public getPostIdentifier(post: PostDisplay): string {
    switch (post.post_type) {
      case PostType.Blog:
        return post.canonical_url;
      case PostType.Post:
      case PostType.Link:
      case PostType.Gallery:
      default:
        return post.time_stamp;
    }
  }

  public getPostType(type: string): PostType {
    switch (type) {
      case 'blog':
        return PostType.Blog;
      case 'link':
        return PostType.Link;
      case 'gallery':
        return PostType.Gallery;
      case 'post':
      default:
        return PostType.Post;
    }
  }

  public getPostTypeIcon(type: string): string {
    switch (type) {
      case PostType.Blog:
        return 'fa-solid fa-newspaper';
      case PostType.Post:
        return 'fa-solid fa-comment';
      case PostType.Link:
        return 'fa-solid fa-link';
      case PostType.Gallery:
        return 'fa-solid fa-gallery';
      default:
        return 'fa-solid fa-comment';
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
      case PostType.Gallery:
        return 'Gallery Posts';
      default:
        return 'Posts';
    }
  }
}
