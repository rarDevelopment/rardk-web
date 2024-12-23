import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { KeyValuePipe, NgClass, CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { VideoGamesService } from '../video-games.service';
import { GameCollectionEntry } from '../models/game-collection-entry';
import { FormsModule } from '@angular/forms';
import { GamePlatform } from '../models/game-platform';
import { LoadingIndicatorComponent } from '../../../shared/loading-indicator/loading-indicator.component';

@Component({
    selector: 'app-video-game-collection',
    templateUrl: './video-game-collection.component.html',
    styleUrls: ['./video-game-collection.component.scss'],
    imports: [
        PageTitleComponent,
        CommonModule,
        LoadingIndicatorComponent,
        KeyValuePipe,
        FormsModule,
    ]
})
export class VideoGamesCollectionComponent implements OnInit {
  public gameCollectionItemsGrouped: { [key: string]: GameCollectionEntry[] };
  public gameCollectionItems: GameCollectionEntry[];
  public isLoading: boolean;
  public allGenre = 'All Games';
  public selectedPlatform: string = this.allGenre;
  public availablePlatforms: GamePlatform[] = [];
  public searchTerm: string = '';

  constructor(private videoGamesService: VideoGamesService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateGameCollection();
  }

  public async populateGameCollection() {
    this.videoGamesService
      .getGameCollection()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (gameCollectionItems: GameCollectionEntry[]) => {
          this.gameCollectionItems = gameCollectionItems
            .filter((g) => g.category === 'Games' && g.userRecordType === 'Owned')
            .sort((a, b) => {
              if (a.platform > b.platform) {
                return 1;
              }
              if (a.platform < b.platform) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              if (a.title < b.title) {
                return -1;
              }
              return 0;
            });
          this.gameCollectionItemsGrouped = this.groupBy(this.gameCollectionItems, 'platform');
          this.gameCollectionItemsGrouped[this.allGenre] = this.gameCollectionItems;
          this.setAvailablePlatforms();
        },
        error: (error) => {
          console.error('Error loading game collection', error);
        },
      });
  }

  public groupBy(
    // found here: https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects#comment122310660_34890276
    groupOfItemsToGroup: any[],
    key: string
  ): { [key: string]: GameCollectionEntry[] } {
    return groupOfItemsToGroup.reduce((storage, item) => {
      (storage[item[key]] = storage[item[key]] || []).push(item);
      return storage;
    }, []);
  }

  setAvailablePlatforms() {
    const keys: string[] = Object.keys(this.gameCollectionItemsGrouped);
    const mapped: GamePlatform[] = keys.map((key: string) => {
      return {
        name: key,
        gameCount: this.gameCollectionItemsGrouped[key].length,
      } as GamePlatform;
    });
    this.availablePlatforms = mapped.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  filterGames(games: GameCollectionEntry[]) {
    if (this.searchTerm.trim() !== '') {
      return games.filter((g) => g.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    return games.sort((g1, g2) => (g1.title > g2.title ? 1 : -1));
  }
}
