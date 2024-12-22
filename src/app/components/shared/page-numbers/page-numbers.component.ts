import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-page-numbers',
    imports: [CommonModule],
    templateUrl: './page-numbers.component.html',
    styleUrl: './page-numbers.component.scss'
})
export class PageNumbersComponent {
  @Input() currentPage: number;
  @Input() numberOfPages: number;
  @Input() pageNumbers: number[];

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public goToPage(i: number) {
    this.pageChange.emit(i);
  }
}
