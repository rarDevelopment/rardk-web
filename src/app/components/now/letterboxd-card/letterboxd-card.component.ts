import { Component } from '@angular/core';
import { finalize, take } from 'rxjs';
import { FeedItem } from 'src/app/components/shared/feed-posters/models/feed-item';
import { LetterboxdItem } from 'src/app/components/now/letterboxd-card/models/letterboxd-item';
import { LetterboxdService } from './letterboxd.service';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';

@Component({
    selector: 'app-letterboxd-card',
    templateUrl: './letterboxd-card.component.html',
    styleUrls: ['./letterboxd-card.component.scss'],
    imports: [FeedPostersComponent]
})
export class LetterboxdCardComponent {
  public isLoading: boolean;
  public feedItems: FeedItem[];
  private numberOfMoviesToList = 4;
  isRecentMoviesError: boolean;

  constructor(private letterboxdService: LetterboxdService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateLetterboxdItems();
  }

  public async populateLetterboxdItems() {
    this.letterboxdService
      .getLetterboxdFeed()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result: LetterboxdItem[]) => {
          let items = result.map((m) => {
            return {
              title: m.title,
              summary: m.summary,
              date: m.watchedDate,
              imageUrl: m.imageUrl,
              isRepeat: m.isRewatch,
              rating: m.rating,
              url: m.url,
            } as FeedItem;
          });
          if (this.numberOfMoviesToList > 0) {
            items = items.slice(0, this.numberOfMoviesToList);
          }
          this.feedItems = items;
        },
        error: (error) => {
          console.error(error);
          this.isRecentMoviesError = true;
        },
      });
  }
}
