import { Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { CommonModule, KeyValuePipe, NgClass } from '@angular/common';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';
import { FormsModule } from '@angular/forms';
import { BookCollectionEntry } from './models/book-collection-entry';
import { BookGenre } from './models/book-genre';
import { BooksService } from './books.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    PageTitleComponent,
    CommonModule,
    LoadingIndicatorComponent,
    KeyValuePipe,
    NgClass,
    FormsModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  public bookCollectionItemsGrouped: { [key: string]: BookCollectionEntry[] };
  public bookCollectionItems: BookCollectionEntry[];
  public isLoading: boolean;
  public allGenre = 'All Books';
  public selectedGenre: string = this.allGenre;
  public availableGenres: BookGenre[] = [];
  public searchTerm: string = '';

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateBookCollection();
  }

  public async populateBookCollection() {
    this.booksService
      .getBookCollection()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (bookCollectionItems: BookCollectionEntry[]) => {
          this.bookCollectionItems = bookCollectionItems.sort((a, b) => {
            return a.title > b.title ? 1 : -1;
          });
          this.bookCollectionItemsGrouped = this.groupBy(this.bookCollectionItems, 'genre');
          this.bookCollectionItemsGrouped[this.allGenre] = this.bookCollectionItems;
          this.setAvailableGenres();
        },
        error: (error) => {
          console.error('Error loading book collection', error);
        },
      });
  }

  public groupBy(
    // found here: https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects#comment122310660_34890276
    groupOfItemsToGroup: any[],
    key: string
  ): { [key: string]: BookCollectionEntry[] } {
    return groupOfItemsToGroup.reduce((storage, item) => {
      (storage[item[key]] = storage[item[key]] || []).push(item);
      return storage;
    }, []);
  }

  setAvailableGenres() {
    const keys: string[] = Object.keys(this.bookCollectionItemsGrouped);
    const mapped: BookGenre[] = keys.map((key: string) => {
      return {
        name: key,
        bookCount: this.bookCollectionItemsGrouped[key].length,
      } as BookGenre;
    });
    this.availableGenres = mapped.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  filterBooks(books: BookCollectionEntry[]) {
    if (this.searchTerm.trim() !== '') {
      return books.filter((book) =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return books.sort((book1, book2) => (book1.title > book2.title ? 1 : -1));
  }
}
