import { Component } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/models/feed-item';
import { LastfmAlbum } from 'src/app/models/lastfm/lastfm-album';
import { LastfmArtist } from 'src/app/models/lastfm/lastfm-artist';
import { LastfmService } from './lastfm.service';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';

@Component({
  selector: 'app-lastfm-card',
  templateUrl: './lastfm-card.component.html',
  styleUrls: ['./lastfm-card.component.scss'],
  standalone: true,
  imports: [FeedPostersComponent],
})
export class LastfmCardComponent {
  public isTopAlbumsLoading: boolean;
  public isTopArtistsLoading: boolean;
  public topAlbumFeedItems: FeedItem[];
  public topArtistFeedItems: FeedItem[];
  private numberOfAlbumsToShow = 4;
  private numberOfArtistsToShow = 4;
  isTopAlbumsError: boolean;
  isTopArtistsError: boolean;

  constructor(private lastfmService: LastfmService) {}

  ngOnInit() {
    this.isTopAlbumsLoading = true;
    this.isTopArtistsLoading = true;
    this.populateTopAlbums();
    this.populateTopArtists();
  }

  public async populateTopAlbums() {
    this.lastfmService
      .getTopAlbums()
      .pipe(take(1))
      .subscribe({
        next: (result: LastfmAlbum[]) => {
          let items = result.map((album) => {
            const imageUrl = (album as any).image.pop()['#text'];
            return {
              title: album.name,
              imageUrl: imageUrl,
              url: album.url,
            } as FeedItem;
          });
          if (this.numberOfAlbumsToShow > 0) {
            items = items.slice(0, this.numberOfAlbumsToShow);
          }
          this.topAlbumFeedItems = items;
          this.isTopAlbumsLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isTopAlbumsError = true;
        },
      });
  }

  public async populateTopArtists() {
    this.lastfmService
      .getTopArtists()
      .pipe(take(1))
      .subscribe({
        next: (result: LastfmArtist[]) => {
          let items = result.map((artist) => {
            return {
              title: artist.name,
              url: artist.url,
            } as FeedItem;
          });
          if (this.numberOfArtistsToShow > 0) {
            items = items.slice(0, this.numberOfArtistsToShow);
          }
          this.topArtistFeedItems = items;
          this.isTopArtistsLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isTopArtistsError = true;
        },
      });
  }
}
