import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { combineLatest, finalize, map, take } from 'rxjs';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';
import { SocialMediaDiscussionComponent } from '../../shared/social-media-discussion/social-media-discussion.component';
import { DiscussionPostsService } from 'src/app/services/discussion-posts.service';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';
import { PostsService } from '../posts.service';
import { Post } from '../models/post';
import { PostType } from '../models/post-type';
import { PostDisplay } from '../models/post-display';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-post',
  standalone: true,
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
  @Input() postType: PostType; // = PostType.Post;
  public discussionMethod = this.discussionPostsService.getDiscussionPostsForPosts.bind(
    this.discussionPostsService
  );

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private discussionPostsService: DiscussionPostsService
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
    console.log('posts', posts);
    const foundPost = posts.find((post) => post.time_stamp === routeParams.get('slug')!);
    if (!foundPost) {
      this.router.navigate([this.getPageForPost()]);
    }
    this.post = new PostDisplay(foundPost!, this.getPageForPost());
  }

  toggleModal(post: PostDisplay, isVisible: boolean) {
    post.isModalVisible = isVisible;
  }

  public isLink(): boolean {
    return this.postType === PostType.Link;
  }

  public getPageForPost(): string {
    return this.isLink() ? 'links' : 'posts';
  }
}
