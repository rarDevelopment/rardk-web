import { LastfmImage } from "./lastfm-image";
import { LastfmArtistInfo } from "./lastfm-artist-info";
import { LastfmAlbumInfo } from "./lastfm-album-info";
import { LastfmDate } from "./lastfm-date";

export class LastfmTrack {
  nowplaying?: string | null;
  artist: LastfmArtistInfo;
  name: string;
  mbid: string;
  album: LastfmAlbumInfo;
  url: string;
  date?: LastfmDate;
  streamable: string;
  image: LastfmImage[];
}
