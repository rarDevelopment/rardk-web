import { Component } from '@angular/core';
import { FeedItem } from 'src/app/components/shared/feed-posters/models/feed-item';
import { GoodreadsItem } from 'src/app/components/now/goodreads-card/models/goodreads-item';
import { GoodreadsService } from './goodreads.service';
import { finalize, take } from 'rxjs';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';

@Component({
    selector: 'app-goodreads-card',
    templateUrl: './goodreads-card.component.html',
    styleUrls: ['./goodreads-card.component.scss'],
    imports: [FeedPostersComponent]
})
export class GoodreadsCardComponent {
  public isFinishedBooksLoading: boolean;
  public isCurrentlyReadingLoading: boolean;
  public finishedBooksFeedItems: FeedItem[];
  public currentlyReadingBooksFeedItems: FeedItem[];
  private numberOfBooksToList = 4;

  constructor(private goodreadsService: GoodreadsService) {}

  ngOnInit() {
    this.isFinishedBooksLoading = true;
    this.isCurrentlyReadingLoading = true;
    this.populateFinishedBooksItems();
    this.populateCurrentlyReadingBooksItems();
  }

  public async populateFinishedBooksItems() {
    this.goodreadsService
      .getGoodreadsFinishedBooksFeed()
      .pipe(
        take(1),
        finalize(() => {
          this.isFinishedBooksLoading = false;
        })
      )
      .subscribe((result: GoodreadsItem[]) => {
        let items = result.map((m) => {
          return {
            title: m.title,
            summary: m.summary,
            imageUrl: m.imageUrl,
            rating: m.rating,
            url: m.url,
          } as FeedItem;
        });
        if (this.numberOfBooksToList > 0) {
          items = items.slice(0, this.numberOfBooksToList);
        }
        this.finishedBooksFeedItems = items;
      });
  }

  public async populateCurrentlyReadingBooksItems() {
    this.goodreadsService
      .getGoodreadsCurrentlyReadingBooksFeed()
      .pipe(
        take(1),
        finalize(() => {
          this.isCurrentlyReadingLoading = false;
        })
      )
      .subscribe((result: GoodreadsItem[]) => {
        let items = result.map((m) => {
          return {
            title: m.title,
            summary: m.summary,
            imageUrl: m.imageUrl,
            url: m.url,
          } as FeedItem;
        });
        if (this.numberOfBooksToList > 0) {
          items = items.slice(0, this.numberOfBooksToList);
        }
        this.currentlyReadingBooksFeedItems = items;
      });
  }
}
