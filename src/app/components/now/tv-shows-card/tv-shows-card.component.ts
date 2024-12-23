import { Component } from '@angular/core';
import { finalize, take } from 'rxjs';
import { FeedItem } from 'src/app/components/shared/feed-posters/models/feed-item';
import { TvShowsService } from './tv-shows.service';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';
import { TvShow } from 'src/app/components/now/tv-shows-card/models/tv-show';
import { TvShowReview } from './models/tv-show-review';

@Component({
    selector: 'app-tv-shows-card',
    templateUrl: './tv-shows-card.component.html',
    styleUrls: ['./tv-shows-card.component.scss'],
    imports: [FeedPostersComponent]
})
export class TvShowsCardComponent {
  public isLoading: boolean;
  public currentTvFeedItems: FeedItem[];
  public tvReviewFeedItems: FeedItem[];
  private numberOfShowsToDisplay = 5;
  private numberOfReviesToDisplay = 5;
  public isCurrentTvError: boolean;
  public isTvReviewsError: boolean;

  constructor(private tvShowService: TvShowsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateCurrentlyWatchingItems();
    this.populateTvShowReviewItems();
  }

  public async populateCurrentlyWatchingItems() {
    this.tvShowService
      .getLatestEpisodes()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result: TvShow[]) => {
          let items = result
            .map((m) => {
              return {
                title: m.title,
                imageUrl: m.imageUrl,
              } as FeedItem;
            })
            .sort((s1, s2) => (s1.date < s2.date ? 1 : -1));
          if (this.numberOfShowsToDisplay > 0) {
            items = items.slice(0, this.numberOfShowsToDisplay);
          }
          this.currentTvFeedItems = items;
        },
        error: (error) => {
          console.error(error);
          this.isCurrentTvError = true;
        },
      });
  }

  public async populateTvShowReviewItems() {
    this.tvShowService
      .getLatestReviews()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result: TvShowReview[]) => {
          let items = result
            .map((m) => {
              return {
                title: m.title,
                rating: m.rating,
                date: m.ratedAt,
              } as FeedItem;
            })
            .sort((s1, s2) => (s1.date < s2.date ? 1 : -1));
          if (this.numberOfReviesToDisplay > 0) {
            items = items.slice(0, this.numberOfReviesToDisplay);
          }
          this.tvReviewFeedItems = items;
        },
        error: (error) => {
          console.error(error);
          this.isTvReviewsError = true;
        },
      });
  }
}
