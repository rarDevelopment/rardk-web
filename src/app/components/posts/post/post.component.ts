import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    PageTitleComponent,
    LoadingIndicatorComponent,
    DateDisplayComponent,
    RouterLink,
    SocialMediaDiscussionComponent
],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  public post: Post;
  public isLoading: boolean;
  public slug: string;
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
    combineLatest([this.postsService.getPosts(PostType.Post), this.route.paramMap])
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
      this.router.navigate(['posts']);
    }
    this.post = foundPost!;
  }
}
