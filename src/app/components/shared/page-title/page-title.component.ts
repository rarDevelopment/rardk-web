import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class PageTitleComponent {
  @Input() titleSize: number;
}
