import { Component } from '@angular/core';
import { FeedItem } from '../../shared/feed-posters/models/feed-item';
import { MediaFeedService } from './media-feed.service';
import { finalize, take } from 'rxjs';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-feed',
  imports: [FeedPostersComponent, RouterLink],
  templateUrl: './media-feed.component.html',
  styleUrl: './media-feed.component.scss',
})
export class MediaFeedComponent {
  public isLoading: boolean;
  public feedItems: FeedItem[];
  private numberOfItemsToList = 8;
  public hideNoImagePosts = true;
  public isError: boolean;

  constructor(private mediaFeedService: MediaFeedService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateMediaFeedItems();
  }

  public async populateMediaFeedItems() {
    this.mediaFeedService
      .getMediaFeed()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (items: FeedItem[]) => {
          if (this.numberOfItemsToList > 0) {
            items = items.filter((item) => item.imageUrl || !this.hideNoImagePosts);
            items = items.slice(0, this.numberOfItemsToList);
          }
          this.feedItems = items;
        },
        error: (error) => {
          console.error(error);
          this.isError = true;
        },
      });
  }
}
