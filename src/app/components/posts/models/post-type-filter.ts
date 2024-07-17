import { Post } from './post';

export class PostTypeFilter {
  public filter: (p: Post) => boolean;
  public hashtagPrefix: string;
}
