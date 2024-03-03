import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { TimeZoneItem } from '../../../models/bots/timezonebot/time-zone-item';
import { SetTimeZoneRequest } from '../../../models/bots/timezonebot/set-time-zone-request';

@Injectable({
  providedIn: 'root',
})
export class TimezonebotService extends ApiService {
  public getTimeZones(): Observable<TimeZoneItem[]> {
    return this.http.get<TimeZoneItem[]>(
      `${this.domainUrl}timezonebot/time-zones`
    );
  }

  public setTimeZone(
    bodyToUse: SetTimeZoneRequest
  ): Observable<SetTimeZoneRequest> {
    return this.http.put<SetTimeZoneRequest>(
      `${this.domainUrl}timezonebot/time-zone`,
      bodyToUse
    );
  }

  public getTimeZoneForUser(
    discordAccessToken: string,
    userId: string
  ): Observable<string> {
    return this.http.get<string>(
      `${this.domainUrl}timezonebot/time-zone?accessToken=${discordAccessToken}&userId=${userId}`
    );
  }
}
