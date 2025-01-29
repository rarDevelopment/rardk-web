import { PostImage } from './image';

export class Post {
  public content: string;
  public posted_at: string;
  public edited_at: string;
  public image_alt_text: string;
  public url: string;
  public images: PostImage[];
  public url_title: string;
  public post_type: string;
  public post_title: string;
  public canonical_url: string;
  public category: string;
  public post_description: string;
  public time_stamp: string;
}
