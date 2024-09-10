import { Component, OnInit } from '@angular/core';
import { FeedPostersComponent } from '../shared/feed-posters/feed-posters.component';
import { CommonModule } from '@angular/common';
import { InterestsService } from './interests.service';
import { FeedItem } from '../shared/feed-posters/models/feed-item';
import { finalize, take } from 'rxjs';
import { FavouriteGame } from './models/favourite-game';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule, FeedPostersComponent, PageTitleComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
})
export class InterestsComponent implements OnInit {
  public isVideoGameHallOfFameLoading: boolean = false;
  public isVideoGameHallOfFameError: boolean = false;
  public favouriteGames: FeedItem[];
  constructor(private interestsService: InterestsService) {}

  ngOnInit() {
    this.isVideoGameHallOfFameLoading = true;
    this.populateVideoGameHallOfFame();
  }

  public populateVideoGameHallOfFame() {
    this.interestsService
      .getVideoGameHallOfFame()
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
