import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookCollectionEntry } from './models/book-collection-entry';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  public getBookCollection(): Observable<BookCollectionEntry[]> {
    return this.http.get<BookCollectionEntry[]>(`${environment.apiUrl}now/books/collection`);
  }
}
