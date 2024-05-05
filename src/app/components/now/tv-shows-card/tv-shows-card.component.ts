import { Component } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/components/shared/feed-posters/models/feed-item';
import { TvShowsService } from './tv-shows.service';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';
import { TvShow } from 'src/app/components/now/tv-shows-card/models/tv-show';

@Component({
  selector: 'app-tv-shows-card',
  templateUrl: './tv-shows-card.component.html',
  styleUrls: ['./tv-shows-card.component.scss'],
  standalone: true,
  imports: [FeedPostersComponent],
})
export class TvShowsCardComponent {
  public isLoading: boolean;
  public feedItems: FeedItem[];
  private numberOfShowsToDisplay = 5;
  public isCurrentTvError: boolean;

  constructor(private tvShowService: TvShowsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateCurrentlyWatchingItems();
  }

  public async populateCurrentlyWatchingItems() {
    this.tvShowService
      .getLatestEpisodes()
      .pipe(take(1))
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
          this.feedItems = items;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isCurrentTvError = true;
        },
      });
  }
}
