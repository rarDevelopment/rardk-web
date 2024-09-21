import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LastfmCardComponent } from './lastfm-card/lastfm-card.component';
import { GoodreadsCardComponent } from './goodreads-card/goodreads-card.component';
import { TvShowsCardComponent } from './tv-shows-card/tv-shows-card.component';
import { LetterboxdCardComponent } from './letterboxd-card/letterboxd-card.component';
import { BackloggdCardComponent } from './backloggd-card/backloggd-card.component';
import { GithubCardComponent } from './github-card/github-card.component';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';

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
    TooltipDirective,
  ],
})
export class NowComponent implements AfterViewInit {
  @ViewChild('projectsCard') projectsCard: ElementRef;
  @ViewChild('gamesCard') gamesCard: ElementRef;
  @ViewChild('moviesCard') moviesCard: ElementRef;
  @ViewChild('tvCard') tvCard: ElementRef;
  @ViewChild('booksCard') booksCard: ElementRef;
  @ViewChild('musicCard') musicCard: ElementRef;

  private scrollTitleOffset = 28;
  private sectionMap: { [key: string]: ElementRef } = {};

  ngAfterViewInit() {
    this.sectionMap = {
      projects: this.projectsCard,
      games: this.gamesCard,
      movies: this.moviesCard,
      tv: this.tvCard,
      books: this.booksCard,
      music: this.musicCard,
    };
  }

  public scrollToSection(section: string) {
    const element = this.sectionMap[section];
    if (element) {
      const yOffset = -this.scrollTitleOffset;
      const y = element.nativeElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
