import { Component, Input, OnInit } from '@angular/core';
import { FeedItem } from './models/feed-item';
import { ProfileLinkComponent } from '../profile-link/profile-link.component';

import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';

@Component({
    selector: 'app-feed-posters',
    templateUrl: './feed-posters.component.html',
    styleUrls: ['./feed-posters.component.scss'],
    imports: [ProfileLinkComponent, LoadingIndicatorComponent, TooltipDirective]
})
export class FeedPostersComponent implements OnInit {
  @Input() sectionTitle: string;
  @Input() ratingMax: number;
  @Input() isLoading: boolean;
  @Input() feedItems: FeedItem[];
  @Input() displayType: string;
  @Input() profileUrl?: string;
  @Input() profileName?: string;
  @Input() isError: boolean = false;
  @Input() showRatings: boolean = false;

  public isList: boolean;
  public isPoster: boolean;

  ngOnInit() {
    this.isList = this.displayType.toLowerCase() === 'list';
    this.isPoster = this.displayType.toLowerCase() === 'poster';
  }

  formatRating(numberRating: number): string {
    const rating = Number(numberRating);
    return Number.isInteger(rating) ? Number(rating).toString() : rating.toFixed(1);
  }
}
