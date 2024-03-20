import { Component } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/models/feed-item';
import { SerializdCurrentlyWatchingItem } from 'src/app/models/serializd-currently-watching-item';
import { SerializdService } from './serializd.service';
import { FeedPostersComponent } from '../feed-posters/feed-posters.component';

@Component({
  selector: 'app-serializd-card',
  templateUrl: './serializd-card.component.html',
  styleUrls: ['./serializd-card.component.scss'],
  standalone: true,
  imports: [FeedPostersComponent],
})
export class SerializdCardComponent {
  public isLoading: boolean;
  public feedItems: FeedItem[];
  private numberOfShowsToDisplay = 4;
  public isCurrentTvError: boolean;

  constructor(private serializdService: SerializdService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateCurrentlyWatchingItems();
  }

  public async populateCurrentlyWatchingItems() {
    this.serializdService
      .getSerializdCurrentlyWatchingItems()
      .pipe(take(1))
      .subscribe({
        next: (result: SerializdCurrentlyWatchingItem[]) => {
          let items = result
            .map((m) => {
              return {
                title: m.showName,
                date: m.dateAdded,
                imageUrl: m.bannerImage,
                url: m.showUrl,
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
