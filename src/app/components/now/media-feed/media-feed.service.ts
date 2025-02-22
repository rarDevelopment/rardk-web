import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from 'src/settings';
import { FeedItem } from '../../shared/feed-posters/models/feed-item';

@Injectable({
  providedIn: 'root',
})
export class MediaFeedService {
  constructor(private http: HttpClient) {}

  getMediaFeed(): Observable<FeedItem[]> {
    return this.http.get<FeedItem[]>(`${settings.apiUrl}now/json/now-media-feed`);
  }
}
