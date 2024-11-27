import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegoSet } from './models/lego-set';
import { map, Observable } from 'rxjs';
import { settings } from 'src/settings';
import { HtmlDecoder } from 'src/app/utilities/html-decoder';

@Injectable({
  providedIn: 'root',
})
export class LegoSetsService {
  private setsUrl: string = `${settings.feedsSiteUrl}rss/lego/json/`;

  constructor(private http: HttpClient, private htmlDecoder: HtmlDecoder) {}

  public getLegoSets(): Observable<LegoSet[]> {
    return this.http.get<LegoSet[]>(this.setsUrl).pipe(
      map((sets: LegoSet[]) =>
        sets.map((s) => ({
          ...s,
          name: this.htmlDecoder.htmlEntityDecode(s.name),
          series: this.htmlDecoder.htmlEntityDecode(s.series),
          url: this.htmlDecoder.htmlEntityDecode(s.url),
        }))
      )
    );
  }
}
