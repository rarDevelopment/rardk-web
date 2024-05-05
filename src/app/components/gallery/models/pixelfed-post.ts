export interface PixelfedPost {
  id: string;
  uri: string;
  url: string;
  in_reply_to_id: any;
  in_reply_to_account_id: any;
  reblog: any;
  content: string;
  created_at: string;
  emojis: any[];
  reblogs_count: number;
  favourites_count: number;
  reblogged: boolean;
  favourited: boolean;
  muted: boolean;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  application: Application;
  language: any;
  mentions: any[];
  tags: any[];
  poll: any;
  edited_at: any;
  account: Account;
  replies_count: number;
  media_attachments: MediaAttachment[];
  bookmarked: boolean;
}

export interface Application {
  name: string;
  website: any;
}

export interface Account {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  discoverable: boolean;
  locked: boolean;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  note: string;
  url: string;
  avatar: string;
  created_at: string;
  avatar_static: string;
  bot: boolean;
  emojis: any[];
  fields: any[];
  header: string;
  header_static: string;
  last_status_at: any;
}

export interface MediaAttachment {
  id: string;
  type: string;
  url: string;
  remote_url: any;
  preview_url: string;
  text_url: any;
  meta: any;
  description: any;
  blurhash: string;
}
