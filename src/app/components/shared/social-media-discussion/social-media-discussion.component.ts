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
import { PostType } from '../../posts/models/post-type';
import { DiscussionPostsService } from 'src/app/services/discussion-posts.service';

@Component({
  selector: 'app-social-media-discussion',
  standalone: true,
  imports: [SafeHtmlPipe, HtmlDirective],
  templateUrl: './social-media-discussion.component.html',
  styleUrl: './social-media-discussion.component.scss',
})
export class SocialMediaDiscussionComponent implements OnInit {
  public mastodonPosts: PostToDisplay[] = [];
  public blueskyPosts: PostToDisplay[] = [];
  @Input() postType: PostType;
  @Input() getDiscussionsMethod: () => Observable<DiscussionPostsResponse>;
  @Input() showContent: boolean = true;
  @Input() discussionId: string;

  constructor(private router: Router, private discussionPostsService: DiscussionPostsService) {}

  ngOnInit(): void {
    this.getDiscussionForPost();
  }

  cleanText(text: string, startWithNewLine: boolean = false, endWithNewLine = false): string {
    const indexToRemoveFrom = text.lastIndexOf('http://rardk.com');
    let cleanedText = text.substring(0, indexToRemoveFrom);
    cleanedText = cleanedText.replace(/\n/g, '<br>');
    if (startWithNewLine) {
      cleanedText = '<br />' + cleanedText;
    }
    if (endWithNewLine) {
      cleanedText = cleanedText + '<br />';
    }
    return cleanedText;
  }

  getDiscussionForPost() {
    this.determineDiscussionMethod(this.postType)
      .pipe(take(1))
      .subscribe({
        next: (discussion) => {
          const postDiscussion = discussion[this.discussionId ?? this.router.url];
          if (postDiscussion) {
            if (postDiscussion.mastodon) {
              postDiscussion.mastodon.forEach((post: MastodonStatusFull) => {
                const postToDisplay = {
                  likes: post.favourites_count,
                  shares: post.reblogs_count,
                  comments: post.replies_count,
                  content: this.cleanText(post.content, false, true),
                  url: post.url,
                  commentsUrl: post.url,
                  likesUrl: `${post.url}/favourites`,
                  sharesUrl: `${post.url}/reblogs`,
                } as PostToDisplay;
                this.mastodonPosts.push(postToDisplay);
              });
            }
            if (postDiscussion.bluesky) {
              console.log('bluesky', postDiscussion.bluesky);
              postDiscussion.bluesky.forEach((post: BlueskyPostFull) => {
                const splitUri = post.uri.split('/');
                const postId = splitUri[splitUri.length - 1];
                const bskyUrl = `https://bsky.app/profile/${environment.bskyHandle}/post/${postId}`;

                const postToDisplay = {
                  likes: post.likeCount ?? null,
                  shares: post.repostCount ?? null,
                  quotes: post.quoteCount ?? null,
                  comments: post.replyCount ?? null,
                  content: this.cleanText(post.value.text, true, false),
                  url: bskyUrl,
                  commentsUrl: bskyUrl,
                  likesUrl: post.likeCount !== 0 ? `${bskyUrl}/liked-by` : bskyUrl,
                  sharesUrl: post.repostCount !== 0 ? `${bskyUrl}/reposted-by` : bskyUrl,
                  quotesUrl: post.quoteCount !== 0 ? `${bskyUrl}/quotes` : bskyUrl,
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

  private determineDiscussionMethod(postType: PostType): Observable<DiscussionPostsResponse> {
    switch (postType) {
      case PostType.Blog:
        return this.discussionPostsService.getDiscussionPostsForBlog();
      case PostType.Link:
        return this.discussionPostsService.getDiscussionPostsForLinks();
      case PostType.Post:
        return this.discussionPostsService.getDiscussionPostsForPosts();
    }
  }
}
