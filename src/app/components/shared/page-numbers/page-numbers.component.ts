import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-numbers',
  imports: [CommonModule],
  templateUrl: './page-numbers.component.html',
  styleUrl: './page-numbers.component.scss',
})
export class PageNumbersComponent implements OnInit {
  @Input() currentPage: number;
  @Input() numberOfPages: number;
  @Input() pageNumbers: number[] = [];
  public displayedPageNumbers: {
    pages: number[];
    showStartEllipsis: boolean;
    showEndEllipsis: boolean;
  };
  public numberOfPageNumbers = 4;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.updateDisplayedPageNumbers();
    this.pageNumbers = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
  }

  public goToPage(i: number) {
    this.pageChange.emit(i);
    this.updateDisplayedPageNumbers();
  }

  public updateDisplayedPageNumbers() {
    const half = Math.floor(this.numberOfPageNumbers / 2);
    let start = Math.max(this.currentPage - half, 1);
    let end = Math.min(this.currentPage + half, this.numberOfPages);

    let showStartEllipsis = false;
    let showEndEllipsis = false;

    if (this.currentPage <= half) {
      end = Math.min(this.numberOfPageNumbers, this.numberOfPages);
    } else if (this.currentPage + half >= this.numberOfPages) {
      start = Math.max(this.numberOfPages - this.numberOfPageNumbers + 1, 1);
    }

    if (start > 1) {
      showStartEllipsis = true;
    }
    if (end < this.numberOfPages) {
      showEndEllipsis = true;
    }

    this.displayedPageNumbers = {
      pages: this.pageNumbers.slice(start - 1, end),
      showStartEllipsis,
      showEndEllipsis,
    };
  }

  trackByFn(index: number, item: number): number {
    return item;
  }
}
