import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { LinksService } from 'src/app/services/links.service';
import { take } from 'rxjs';
import { Link } from 'src/app/models/link';
import { DateDisplayComponent } from '../shared/date-display/date-display.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    NgFor,
    HtmlDirective,
    PageTitleComponent,
    NgIf,
    LoadingIndicatorComponent,
    DateDisplayComponent,
  ],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent implements OnInit {
  constructor(private linksService: LinksService) {}
  public links: Link[];
  public isLoading: boolean;

  async ngOnInit() {
    this.populateLinks();
  }

  public populateLinks() {
    this.isLoading = true;
    this.linksService
      .getLinks()
      .pipe(take(1))
      .subscribe({
        next: (linksResponse) => {
          this.links = linksResponse.sort((l1, l2) => (l1.dateShared > l2.dateShared ? -1 : 1));
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }
}
