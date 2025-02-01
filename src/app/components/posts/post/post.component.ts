import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { combineLatest, finalize, map, take } from 'rxjs';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';
import { SocialMediaDiscussionComponent } from '../../shared/social-media-discussion/social-media-discussion.component';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';
import { PostsService } from '../posts.service';
import { Post } from '../models/post';
import { PostType } from '../models/post-type';
import { PostDisplay } from '../models/post-display';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ContentPosition } from '../models/content-positions';

@Component({
  selector: 'app-post',
  imports: [
    PageTitleComponent,
    LoadingIndicatorComponent,
    DateDisplayComponent,
    RouterLink,
    SocialMediaDiscussionComponent,
    ModalComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  public post: PostDisplay;
  public isLoading: boolean;
  @Input() postType: PostType = PostType.Post;
  @Input() contentPosition: ContentPosition = ContentPosition.Above;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    combineLatest([this.postsService.getPosts(this.postType ?? PostType.Post), this.route.paramMap])
      .pipe(
        take(1),
        map(([posts, routeParams]) => {
          {
            return {
              posts: posts,
              routeParams: routeParams,
            };
          }
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result: { posts: Post[]; routeParams: ParamMap }) => {
          this.findAndSetPost(result.posts, result.routeParams);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public findAndSetPost(posts: Post[], routeParams: ParamMap) {
    const foundPost = posts.find((post) => post.time_stamp === routeParams.get('slug')!);
    if (!foundPost) {
      this.router.navigate([this.getPageForPost()]);
    }
    this.post = new PostDisplay(foundPost!, this.getPageForPost());
  }

  toggleModal(post: PostDisplay, isVisible: boolean) {
    post.isModalVisible = isVisible;
  }

  public isAbove(): boolean {
    return this.contentPosition === ContentPosition.Above;
  }

  public getImageClass(): string {
    return this.postType === PostType.Gallery ? 'post-image gallery-post-image' : 'post-image';
  }

  public getPageForPost(): string {
    switch (this.postType) {
      case PostType.Blog:
        return '/blog';
      case PostType.Post:
        return '/posts';
      case PostType.Link:
        return '/links';
      case PostType.Gallery:
        return '/gallery';
    }
  }

  public getBackText(): string {
    switch (this.postType) {
      case PostType.Blog:
        return 'Blog';
      case PostType.Post:
        return 'Posts';
      case PostType.Link:
        return 'Links';
      case PostType.Gallery:
        return 'Gallery';
    }
  }
}
