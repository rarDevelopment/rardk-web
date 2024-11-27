import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookCollectionEntry } from './models/book-collection-entry';
import { Observable } from 'rxjs';
import { settings } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  public getBookCollection(): Observable<BookCollectionEntry[]> {
    return this.http.get<BookCollectionEntry[]>(`${settings.apiUrl}now/books/collection`);
  }
}
