export interface MastodonStatusFull {
  id: string;
  created_at: string;
  in_reply_to_id: any;
  in_reply_to_account_id: any;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  edited_at: any;
  content: string;
  reblog: any;
  application: Application;
  account: Account;
  media_attachments: any[];
  mentions: any[];
  tags: any[];
  emojis: any[];
  card: Card;
  poll: any;
}

export interface Application {
  name: string;
  website: string;
}

export interface Account {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  discoverable: boolean;
  indexable: boolean;
  group: boolean;
  created_at: string;
  note: string;
  url: string;
  uri: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  last_status_at: string;
  hide_collections: boolean;
  noindex: boolean;
  emojis: any[];
  roles: any[];
  fields: Field[];
}

export interface Field {
  name: string;
  value: string;
  verified_at: string;
}

export interface Card {
  url: string;
  title: string;
  description: string;
  language: string;
  type: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
  html: string;
  width: number;
  height: number;
  image: any;
  image_description: string;
  embed_url: string;
  blurhash: any;
  published_at: any;
}
