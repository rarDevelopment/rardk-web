import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { combineLatest, finalize, map, take } from 'rxjs';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';
import { SocialMediaDiscussionComponent } from '../../shared/social-media-discussion/social-media-discussion.component';
import { DiscussionPostsService } from 'src/app/services/discussion-posts.service';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../../posts/models/post';
import { PostType } from '../../posts/models/post-type';

@Component({
  selector: 'app-link-post',
  standalone: true,
  imports: [
    CommonModule,
    PageTitleComponent,
    LoadingIndicatorComponent,
    DateDisplayComponent,
    RouterLink,
    SocialMediaDiscussionComponent,
  ],
  templateUrl: './link-post.component.html',
  styleUrl: './link-post.component.scss',
})
export class LinkPostComponent implements OnInit {
  public post: Post;
  public isLoading: boolean;
  public slug: string;
  public discussionMethod = this.discussionPostsService.getDiscussionPostsForLinks.bind(
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
    combineLatest([this.postsService.getPosts(PostType.Link), this.route.paramMap])
      .pipe(
        take(1),
        map(([links, routeParams]) => {
          {
            return {
              links: links,
              routeParams: routeParams,
            };
          }
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result: { links: Post[]; routeParams: ParamMap }) => {
          this.findAndSetPost(result.links, result.routeParams);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public findAndSetPost(posts: Post[], routeParams: ParamMap) {
    const foundPost = posts.find((post) => post.time_stamp === routeParams.get('slug')!);
    if (!foundPost) {
      this.router.navigate(['links']);
    }
    this.post = foundPost!;
  }
}
