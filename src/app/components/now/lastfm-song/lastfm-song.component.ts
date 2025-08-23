import { Component } from '@angular/core';
import { LastfmService } from '../lastfm-card/lastfm.service';
import { SimplifiedTrack } from '../lastfm-card/models/simplified-track';

@Component({
  selector: 'app-lastfm-song',
  imports: [],
  templateUrl: './lastfm-song.component.html',
  styleUrl: './lastfm-song.component.scss',
})
export class LastfmSongComponent {
  latestSong: SimplifiedTrack;
  constructor(lastFmService: LastfmService) {
    lastFmService.getRecentTracks().subscribe((tracks) => {
      const sortedTracks = tracks.track
        .map(
          (track) =>
            ({
              name: track.name,
              artist: track.artist['#text'],
              album: track.album['#text'],
              date: track.date?.['#text'],
              url: track.url,
            } as SimplifiedTrack)
        )
        .sort((a, b) => {
          if (!a.date) {
            return 1;
          }
          if (!b.date) {
            return -1;
          }
          return b.date > a.date ? 1 : -1;
        });
      this.latestSong = sortedTracks[0];
    });
  }
}
