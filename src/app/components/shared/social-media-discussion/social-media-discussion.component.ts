import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { BlueskyPostFull } from 'src/app/components/shared/social-media-discussion/models/bluesky-post-full';
import { DiscussionPostsResponse } from 'src/app/components/shared/social-media-discussion/models/discussion-posts-response';
import { MastodonStatusFull } from 'src/app/components/shared/social-media-discussion/models/mastodon-status-full';
import { PostToDisplay } from 'src/app/components/shared/social-media-discussion/models/post-to-display';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-social-media-discussion',
  standalone: true,
  imports: [SafeHtmlPipe, HtmlDirective, NgIf, NgFor],
  templateUrl: './social-media-discussion.component.html',
  styleUrl: './social-media-discussion.component.scss',
})
export class SocialMediaDiscussionComponent implements OnInit {
  public mastodonPosts: PostToDisplay[] = [];
  public blueskyPosts: PostToDisplay[] = [];
  @Input() getDiscussionsMethod: () => Observable<DiscussionPostsResponse>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getDiscussionForPost();
  }

  getDiscussionForPost() {
    this.getDiscussionsMethod()
      .pipe(take(1))
      .subscribe({
        next: (discussion) => {
          const postDiscussion = discussion[this.router.url];
          if (postDiscussion) {
            if (postDiscussion.mastodon) {
              postDiscussion.mastodon.forEach((post: MastodonStatusFull) => {
                const postToDisplay = {
                  likes: post.favourites_count,
                  shares: post.reblogs_count,
                  comments: post.replies_count,
                  content: post.content,
                  url: post.url,
                  commentsUrl: post.url,
                  likesUrl: `${post.url}/favourites`,
                  sharesUrl: `${post.url}/reblogs`,
                } as PostToDisplay;
                this.mastodonPosts.push(postToDisplay);
              });
            }
            if (postDiscussion.bluesky) {
              postDiscussion.bluesky.forEach((post: BlueskyPostFull) => {
                const splitUri = post.uri.split('/');
                const postId = splitUri[splitUri.length - 1];
                const bskyUrl = `https://bsky.app/profile/${environment.bskyHandle}/post/${postId}`;
                const postToDisplay = {
                  likes: -1,
                  shares: -1,
                  comments: -1,
                  content: post.value.text,
                  url: bskyUrl,
                  commentsUrl: bskyUrl,
                  likesUrl: `${bskyUrl}/liked-by`,
                  sharesUrl: `${bskyUrl}/reposted-by`,
                } as PostToDisplay;
                this.blueskyPosts.push(postToDisplay);
              });
            }
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
