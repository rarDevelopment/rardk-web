import { ModalImage, ModalImageItem } from '../../shared/modal/models/modal-image';
import { Post } from './post';

export class PostDisplay {
  public content: string;
  public posted_at: string;
  public edited_at: string;
  public images_csv: string;
  public image_alt_text: string;
  public url: string;
  public url_title: string;
  public post_type: string;
  public post_title: string;
  public canonical_url: string;
  public category: string;
  public post_description: string;
  public time_stamp: string;
  public modalImage: ModalImage;
  public isModalVisible: boolean;

  constructor(post: Post) {
    const imagePostUrl = '/posts/' + post.time_stamp;
    this.content = post.content;
    this.posted_at = post.posted_at;
    this.edited_at = post.edited_at;
    this.images_csv = post.images_csv;
    this.image_alt_text = post.image_alt_text;
    this.url = post.url;
    this.url_title = post.url_title;
    this.post_type = post.post_type;
    this.post_title = post.post_title;
    this.canonical_url = post.canonical_url;
    this.category = post.category;
    this.post_description = post.post_description;
    this.time_stamp = post.time_stamp;
    this.modalImage = {
      url: imagePostUrl,
      images: [
        {
          url: post.images_csv,
          description: post.image_alt_text,
        } as ModalImageItem,
      ],
      content: post.content,
      date: post.posted_at,
    } as ModalImage;
    this.isModalVisible = false;
  }
}
