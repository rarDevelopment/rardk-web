import { Component } from '@angular/core';
import { take } from 'rxjs';
import { BackloggdItem } from 'src/app/models/backloggd-item';
import { FeedItem } from 'src/app/models/feed-item';
import { BackloggdService } from './backloggd.service';
import { FeedPostersComponent } from '../feed-posters/feed-posters.component';

@Component({
  selector: 'app-backloggd-card',
  templateUrl: './backloggd-card.component.html',
  styleUrls: ['./backloggd-card.component.scss'],
  standalone: true,
  imports: [FeedPostersComponent],
})
export class BackloggdCardComponent {
  public isCurrentGamesFeedLoading: boolean;
  public isReviewsFeedLoading: boolean;
  public reviewsFeedItems: FeedItem[];
  public currentGamesFeedItems: FeedItem[];
  private numberOfCurrentGamesToList = 10;
  private numberOfFinishedGamesToList = 5;
  isRecentlyFinishedGamesError: boolean;
  isCurrentGamesError: boolean;

  constructor(private backloggdService: BackloggdService) {}

  ngOnInit() {
    this.isCurrentGamesFeedLoading = true;
    this.isReviewsFeedLoading = true;
    this.populateBackloggdFeedItems();
    this.populateBackloggdCurrentGamesFeedItems();
  }

  public async populateBackloggdFeedItems() {
    this.backloggdService
      .getBackloggdFeed()
      .pipe(take(1))
      .subscribe({
        next: (result: BackloggdItem[]) => {
          let items = result.map((m) => {
            return {
              title: m.title,
              summary: m.summary,
              imageUrl: m.imageUrl,
              rating: m.rating,
              url: m.url,
            } as FeedItem;
          });
          if (this.numberOfFinishedGamesToList > 0) {
            items = items.slice(0, this.numberOfFinishedGamesToList);
          }
          this.reviewsFeedItems = items;
          this.isReviewsFeedLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isRecentlyFinishedGamesError = true;
        },
      });
  }

  public async populateBackloggdCurrentGamesFeedItems() {
    this.backloggdService
      .getBackloggdCurrentGames()
      .pipe(take(1))
      .subscribe({
        next: (result: BackloggdItem[]) => {
          let items = result.map((m) => {
            return {
              title: m.title,
              imageUrl: m.imageUrl,
              url: m.url,
            } as FeedItem;
          });
          if (this.numberOfCurrentGamesToList > 0) {
            items = items.slice(0, this.numberOfFinishedGamesToList);
          }
          this.currentGamesFeedItems = items;
          this.isCurrentGamesFeedLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isCurrentGamesError = true;
        },
      });
  }
}
