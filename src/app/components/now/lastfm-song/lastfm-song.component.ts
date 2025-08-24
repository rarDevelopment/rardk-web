import { Component } from '@angular/core';
import { LastfmService } from '../lastfm-card/lastfm.service';
import { SimplifiedTrack } from '../lastfm-card/models/simplified-track';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';

@Component({
  selector: 'app-lastfm-song',
  imports: [PageTitleComponent],
  templateUrl: './lastfm-song.component.html',
  styleUrl: './lastfm-song.component.scss',
})
export class LastfmSongComponent {
  latestSong: SimplifiedTrack;
  constructor(lastFmService: LastfmService) {
    lastFmService.getRecentTracksRealTime().subscribe((tracks) => {
      const sortedTracks = tracks.track.map(
        (track) =>
          ({
            name: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            date: track.date?.['#text'],
            url: track.url,
            timestamp: track.date?.uts,
            nowPlaying: track.nowplaying,
          } as SimplifiedTrack)
      );
      this.latestSong = sortedTracks[0];
    });
  }
}
