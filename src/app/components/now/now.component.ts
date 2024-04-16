import { Component } from '@angular/core';
import { LastfmCardComponent } from './lastfm-card/lastfm-card.component';
import { GoodreadsCardComponent } from './goodreads-card/goodreads-card.component';
import { TvShowsCardComponent } from './tv-shows-card/tv-shows-card.component';
import { LetterboxdCardComponent } from './letterboxd-card/letterboxd-card.component';
import { BackloggdCardComponent } from './backloggd-card/backloggd-card.component';
import { GithubCardComponent } from './github-card/github-card.component';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
  selector: 'app-now',
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.scss'],
  standalone: true,
  imports: [
    PageTitleComponent,
    GithubCardComponent,
    BackloggdCardComponent,
    LetterboxdCardComponent,
    TvShowsCardComponent,
    GoodreadsCardComponent,
    LastfmCardComponent,
  ],
})
export class NowComponent {}
