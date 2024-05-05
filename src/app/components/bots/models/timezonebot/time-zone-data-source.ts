import { DataSource } from '@angular/cdk/collections';
import { TimeZoneItem } from './time-zone-item';
import { Observable, ReplaySubject } from 'rxjs';

export class TimeZoneDataSource extends DataSource<TimeZoneItem> {
  private _dataStream = new ReplaySubject<TimeZoneItem[]>();

  constructor(initialData: TimeZoneItem[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<TimeZoneItem[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: TimeZoneItem[]) {
    this._dataStream.next(data);
  }
}
