import { Component } from '@angular/core';
import { finalize, take } from 'rxjs';
import { BackloggdItem } from 'src/app/components/now/backloggd-card/models/backloggd-item';
import { FeedItem } from 'src/app/components/shared/feed-posters/models/feed-item';
import { BackloggdService } from './backloggd.service';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';

@Component({
  selector: 'app-backloggd-card',
  templateUrl: './backloggd-card.component.html',
  styleUrls: ['./backloggd-card.component.scss'],
  standalone: true,
  imports: [FeedPostersComponent],
})
export class BackloggdCardComponent {
  public isCurrentGamesLoading: boolean;
  public isRecentGamesLoading: boolean;
  public recentGames: FeedItem[];
  public currentGames: FeedItem[];
  private numberOfCurrentGamesToList = 0;
  private numberOfRecentGamesToList = 5;
  isRecentGamesError: boolean;
  isCurrentGamesError: boolean;

  constructor(private backloggdService: BackloggdService) {}

  ngOnInit() {
    this.isCurrentGamesLoading = true;
    this.isRecentGamesLoading = true;
    this.populateRecentGames();
    this.populateCurrentGames();
  }

  public async populateRecentGames() {
    this.backloggdService
      .getBackloggdFeed()
      .pipe(
        take(1),
        finalize(() => {
          this.isRecentGamesLoading = false;
        })
      )
      .subscribe({
        next: (result: BackloggdItem[]) => {
          let items = result.map((m) => {
            return {
              title: m.title,
              summary: m.summary,
              imageUrl: m.imageUrl,
              rating: m.rating / 2, //backloggd ratings are out of 10, so divide by 2 to get the 5-star rating
              url: m.url,
            } as FeedItem;
          });
          if (this.numberOfRecentGamesToList > 0) {
            items = items.slice(0, this.numberOfRecentGamesToList);
          }
          this.recentGames = items;
        },
        error: (error) => {
          console.error(error);
          this.isRecentGamesError = true;
        },
      });
  }

  public async populateCurrentGames() {
    this.backloggdService
      .getBackloggdCurrentGames()
      .pipe(
        take(1),
        finalize(() => {
          this.isCurrentGamesLoading = false;
        })
      )
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
            items = items.slice(0, this.numberOfCurrentGamesToList);
          }
          this.currentGames = items;
        },
        error: (error) => {
          console.error(error);
          this.isCurrentGamesError = true;
        },
      });
  }
}
