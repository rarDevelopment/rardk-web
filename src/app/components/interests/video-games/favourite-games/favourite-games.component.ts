import { Component, OnInit } from '@angular/core';
import { FeedPostersComponent } from '../../../shared/feed-posters/feed-posters.component';

import { FeedItem } from '../../../shared/feed-posters/models/feed-item';
import { finalize, take } from 'rxjs';
import { FavouriteGame } from '../../../interests/video-games/models/favourite-game';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { VideoGamesService } from '../video-games.service';

@Component({
    selector: 'app-interests',
    imports: [FeedPostersComponent, PageTitleComponent],
    templateUrl: './favourite-games.component.html',
    styleUrl: './favourite-games.component.scss'
})
export class FavouriteGamesComponent implements OnInit {
  public isVideoGameHallOfFameLoading: boolean = false;
  public isVideoGameHallOfFameError: boolean = false;
  public favouriteGames: FeedItem[];
  constructor(private videoGamesService: VideoGamesService) {}

  ngOnInit() {
    this.isVideoGameHallOfFameLoading = true;
    this.populateVideoGameHallOfFame();
  }

  public populateVideoGameHallOfFame() {
    this.videoGamesService
      .getFavouriteGames()
      .pipe(
        take(1),
        finalize(() => {
          this.isVideoGameHallOfFameLoading = false;
        })
      )
      .subscribe({
        next: (result: FavouriteGame[]) => {
          let items = result.map((m) => {
            const imageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${m.imageId}.jpg`;
            return {
              title: m.gameName,
              imageUrl: imageUrl,
              url: m.igdbUrl,
            } as FeedItem;
          });
          this.favouriteGames = items.sort((a, b) => {
            return a.title > b.title ? 1 : -1;
          });
        },
        error: (error) => {
          console.error(error);
          this.isVideoGameHallOfFameError = true;
        },
      });
  }
}
