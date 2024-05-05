import { BlueskyPostFull } from './bluesky-post-full';
import { MastodonStatusFull } from './mastodon-status-full';

export interface DiscussionPostsResponse {
  [key: string]: DiscussionPosts;
}

export class DiscussionPosts {
  mastodon: MastodonStatusFull[] = [];
  bluesky: BlueskyPostFull[] = [];
}
