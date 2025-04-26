import { Component } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feeds',
  imports: [PageTitleComponent, RouterLink],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.scss',
})
export class FeedsComponent {}
